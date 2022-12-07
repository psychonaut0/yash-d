import { ControlledMenu, MenuItem, SubMenu, useMenuState } from "@szhsin/react-menu"
import { useState } from "react"
import '@szhsin/react-menu/dist/transitions/slide.css'
import { BiEdit, BiPlus, BiRightArrow, BiRightArrowAlt, BiRightArrowCircle, BiTrash, BiTrashAlt, BiWorld } from "react-icons/bi"

type Props = {
  children?: React.ReactNode
}

export default function ContextMenuWrapper({ children }: Props) {

  const [anchorPoint, setAnchorPoint] = useState<{ x: number, y: number }>({ x: 0, y: 0 })
  const [menuProps, toggleMenu] = useMenuState()


  const itemClassNames = `flex items-center w-full cursor-pointer transition-all hover:bg-dark-800 hover:text-primary px-4 first-of-type:rounded-t-md last:rounded-b-md border-b border-light border-opacity-10 border-t py-2 first-of-type:border-transparent last:border-transparent first:border-b-transparent`


  console.log(menuProps)
  return (
    <div 
    className="w-full h-full group"
    onContextMenu={e => {
      e.preventDefault();
      setAnchorPoint({ x: e.clientX, y: e.clientY })
      toggleMenu(true)
    }}>
      <ControlledMenu
        {...menuProps}
        menuClassName="w-max z-50 bg-dark-600 rounded-md flex flex-col border border-light border-opacity-10"
        anchorPoint={anchorPoint}
        direction="right"
        onClose={() => { toggleMenu(false) }}>
        <MenuItem className={`${itemClassNames}`}>
          <BiWorld className="pr-2" size={"1.6rem"} />
          Open local
        </MenuItem>
        <MenuItem className={`${itemClassNames}`}>
          <BiWorld className="pr-2" size={"1.6rem"} />
          Open remote
        </MenuItem>
        <SubMenu
          menuClassName={"w-max z-50 bg-dark-600 rounded-md flex flex-col border border-light border-opacity-10"}
          className={`${itemClassNames}`}
          offsetX={15}
          offsetY={-10}
          label={() => {
            return <p className="flex items-center">
              <BiPlus className="pr-2" size={'1.6rem'} />
              {"Add to a Group"}
              <BiRightArrowAlt className="pl-2" size={'1.5rem'} />
            </p>
          }}>
          <MenuItem className={`${itemClassNames}`}>
            <p>
              Group name
            </p>
          </MenuItem>
        </SubMenu>
        <MenuItem className={`${itemClassNames}`}>
          <BiEdit className="pr-2" size={"1.6rem"} />
          Edit
        </MenuItem>
        <MenuItem className={`${itemClassNames}`}>
          <BiTrashAlt className="pr-2" size={"1.6rem"} />
          Delete
        </MenuItem>
      </ControlledMenu>
      {children}
    </div>
  )
}
