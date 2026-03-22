import { describe, it, expect } from "vitest";
import { routes } from "./router";
import { Archive } from "@features/blog/Archive/Archive";
import { ArchiveIndex } from "@features/blog/Archive/ArchiveIndex/ArchiveIndex";

describe("router configuration - Archive routes under /blog", () => {
  const rootRoute = routes[0];
  const blogRoute = rootRoute.children?.find((route) => route.path === "/blog");
  const archiveParent = blogRoute?.children?.find(
    (route) => route.path === "archive",
  );
  const archiveRoute = archiveParent?.children?.find(
    (route) => route.path === ":archive",
  );

  it("standalone /:archive route does not exist at root level", () => {
    const standaloneArchive = rootRoute.children?.find(
      (route) => route.path === "/:archive",
    );
    expect(standaloneArchive).toBeUndefined();
  });

  it("/blog route has an archive parent route", () => {
    expect(blogRoute).toBeDefined();
    expect(archiveParent).toBeDefined();
  });

  it("archive parent has ArchiveIndex as index child", () => {
    const indexChild = archiveParent!.children?.find((route) => route.index);
    expect(indexChild).toBeDefined();
    expect(indexChild!.Component).toBe(ArchiveIndex);
  });

  it("archive parent has :archive child route", () => {
    expect(archiveRoute).toBeDefined();
  });

  it(":archive child has its own children", () => {
    expect(archiveRoute!.children).toBeDefined();
    expect(archiveRoute!.children!.length).toBeGreaterThan(0);
  });

  it(":archive child has an index child with Archive component", () => {
    const indexChild = archiveRoute!.children?.find((route) => route.index);
    expect(indexChild).toBeDefined();
    expect(indexChild!.Component).toBe(Archive);
  });

  it(":archive child has a :sub child with Archive component", () => {
    const subChild = archiveRoute!.children?.find(
      (route) => route.path === ":sub",
    );
    expect(subChild).toBeDefined();
    expect(subChild!.Component).toBe(Archive);
  });
});
