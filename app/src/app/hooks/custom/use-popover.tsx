/*
 * Project Name : "Aerosphare Suit"
 *
 * Author: Abu Sayed Polin
 * Copyright : "Brotecs Technologies Limited"
 *
 * Created: 2023-09-14 12:04:03
 * Modified: 2023-09-14 12:04:03
 *
 * Component : use-popover
 * Description : Custom hook for popover state
 */

import { useCallback, useState } from "react";

type ReturnType = {
  onClose: VoidFunction;
  open: boolean;
  onOpen: (event: React.MouseEvent<HTMLElement>) => void;
  setOpen: React.Dispatch<React.SetStateAction<HTMLElement | null>>;
};

export default function usePopover(): ReturnType {
  const [open, setOpen] = useState<any>(null);

  const onOpen = useCallback((event: React.MouseEvent<HTMLElement>) => {
    setOpen(event.currentTarget);
  }, []);

  const onClose = useCallback(() => {
    setOpen(null);
  }, []);

  return {
    open,
    onOpen,
    onClose,
    setOpen,
  };
}
