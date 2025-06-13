import { AnimatePresence, AnimationProps, MotionStyle, motion } from "framer-motion";
import { ReactNode } from "react";

type SlideType = "Up" | "Down" | "Left" | "Right";

const defaultAnimations = {
  initial: { scale: 0.98 },
  animate: { scale: 1 },
  exit: { scale: 0.98 },
};

// const buildAnimation = (slide: SlideType = "Right", value: number = 10) => {
//   return {
//     initial: { opacity: 1, x: animate[slide].x * value, y: animate[slide].y * value },
//     animate: { opacity: 1, x: 0, y: 0 },
//     exit: { opacity: 1, x: -(animate[slide].x * value), y: -(animate[slide].y * value) },
//   };
// };

interface SlideProps extends AnimationProps {
  children: ReactNode;
  id?: string;
  from?: SlideType;
  value?: number;
  duration?: number;
  style?: MotionStyle;
}

const Scale = (props: SlideProps) => {
  const { id, from, value, duration, ...rest } = props;
  return (
    <AnimatePresence mode="wait" key={id}>
      <motion.div
        variants={defaultAnimations}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ duration: duration || 0.3 }}
        style={{ width: "100%", height: "100%" }}
        {...rest}
      />
    </AnimatePresence>
  );
};

export default Scale;
