import { AvailableJobType } from "../../../../common/types/types.services";
import { TableComponentProps } from "../../../../common/types/types.table";
import ActionButton from "../../../../components/Buttons/ActionButton";

export const ActionField = ({ data }: TableComponentProps<AvailableJobType>) => {
  // --------------------------------------------
  // Variables
  // --------------------------------------------
  let link = data.id.toString();

  return (
    <>
      <ActionButton link={link} color="primary" icon={"edit"} title={`Edit ${data.name}`} />
      <ActionButton color="error" icon={"delete"} title={`Delete ${data.name}`} />
    </>
  );
};
