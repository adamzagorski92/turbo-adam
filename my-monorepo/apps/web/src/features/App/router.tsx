import { createBrowserRouter, type RouteObject } from "react-router";
import MainLayout from "@leyouts/MainLayout/MainLayout";
import BlogLayout from "@features/blog/BlogLayout/BlogLayout";
import HomePage from "@features/HomePage/HomePage";
import Article from "@features/blog/Article/Article";
import ArticleList from "@features/blog/ArticleList/ArticleList";
import RootSeoLayout from "@features/RootSeoLayout/RootSeoLayout";
import { Archive } from "@features/blog/Archive/Archive";
import { ArchiveIndex } from "@features/blog/Archive/ArchiveIndex/ArchiveIndex";

export const routes: RouteObject[] = [
  {
    Component: RootSeoLayout,
    children: [
      {
        Component: MainLayout,
        children: [{ index: true, Component: HomePage }],
      },
      {
        path: "/blog",
        Component: BlogLayout,
        children: [
          { index: true, Component: ArticleList },
          { path: ":slug", Component: Article },
          {
            path: "archive",
            children: [
              { index: true, Component: ArchiveIndex },
              {
                path: ":archive",
                children: [
                  { index: true, Component: Archive },
                  { path: ":sub", Component: Archive },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
];

export const router = createBrowserRouter(routes);
