import Tile from "./tile";
import { FaArrowRight } from 'react-icons/fa';
import { GroupInterface } from "../../interfaces/api";

type Props = {
  data: GroupInterface
}

export default function Group({ data }: Props) {

 
  return (
    <div className="w-full flex flex-col space-y-10">
      <div className="flex group flex-col space-y-2">
        <div className="flex px-6 justify-between items-center group-hover:text-primary-600">
          <h2 className="text-5xl transition-all font-accent font-bold">{data.title}</h2>
          <FaArrowRight size={"1.8rem"} />
        </div>
        <div className="relative">
          <div className="absolute transition-all group-hover:blur w-full h-[3px] rounded-full group-hover:bg-primary" />
          <div className="w-full relative z-10  h-[2px] rounded-full group-hover:bg-primary bg-light" />
        </div>
      </div>
      <div className="w-full grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 sm:gap-4  md:gap-5 lg:gap-8 xl:gap-9 2xl:gap-10 px-6">
        {
          data.tiles?.map((tile, i) => {
            return <Tile key={i} />
          })
        }
      </div>
    </div>
  )
}
