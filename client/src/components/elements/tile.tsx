import { ControlledMenu, MenuItem, useMenuState } from "@szhsin/react-menu";
import { useState } from "react";
import { TileInterface } from "../../interfaces/api";

type Props = {
  data: TileInterface,
  index?: number | undefined
}

export default function Tile({ data , index }: Props) {

  const [anchorPoint, setAnchorPoint] = useState<{ x: number, y: number }>({ x: 0, y: 0 })
  const [menuProps, toggleMenu] = useMenuState()

  const lengthLimit = 18

  const isLimited = data.description ? data.description?.length >= lengthLimit : false

  console.log(menuProps)
  return (
    <div onContextMenu={e => {
      e.preventDefault();
      setAnchorPoint({ x: e.clientX, y: e.clientY })
      toggleMenu(true)
    }}>
        <ControlledMenu
          {...menuProps}
          className="z-50"
          menuClassName="z-50 bg-dark-600 p-4 rounded-md"
          anchorPoint={anchorPoint}
          direction="right"
          onClose={() => { toggleMenu(false) }}>
          <MenuItem>Test</MenuItem>
          <MenuItem>Test</MenuItem>
          <MenuItem>Test</MenuItem>
        </ControlledMenu>
      <a tabIndex={index ? index + 1 : -1} href={data.localUrl} target="_blank" className="relative group active:translate-y-1 transition-all active:opacity-50">
        <div className="w-full h-full scale-0 duration-75 group-hover:scale-100 transition-all absolute bg-primary translate-x-0 rounded-xl blur-lg opacity-80" />
        <div className="flex transition-all group-hover:shadow-2xl w-full h-full border-2  px-6  py-4 rounded-xl border-dark-600 group-hover:border-primary  bg-dark relative z-10 flex-col items-center space-y-2 ">
          {
            data.image ?
              <img alt="tile logo" className="object-contain w-28 h-28 py-4" src={data.image?.sourceUrl} />
              :
              <div className="w-28 h-28" />
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
    </div>
  )
}
