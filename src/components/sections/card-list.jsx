import { motion } from 'framer-motion'
import Card from '../widgets/card'

export default function CardList({ filteredServices }) {

  const variants = {
    show: {
      transition: {
        staggerChildren: 0.05,
      }
    }
  }

  return (
    <motion.ul initial={"hidden"} animate={"show"} variants={variants} transition={{ staggerChildren: 0.5, delayChildren: 1 }} className="w-full justify-center flex flex-wrap">
      {
        filteredServices.map((service, i) => {
          return <Card key={i} index={i} data={service} />
        })
      }
    </motion.ul>
  )
}
