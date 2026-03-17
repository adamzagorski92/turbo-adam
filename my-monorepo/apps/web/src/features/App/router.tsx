import { createBrowserRouter } from "react-router";
import MainLayout from "@leyouts/MainLayout/MainLayout";
import BlogLayout from "@features/blog/BlogLayout/BlogLayout";
import HomePage from "@features/HomePage/HomePage";
import Article from "@features/blog/Article/Article";
import ArticleList from "@features/blog/ArticleList/ArticleList";
import RootSeoLayout from "@features/RootSeoLayout/RootSeoLayout";

export const router = createBrowserRouter([
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
        ],
      },
    ],
  },
]);
