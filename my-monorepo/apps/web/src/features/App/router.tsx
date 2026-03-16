import { createBrowserRouter } from "react-router";
import MainLayout from "@leyouts/MainLayout/MainLayout";
import BlogLayout from "@features/blog/BlogLayout/BlogLayout";
import HomePage from "@features/HomePage/HomePage";
import ArticleList from "@features/ArticleList/ArticleList";
import Article from "@features/Article/Article";

export const router = createBrowserRouter([
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
]);
