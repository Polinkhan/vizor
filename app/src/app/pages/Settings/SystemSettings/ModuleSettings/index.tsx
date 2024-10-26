import { FetchApiType } from "../../../../common/types/types.api";
import { CircleLoading } from "../../../../components/animate/LoadingScreen";
import useRerender from "../../../../hooks/custom/use-rerender";
import useFetch from "../../../../hooks/fetch/use-fetch";
import BodyLayout from "../../../../layouts/BodyLayout";
import ModuleSettingsView from "./ModuleSettingsView";

const ModuleSettings = (props: any) => {
  // ------------------------------------------
  // Hooks
  // ------------------------------------------
  const { render, reRender } = useRerender();

  // ------------------------------------------
  // Fetch Data
  // ------------------------------------------
  const api: FetchApiType = { method: "GET", type: "ui", url: `/all_modules` };
  const { data } = useFetch({ api, dependency: [render] });

  // ------------------------------------------
  // Render Component
  // ------------------------------------------
  if (!data) return <CircleLoading />;

  return (
    <BodyLayout {...props}>
      <ModuleSettingsView data={data} reRender={reRender} />
    </BodyLayout>
  );
};

export default ModuleSettings;
