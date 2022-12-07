import { ControlledMenu, MenuItem, SubMenu, useMenuState } from "@szhsin/react-menu"
import { useState } from "react"
import '@szhsin/react-menu/dist/transitions/slide.css'

type Props = {
  children?: React.ReactNode
}

export default function ContextMenuWrapper({ children }: Props) {

  const [anchorPoint, setAnchorPoint] = useState<{ x: number, y: number }>({ x: 0, y: 0 })
  const [menuProps, toggleMenu] = useMenuState()


  const itemClassNames = `w-full cursor-pointer text-lg transition-all hover:bg-dark-800 hover:text-primary px-4 first-of-type:rounded-t-md last:rounded-b-md border-b border-light border-opacity-10 border-t py-2 first-of-type:border-transparent last:border-transparent first:border-b-transparent`


  return (
    <div onContextMenu={e => {
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
        <SubMenu
          menuClassName={"w-max z-50 bg-dark-600 rounded-md flex flex-col border border-light border-opacity-10"}
          arrow={true} 
          className={`${itemClassNames}`}
          offsetX={15}
          offsetY={-10}
          label="Add to a group">
          <MenuItem className={`${itemClassNames}`}>
            <p>
              Add to a group
            </p>
          </MenuItem>
        </SubMenu>
        <MenuItem className={`${itemClassNames}`}>
          Test
        </MenuItem>
        <MenuItem className={`${itemClassNames}`}>
          Test
        </MenuItem>
      </ControlledMenu>
      {children}
    </div>
  )
}
