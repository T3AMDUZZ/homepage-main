import { motion } from 'framer-motion'

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
}

export default function ProjectFilter({ filters, activeFilter, onFilterChange }) {
  return (
    <motion.div {...fadeUp} transition={{ duration: 0.5 }} className="flex flex-wrap justify-center gap-2 mb-14">
      {filters.map((f) => (
        <button
          key={f.value}
          onClick={() => onFilterChange(f.value)}
          className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
            activeFilter === f.value
              ? 'bg-primary text-white'
              : 'bg-secondary text-accent hover:text-primary'
          }`}
        >
          {f.label}
        </button>
      ))}
    </motion.div>
  )
}
