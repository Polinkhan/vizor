import { useOutletContext as useReactOutletContext } from "react-router-dom";
import { UserType } from "../../common/types/types.user";

type useReactOutletContextType = {
  currentUser: UserType;
};

const useOutletContext = () => {
  const { currentUser } = useReactOutletContext<useReactOutletContextType>();
  return { currentUser };
};

export default useOutletContext;
