import { Stack } from "@mui/material";
import CustomButton from "../../../../components/Buttons/LoadingButton";
import { FaArrowLeft, FaSave } from "react-icons/fa";
import BackgroundCover, { BackgroundCoverProps } from "../../../../components/cover/BackgroundCover";

export interface UserProfileCoverProps extends BackgroundCoverProps {
  onSave: (event?: any) => Promise<void>;
}

export const UserProfileCover = ({ onSave, ...rest }: UserProfileCoverProps) => {
  return (
    <Stack borderRadius={4} minHeight={250} overflow={"hidden"} position={"relative"} boxShadow={5}>
      <BackgroundCover {...rest} />
      <Stack
        px={4}
        gap={2}
        minHeight={50}
        bgcolor={"#fff"}
        direction={"row"}
        position={"relative"}
        alignItems={"center"}
        justifyContent={"end"}
      >
        <CustomButton startIcon={<FaArrowLeft size={14} />} onClick={onSave}>
          Back
        </CustomButton>
        <CustomButton icon={<FaSave size={18} />} color="primary" onClick={onSave}>
          Save
        </CustomButton>
      </Stack>
    </Stack>
  );
};
