import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useRouter } from "next/router";

const variants = {
  in: {
    scale: 1,
    y: 0,
    x: "100%",
    transition: {
      duration: 0.4
    }
  },
  center: {
    x: 0,
    scale: 1,
    transformOrigin: "top",
    transition: {
      duration: 0.4
    }
  },
  scaleUp: {
    scale: 1,
    y: 0,
    transition: {
      duration: 0.4,
      delay: 0.5
    }
  },
  scaleDown: {
    scale: 0.8,
    y: 100,
    transition: {
      duration: 0.4
    }
  },
  out: {
    opacity: 0,
    x: "-100%",
    transition: {
      duration: 0.4,
      delay: 0.5
    }
  }
};

/*
 * Read the blog post here:
 * https://letsbuildui.dev/articles/animated-page-transitions-in-nextjs
 */
const TransitionEffect = ({ children }) => {
  const { asPath } = useRouter();
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="effect-3">
      <AnimatePresence initial={false} exitBeforeEnter>
        <motion.div
          key={asPath}
          variants={!shouldReduceMotion ? variants : null}
          initial="in"
          animate={["center"]}
          // exit={["scaleDown", "out"]}
          exit="out"
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default TransitionEffect;
