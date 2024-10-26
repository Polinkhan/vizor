/*
 * Project Name : "Aerosphare Suit"
 *
 * Author: Abu Sayed Polin
 * Copyright : "Brotecs Technologies Limited"
 *
 * Created: 2023-09-28 23:46:42
 * Modified: 2023-09-28 23:46:42
 *
 * Component: App
 * Description: Custom component for animating the presence of its children with a fade effect.
 */

import { AnimatePresence, AnimationProps, MotionStyle, motion } from "framer-motion";
import { ReactNode } from "react";

// -----------------------------------------------------------------------------
// Function: getAnimations
// Purpose: Define animation variants for the fade effect.
// -----------------------------------------------------------------------------
const getAnimations = (value: number = 0) => ({
  initial: { opacity: value },
  animate: { opacity: 1 },
  exit: { opacity: value },
});

interface FadeProps extends AnimationProps {
  children: ReactNode;
  id?: string;
  value?: number;
  duration?: number;
  style?: MotionStyle;
}

// -----------------------------------------------------------------------------
// Component: Fade
// Purpose: A component for animating the presence of its children with a fade effect.
// -----------------------------------------------------------------------------
const Fade = ({ id, value, duration, ...rest }: FadeProps) => {
  return (
    <AnimatePresence mode="wait" key={id}>
      <motion.div
        variants={getAnimations(value)}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ duration: duration ?? 1 }}
        style={{ width: "100%", height: "100%" }}
        {...rest}
      />
    </AnimatePresence>
  );
};

export default Fade;
