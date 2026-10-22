export interface SocialItem {
  id: string;
  platform: string;
  url: string;
  username: string;
  icon: string;
  enabled: boolean;
}

export const initialSocials: SocialItem[] = [
  {
    id: "instagram",
    platform: "Instagram",
    url: "https://www.instagram.com/yernazar.design/",
    username: "@yernazar.design",
    icon: "instagram",
    enabled: true,
  },
  {
    id: "telegram",
    platform: "Telegram",
    url: "https://t.me/yernazar_design",
    username: "@yernazar_design",
    icon: "telegram",
    enabled: true,
  },
  {
    id: "whatsapp",
    platform: "WhatsApp",
    url: "https://wa.me/447000000000",
    username: "+44 7000 000000",
    icon: "whatsapp",
    enabled: true,
  },
  {
    id: "linkedin",
    platform: "LinkedIn",
    url: "https://linkedin.com/in/yernazar",
    username: "in/yernazar",
    icon: "linkedin",
    enabled: true,
  },
  {
    id: "github",
    platform: "GitHub",
    url: "https://github.com",
    username: "motionsgaad",
    icon: "github",
    enabled: true,
  },
  {
    id: "email",
    platform: "Email",
    url: "mailto:hello@motionsgaad.com",
    username: "hello@motionsgaad.com",
    icon: "email",
    enabled: true,
  },
];
