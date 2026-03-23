export const ROUTES = {
  home: "/",
  blog: "/blog",
  blogArticle: (slug: string) => `/blog/${slug}`,
  blogArchive: "/blog/archive",
  blogArchiveType: (archive: string) => `/blog/archive/${archive}`,
  blogArchiveSub: (archive: string, sub: string) =>
    `/blog/archive/${archive}/${sub}`,
} as const;
