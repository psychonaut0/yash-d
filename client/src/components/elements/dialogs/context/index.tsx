import { ControlledMenu, MenuItem, useMenuState } from "@szhsin/react-menu"
import { useState } from "react"

type Props = {
  children?: React.ReactNode
}

export default function ContextMenuWrapper({ children }: Props) {

  const [anchorPoint, setAnchorPoint] = useState<{ x: number, y: number }>({ x: 0, y: 0 })
  const [menuProps, toggleMenu] = useMenuState()

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
      {children}
    </div>
  )
}
