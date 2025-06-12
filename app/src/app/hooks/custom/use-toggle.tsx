import { useState } from "react";

const useToggle = (defaultState: boolean = false) => {
  const [open, setOpen] = useState(defaultState);
  const [resource, setResource] = useState<any>();

  const onOpen = (res?: any) => {
    setOpen(true);
    if (res) setResource(res);
  };

  const onClose = async () => setOpen(false);

  const onToggle = () => setOpen((prev) => !prev);

  return { open, onOpen, onToggle, onClose, resource, setResource };
};

// Export the useToggle custom hook for use in other parts of your application.
export default useToggle;
