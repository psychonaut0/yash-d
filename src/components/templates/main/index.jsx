import { getServices } from "../../../services/functions"
import Card from "../../widgets/card"
import { motion } from "framer-motion"

export default function Main({ data }) {

  const services = getServices()


  const variants = {
    show: {
      transition: {
        staggerChildren: 0.05,
      }
    }
  }

  return (
    <div className=" flex min-h-screen justify-center bg-neutral-900 w-full text-slate-100">
      <div className="px-10 flex justify-center items-center min-h-screen ">
        <motion.ul initial={"hidden"} animate={"show"} variants={variants}  transition={{ staggerChildren: 0.5, delayChildren: 1 }} className="w-full justify-center flex flex-wrap">
          {
            services.map((service, i) => {
              return <Card key={i} index={i} data={service} />
            })
          }
        </motion.ul>
      </div>
      {/* <div className="w-1/3 min-h-screen relative bg-neutral-800">
        <div className="text-[200px] blur-sm opacity-70 absolute w-full pointer-events-none top-0 right-32 overflow-hidden h-screen leading-[11rem] text-neutral-900 font-black">
          さらに別のセルフホストダッシュボード
        </div>
      </div> */}
    </div>
  )
}
