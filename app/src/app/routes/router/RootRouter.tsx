import { lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { DEFAULT_ROUTE } from "../../common/config/config";
import NotFound from "../../pages/Default/notFound";
import Dashboard from "../../pages/dashboard";
import Services from "../../pages/services";
import Logger from "../../pages/logger";

const RootPage = lazy(() => import("../../pages/Default/root"));

const RootRouter = () => {
  return (
    <Routes>
      {/*--------------------------------*/}
      {/*      Authenticated Routes      */}
      {/*--------------------------------*/}
      <Route path={"/"} element={<RootPage />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/services" element={<Services />} />
        <Route path="/logger" element={<Logger />} />

        <Route path="*" element={<NotFound />} />
      </Route>
      {/*--------------------------------*/}
      {/*         Unknown Routes         */}
      {/*--------------------------------*/}
      <Route path="*" element={<Navigate to={DEFAULT_ROUTE} replace={true} />} />
    </Routes>
  );
};

export default RootRouter;
