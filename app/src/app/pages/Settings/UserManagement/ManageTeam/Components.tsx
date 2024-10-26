import { Stack } from "@mui/material";
import CustomButton from "../../../../components/Buttons/LoadingButton";
import { FaSave } from "react-icons/fa";
import BackgroundCover, { BackgroundCoverProps } from "../../../../components/cover/BackgroundCover";

export interface TeamProfileCoverProps extends BackgroundCoverProps {
  onSave: (event?: any) => Promise<void>;
}

export const TeamProfileCover = ({ onSave, ...rest }: TeamProfileCoverProps) => {
  return (
    <Stack borderRadius={4} minHeight={250} overflow={"hidden"} position={"relative"} boxShadow={5}>
      <BackgroundCover {...rest} />
      <Stack px={4} position={"relative"} bgcolor={"#fff"} minHeight={50} alignItems={"end"} justifyContent={"center"}>
        <CustomButton icon={<FaSave size={18} />} onClick={onSave}>
          Save
        </CustomButton>
      </Stack>
    </Stack>
  );
};
