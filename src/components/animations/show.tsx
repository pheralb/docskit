import { motion } from "framer-motion";

interface MotionProps {
  children: React.ReactNode;
  delay?: number;
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
      transition={{
        duration: 0.4,
        delay: props.delay,
      }}
    >
      {props.children}
    </motion.div>
  );
};

export default Show;
