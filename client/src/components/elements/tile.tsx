import { TileInterface } from "../../interfaces/api";

type Props = {
  data: TileInterface
}

export default function Tile({data}: Props) {
  
  const lengthLimit = 18

  const isLimited = data.description ? data.description?.length >= lengthLimit : false
  
  return (
    <a href={data.localUrl} target="_blank" className="relative group active:translate-y-1 transition-all active:opacity-50">
      <div className="w-full h-full scale-0 duration-75 group-hover:scale-100 transition-all absolute bg-primary translate-x-0 rounded-xl blur-lg opacity-80" />
      <div className="flex transition-all group-hover:shadow-2xl w-full h-full border-2  px-6  py-4 rounded-xl border-dark-600 group-hover:border-primary  bg-dark relative z-10 flex-col items-center space-y-2 ">
        <div className="absolute w-2 h-2 top-2 right-2">
          <div className="absolute blur-sm rounded-full bg-red-500 w-full h-full"></div>
          <div className="relative z-10 rounded-full border-red-500 border bg-dark-900 w-full h-full"></div>
        </div>
        {
          data.image ?
        <img alt="tile logo" className="object-contain w-28 h-28 py-4" src={data.image?.sourceUrl} />
        :
        <div className="w-28 h-28"/>
        }
        <h3 className="font-accent font-semibold text-primary-600 text-center text-xl">{data.title}</h3>
        <div className="overflow-hidden w-full relative">
        {
          isLimited && (
            <div className="absolute right-0 h-full w-10 bg-gradient-to-l from-dark-900" />
          )
        }
        <p className={`text-center whitespace-nowrap  ${isLimited && "group-hover:animate-marquee"}`}>
          {data.description}
        </p>
        </div>
      </div>
    </a>
  )
}
