import Link from "next/link";
import { motion } from "framer-motion";

const Links = () => (
  <motion.div className="grid">
    <Link legacyBehavior href="/pitch">
      <a className="card">
        <h2>Documentation &rarr;</h2>
        <p>Find in-depth information about Next.js features and API.</p>
      </a>
    </Link>

    <Link legacyBehavior href="/pitch2">
      <a className="card">
        <h2>Learn &rarr;</h2>
        <p>Learn about Next.js in an interactive course with quizzes!</p>
      </a>
    </Link>
  </motion.div>
);

export default Links;
