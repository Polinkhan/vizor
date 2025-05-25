import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";

const animation = {
  initial: { opacity: 0, x: 50 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -50 },
};

const AnimatePage = ({ children }: any) => {
  const { pathname } = useLocation();
  return (
    <motion.div key={pathname} variants={animation} initial="initial" animate="animate" exit="exit">
      {children}
    </motion.div>
  );
};

export default AnimatePage;
