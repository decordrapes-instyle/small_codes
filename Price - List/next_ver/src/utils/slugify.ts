export const slugify = (text: string) =>
  text
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9\-]/g, "");

export const unslugify = (slug: string) =>
  slug.replace(/-/g, " ");
