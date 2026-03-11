import { createBrowserRouter } from "react-router";
import MainLayout from "@leyouts/MainLayout/MainLayout";
import BlogLayout from "@leyouts/BlogLayout/BlogLayout";
import HomePage from "@features/HomePage/HomePage";
import BlogCard from "@components/BlogCard/BlogCard";

export const router = createBrowserRouter([
  {
    Component: MainLayout,
    children: [{ index: true, Component: HomePage }],
  },
  {
    path: "/blog",
    Component: BlogLayout,
    children: [{ index: true, Component: BlogCard }],
  },
]);
