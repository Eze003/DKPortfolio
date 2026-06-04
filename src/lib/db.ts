import "reflect-metadata";
import { DataSource } from "typeorm";
import { ProjectEntity } from "@/lib/entities/Project";
import { projects as staticProjects } from "@/data/projects";

// ──────────────────────────────────────────────
// Singleton DataSource (compatible with Next.js hot reload)
// ──────────────────────────────────────────────

declare global {
  var __dataSource: DataSource | undefined;
}

function createDataSource(): DataSource {
  if (process.env.DATABASE_URL) {
    return new DataSource({
      type: "postgres",
      url: process.env.DATABASE_URL,
      ssl: process.env.DATABASE_URL.includes("sslmode=verify-full") ||
           process.env.DATABASE_URL.includes("sslmode=require") ||
           process.env.DATABASE_URL.includes("render.com")
        ? { rejectUnauthorized: false }
        : false,
      entities: [ProjectEntity],
      synchronize: true, // auto-creates/updates table schema — fine for dev
      logging: process.env.NODE_ENV === "development",
    });
  }

  return new DataSource({
    type: "postgres",
    host: process.env.DB_HOST ?? "localhost",
    port: Number(process.env.DB_PORT ?? 5432),
    username: process.env.DB_USER ?? "postgres",
    password: process.env.DB_PASSWORD ?? "postgres",
    database: process.env.DB_NAME ?? "portfolio_db",
    entities: [ProjectEntity],
    synchronize: true, // auto-creates/updates table schema — fine for dev
    logging: process.env.NODE_ENV === "development",
  });
}

export async function getDb(): Promise<DataSource> {
  if (global.__dataSource?.isInitialized) {
    return global.__dataSource;
  }

  const ds = global.__dataSource ?? createDataSource();
  await ds.initialize();
  global.__dataSource = ds;

  // Seed the database from static data if empty
  const repo = ds.getRepository<ProjectEntity>("ProjectEntity");
  const count = await repo.count();
  if (count === 0) {
    const entities = staticProjects.map((p, idx) => {
      const e = new ProjectEntity();
      e.id = p.id;
      e.label = p.label;
      e.kind = p.kind;
      e.variant = p.variant;
      e.thumbnail = p.thumbnail ?? null;
      e.folderPreviews = p.folderPreviews ?? null;
      e.fallbackClassName = p.fallbackClassName ?? null;
      e.fallbackContent = p.fallbackContent ?? null;
      e.detail = p.detail;
      e.sortOrder = idx;
      return e;
    });
    await repo.save(entities);
    console.log(`[db] Seeded ${entities.length} projects.`);
  }

  return ds;
}
