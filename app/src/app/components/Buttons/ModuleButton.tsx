import { Stack, Typography } from "@mui/material";
import { ModuleType } from "../../common/types/types.ui";
import { Link } from "react-router-dom";
import { Module } from "../images/Image";
import { useUIContext } from "../../hooks/context/use-ui-context";

interface ModuleButtonProps {
  size?: "small" | "medium" | "large";
  module: ModuleType;
}

const ModuleButton = ({ module, size = "small" }: ModuleButtonProps) => {
  // ---------------------------------------
  // Hooks
  // ---------------------------------------
  const { moduleViewType } = useUIContext();

  // ---------------------------------------
  // Variables
  // ---------------------------------------
  const isGrid = moduleViewType === "grid";
  const Icon = Module[module.icon] || Module.defaultIcon;

  let style = { p: 3, size: 220, iconsize: 120, fontsize: 14 };
  if (size === "small") style = { p: 2, size: 120, iconsize: 80, fontsize: 13 };
  if (size === "large") style = { p: 5, size: 320, iconsize: 160, fontsize: 18 };

  const p = isGrid ? style.p : 1;
  const iconSize = isGrid ? style.iconsize : 40;
  const width = isGrid ? style.size + 25 : "auto";
  const minHeight = isGrid ? style.size + 25 : "auto";

  return (
    <Link to={module.url} style={{ textDecoration: "none", minWidth: isGrid ? "auto" : 300 }}>
      <Stack
        height={1}
        gap={style.p}
        width={width}
        minHeight={minHeight}
        justifyContent={isGrid ? "space-between" : "start"}
        direction={isGrid ? "column" : "row"}
        sx={{
          p: p,
          cursor: "pointer",
          transition: "0.2s",
          alignItems: "center",
          px: isGrid ? p : 1.5,
          "&:hover": isGrid
            ? { boxShadow: 10 }
            : { "& .module_name": { textDecoration: "underline" } },
          borderRadius: isGrid ? 2 : 1,
        }}
      >
        {<Icon size={iconSize} />}
        <Typography
          color={"grey.700"}
          textAlign={"center"}
          className="module_name"
          fontSize={style.fontsize}
        >
          {module.name}
        </Typography>
      </Stack>
    </Link>
  );
};
export default ModuleButton;
