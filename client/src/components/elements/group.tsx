import Tile from "./tile";
import { FaArrowRight } from 'react-icons/fa';

export default function Group() {
  return (
    <div className="w-full flex flex-col space-y-10">
      <div className="flex group flex-col space-y-2">
        <div className="flex px-6 justify-between items-center group-hover:text-primary-600">
          <h2 className="text-5xl transition-all font-accent font-bold">Group title</h2>
          <FaArrowRight size={"1.8rem"} />
        </div>
        <div className="relative">
          <div className="absolute transition-all group-hover:blur w-full h-[3px] rounded-full bg-primary" />
          <div className="w-full h-[3px] rounded-full bg-primary" />
        </div>
      </div>
      <div className="w-full grid grid-cols-6 gap-10">
        <Tile />
        <Tile />
        <Tile />
        <Tile />
        <Tile />
        <Tile />
        <Tile />
        <Tile />
      </div>
    </div>
  )
}
