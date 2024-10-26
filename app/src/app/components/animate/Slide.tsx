import { AnimatePresence, AnimationProps, MotionStyle, motion } from "framer-motion";
import { ReactNode } from "react";

type SlideType = "Up" | "Down" | "Left" | "Right";

const animate = {
  Up: { x: 0, y: -1 },
  Down: { x: 0, y: 1 },
  Left: { x: -1, y: 0 },
  Right: { x: 1, y: 0 },
};

const buildAnimation = (slide: SlideType = "Right", value: number = 10, withFade?: boolean) => {
  return {
    initial: { opacity: withFade ? 0 : 1, x: animate[slide].x * value, y: animate[slide].y * value },
    animate: { opacity: 1, x: 0, y: 0 },
    exit: { opacity: withFade ? 0 : 1, x: -(animate[slide].x * value), y: -(animate[slide].y * value) },
  };
};

interface SlideProps extends AnimationProps {
  children: ReactNode;
  id?: string;
  from?: SlideType;
  value?: number;
  duration?: number;
  style?: MotionStyle;
  withFade?: boolean;
}

const Slide = (props: SlideProps) => {
  const { id, from, value, duration, withFade, ...rest } = props;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        variants={buildAnimation(from, value, withFade)}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ duration: duration ?? 0.3 }}
        style={{ width: "100%" }}
        {...rest}
      />
    </AnimatePresence>
  );
};

export default Slide;
