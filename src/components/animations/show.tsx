import { motion } from "framer-motion";

interface MotionProps {
  children: React.ReactNode;
}

const Show = (props: MotionProps) => {
  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={{
        initial: {
          opacity: 0,
        },
        animate: {
          opacity: 1,
        },
      }}
    >
      {props.children}
    </motion.div>
  );
};

export default Show;
