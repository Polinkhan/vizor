import { lazy } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { DEFAULT_ROUTE } from "../../common/config/config";
import NotFound from "../../pages/Default/notFound";
import Dashboard from "../../pages/dashboard";
import Services from "../../pages/services";
import Logger from "../../pages/logger";
import Landing from "../../pages/landing";
import SetupLayout from "../../pages/setup/SetupLayout";
import Setup from "../../pages/setup";
import Terminal from "../../pages/terminal";
import Files from "../../pages/files";
import Network from "../../pages/network";

const RootPage = lazy(() => import("../../pages/Default/root"));

const RootRouter = () => {
  const location = useLocation();

  return (
    <Routes key={location.pathname} location={location}>
      {/*--------------------------------*/}
      {/*      Authenticated Routes      */}
      {/*--------------------------------*/}
      <Route path="/" element={<Landing />} />
      <Route path={"/app"} element={<RootPage />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="services" element={<Services />} />

        <Route path="network" element={<Network />} />

        <Route path="files" element={<Files />} />
        <Route path="logger" element={<Logger />} />
        <Route path="terminal" element={<Terminal />} />
      </Route>

      <Route key={location.pathname} path="/setup" element={<SetupLayout />}>
        <Route key={location.pathname} path=":id" element={<Setup />} />
      </Route>
      <Route path="*" element={<NotFound />} />
      {/*--------------------------------*/}
      {/*         Unknown Routes         */}
      {/*--------------------------------*/}
      <Route path="*" element={<Navigate to={DEFAULT_ROUTE} replace={true} />} />
    </Routes>
  );
};

export default RootRouter;
