import Text from "../atoms/typography"
import { motion, useMotionValue, useTransform } from "framer-motion"
import { useState } from "react"

export default function Card({ data, index }) {
  console.log(data)

  const [angle, setAngle] = useState(5)

  function onMove(e) {
    const bounds = e.currentTarget.getBoundingClientRect()

    // set x,y local coordinates
    const xValue = (e.clientX - bounds.x) / e.currentTarget.clientWidth
    const yValue = (e.clientY - bounds.y) / e.currentTarget.clientHeight

    // update MotionValues
    x.set(xValue, true)
    y.set(yValue, true)
  }

  function restoreMove(e) {

    x.set(0.5, true)
    y.set(0.5, true)
  }

  const y = useMotionValue(0.5)
  const x = useMotionValue(0.5)

  const rotateY = useTransform(x, [1, 0], [-angle, angle], {
    clamp: true,
  })
  const rotateX = useTransform(y, [1, 0], [angle, -angle], {
    clamp: true,
  })



  const curve = {
    type: 'spring'
  }


  const variants = {
    hidden: {
      scale: 0
    },
    show: {
      scale: 1,
      transition: {
        ...curve
      }
    },
    hover: {
      scale: 1.08,
      transition: {
        ...curve,
        duration: 0.2, 
        delay: index * 0
      }
    },
    tap: {
      scale: 0.95,
      transition: {
        ...curve,
        duration: 0.2, 
        delay: 0
      }
    },
  }

  return (
    <motion.li 
    variants={variants}
    style={{ perspective: '200px' }} className="w-1/2 sm:w-1/2 md:w-3/12 lg:w-[16.666667%] xl:w-[14.2857%] 2xl:w-[12.5%]">
      <motion.div
        onPointerMove={onMove}
        onPointerLeave={restoreMove}
        variants={variants}
        animate={{scale: 1}}
        whileHover={"hover"}
        whileTap={"tap"}
        style={{
          rotateY,
          rotateX
        }}
        transition={{...curve}}
        className="p-6"
      >
        <div className="rounded-md transition-all h-24 flex justify-center items-center  w-full px-4 py-2 bg-neutral-800 shadow-md hover:shadow-xl hover:shadow-black shadow-black">
          <Text content={data.name} />
        </div>
      </motion.div>
    </motion.li>

  )
}
