import { alpha, styled } from "@mui/material";
import { SimpleTreeView } from "@mui/x-tree-view/SimpleTreeView";
import { TreeItem, treeItemClasses } from "@mui/x-tree-view/TreeItem";
import { PiMinusDuotone, PiMinusFill, PiPlusSquareFill } from "react-icons/pi";

interface CustomTreeProps {
  data: any;
  setSelected: Function;
}

const CustomTree = ({ data, setSelected }: CustomTreeProps) => {
  return (
    <SimpleTreeView
      aria-label="customized"
      //   defaultExpandedItems={["1", "3"]}
      slots={{
        expandIcon: ExpandIcon,
        collapseIcon: CollapseIcon,
        endIcon: EndIcon,
      }}
      sx={{ overflowX: "hidden", minHeight: 270, flexGrow: 1, maxWidth: 1 }}
    >
      <NestedTreeGenerator modules={data} setSelected={setSelected} />
    </SimpleTreeView>
  );
};

const NestedTreeGenerator = ({ modules, setSelected }: { modules: any[]; setSelected: Function }) => {
  const handleClick = (module: any) => {
    setSelected(module);
  };

  return (
    <>
      {modules.map((module) => {
        const { id, name, children } = module;
        return (
          <CustomTreeItem key={id} itemId={id.toString()} label={name} onClick={() => handleClick(module)}>
            {children && children.length > 0 && <NestedTreeGenerator modules={children} setSelected={setSelected} />}
          </CustomTreeItem>
        );
      })}
    </>
  );
};

function ExpandIcon(props: any) {
  return <PiPlusSquareFill {...props} size={24} />;
}

function CollapseIcon(props: any) {
  return <PiMinusFill {...props} size={24} />;
}

function EndIcon(props: any) {
  return <PiMinusDuotone {...props} size={24} />;
}

const CustomTreeItem = styled(TreeItem)(({ theme }) => ({
  [`& .${treeItemClasses.content}`]: {
    padding: theme.spacing(0.5, 1),
    margin: theme.spacing(0.2, 0),
  },
  [`& .${treeItemClasses.iconContainer}`]: {
    "& .close": {
      opacity: 0.3,
    },
  },
  [`& .${treeItemClasses.groupTransition}`]: {
    marginLeft: 15,
    paddingLeft: 18,
    borderLeft: `1px dashed ${alpha(theme.palette.text.primary, 0.4)}`,
  },
}));

export default CustomTree;
