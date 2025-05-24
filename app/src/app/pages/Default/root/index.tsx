/*
 * Project Name: "Aerosphere Suit"
 * Author: [Author Name]
 * Created: [Creation Date]
 * Modified: [Last Modification Date]
 * Component: RootPage
 * Description: Component for rendering the root page layout.
 */

import { Outlet, useNavigate } from "react-router-dom";
import RootLayout from "../../../layouts/RootLayout";
import { useEffect } from "react";
import { getHostList } from "../../../common/helpers";

const RootPage = () => {
  const navigate = useNavigate();

  // useEffect(() => {
  //   const host_list = getHostList();

  //   if (host_list.length === 0) {
  //     navigate("/setup", { replace: true });
  //   }
  // }, []);

  return (
    <RootLayout>
      <Outlet />
    </RootLayout>
  );
};

export default RootPage;
