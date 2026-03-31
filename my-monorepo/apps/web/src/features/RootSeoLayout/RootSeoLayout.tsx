import GlobalSeo from "@components/GlobalSeo/GlobalSeo";
import { Outlet } from "react-router";

const RootSeoLayout = () => (
  <>
    <GlobalSeo />
    <Outlet />
  </>
);

export default RootSeoLayout;
