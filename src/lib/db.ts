import "reflect-metadata";
import { DataSource } from "typeorm";
import { ProjectEntity } from "@/lib/entities/Project";
import { BlogEntity } from "@/lib/entities/Blog";
import { ExperienceEntity } from "@/lib/entities/Experience";
import { SocialEntity } from "@/lib/entities/Social";
import { CvEntity } from "@/lib/entities/Cv";
import { initialBlogs } from "@/data/blogs";
import { initialExperiences } from "@/data/experience";
import { initialSocials } from "@/data/socials";

// ──────────────────────────────────────────────
// Singleton DataSource (compatible with Next.js hot reload)
// ──────────────────────────────────────────────

declare global {
  var __dataSource: DataSource | undefined;
}

const ALL_ENTITIES = [
  ProjectEntity,
  BlogEntity,
  ExperienceEntity,
  SocialEntity,
  CvEntity,
];

function createDataSource(): DataSource {
  if (process.env.DATABASE_URL) {
    return new DataSource({
      type: "postgres",
      url: process.env.DATABASE_URL,
      ssl:
        process.env.DATABASE_URL.includes("sslmode=verify-full") ||
          process.env.DATABASE_URL.includes("sslmode=require") ||
          process.env.DATABASE_URL.includes("render.com")
          ? { rejectUnauthorized: false }
          : false,
      entities: ALL_ENTITIES,
      synchronize: true, // auto-creates/updates table schema
      logging: false,
    });
  }

  return new DataSource({
    type: "postgres",
    host: process.env.DB_HOST ?? "localhost",
    port: Number(process.env.DB_PORT ?? 5432),
    username: process.env.DB_USER ?? "postgres",
    password: process.env.DB_PASSWORD ?? "postgres",
    database: process.env.DB_NAME ?? "portfolio_db",
    entities: ALL_ENTITIES,
    synchronize: true,
    logging: false,
  });
}

export async function getDb(): Promise<DataSource> {
  if (global.__dataSource?.isInitialized) {
    return global.__dataSource;
  }

  const ds = global.__dataSource ?? createDataSource();
  await ds.initialize();
  global.__dataSource = ds;

  // 1. Seed Blogs if empty
  try {
    const blogRepo = ds.getRepository(BlogEntity);
    const bCount = await blogRepo.count();
    if (bCount === 0) {
      const blogEntities = initialBlogs.map((b, idx) => {
        const entity = new BlogEntity();
        entity.id = b.id;
        entity.slug = b.slug;
        entity.tag = b.tag;
        entity.title = b.title;
        entity.subtitle = b.subtitle;
        entity.date = b.date;
        entity.image = b.image;
        entity.paragraphs = b.paragraphs;
        entity.sortOrder = idx;
        return entity;
      });
      await blogRepo.save(blogEntities);
      console.log(`[db] Seeded ${blogEntities.length} blogs.`);
    }
  } catch (err) {
    console.error("[db] Blog seeding error:", err);
  }

  // 2. Seed Experiences if empty
  try {
    const expRepo = ds.getRepository(ExperienceEntity);
    const eCount = await expRepo.count();
    if (eCount === 0) {
      const expEntities = initialExperiences.map((exp, idx) => {
        const entity = new ExperienceEntity();
        entity.id = exp.id;
        entity.role = exp.role;
        entity.company = exp.company;
        entity.location = exp.location;
        entity.period = exp.period;
        entity.description = exp.description;
        entity.skills = exp.skills;
        entity.sortOrder = idx;
        return entity;
      });
      await expRepo.save(expEntities);
      console.log(`[db] Seeded ${expEntities.length} experiences.`);
    }
  } catch (err) {
    console.error("[db] Experience seeding error:", err);
  }

  // 3. Seed Socials if empty
  try {
    const socialRepo = ds.getRepository(SocialEntity);
    const sCount = await socialRepo.count();
    if (sCount === 0) {
      const socialEntities = initialSocials.map((s, idx) => {
        const entity = new SocialEntity();
        entity.id = s.id;
        entity.platform = s.platform;
        entity.url = s.url;
        entity.username = s.username;
        entity.icon = s.icon;
        entity.enabled = s.enabled;
        entity.sortOrder = idx;
        return entity;
      });
      await socialRepo.save(socialEntities);
      console.log(`[db] Seeded ${socialEntities.length} socials.`);
    }
  } catch (err) {
    console.error("[db] Socials seeding error:", err);
  }

  // 4. Seed CV if empty
  try {
    const cvRepo = ds.getRepository(CvEntity);
    const cvCount = await cvRepo.count();
    if (cvCount === 0) {
      const cvEntity = new CvEntity();
      cvEntity.id = "active_cv";
      cvEntity.fileName = "DIKE_Resume.pdf";
      cvEntity.fileUrl = "/cv.pdf";
      cvEntity.fileSize = "2.4 MB";
      cvEntity.updatedAt = new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
      cvEntity.downloadLabel = "Download CV";
      await cvRepo.save(cvEntity);
      console.log(`[db] Seeded initial CV.`);
    }
  } catch (err) {
    console.error("[db] CV seeding error:", err);
  }

  return ds;
}
