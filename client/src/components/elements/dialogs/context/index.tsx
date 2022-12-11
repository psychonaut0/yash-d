import { ControlledMenu, MenuItem, SubMenu, useMenuState } from "@szhsin/react-menu"
import { useState } from "react"
import '@szhsin/react-menu/dist/transitions/slide.css'
import { BiEdit, BiFolder, BiPlus, BiRightArrow, BiRightArrowAlt, BiRightArrowCircle, BiTrash, BiTrashAlt, BiWorld } from "react-icons/bi"
import { GroupInterface, TileInterface } from "../../../../interfaces/api"
import { dialogType } from "../../../../state"
import { useAtom } from "jotai"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { addGroupTile } from "../../../../api/groups"

type Props = {
  children?: React.ReactNode,
  data: TileInterface,
  groupId?: string
}

export default function ContextMenuWrapper({ data, groupId, children }: Props) {



  const queryClient = useQueryClient()

  const groups: [GroupInterface] | undefined = queryClient.getQueryData(['groups'])

  const [anchorPoint, setAnchorPoint] = useState<{ x: number, y: number }>({ x: 0, y: 0 })
  const [menuProps, toggleMenu] = useMenuState()

  const [showDialog, setShowDialog] = useAtom(dialogType)

  const mutationGroup = useMutation({
    mutationFn: (data: [string, any]) => addGroupTile(data[0], data[1]),
    onSuccess: (data: GroupInterface) => {
      queryClient.invalidateQueries({ queryKey: ["group", data._id] })
      queryClient.invalidateQueries({ queryKey: ["groups"] })
    }
  })

  const itemClassNames = `flex items-center w-full cursor-pointer transition-all hover:bg-dark-800 hover:text-primary px-4 first-of-type:rounded-t-md last:rounded-b-md border-b border-light border-opacity-10 border-t py-2 first-of-type:border-transparent last:border-transparent first:border-b-transparent`


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
        {
          data.localUrl && (
            <MenuItem href={data.localUrl} className={`${itemClassNames}`}>
              <BiWorld className="pr-2" size={"1.6rem"} />
              Open local
            </MenuItem>
          )
        }
        {
          data.remoteUrl !== "" && (
            <MenuItem href={data.remoteUrl} className={`${itemClassNames}`}>
              <BiWorld className="pr-2" size={"1.6rem"} />
              Open remote
            </MenuItem>
          )
        }
        {
          ((groups && (groups.length > 0))) && (
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
              {
                groups.map((group, i) => {
                  const check = (group.tiles as string[])?.find((tile: string) => tile === data._id) === undefined
                  return <MenuItem onClick={() => { mutationGroup.mutate([group._id, { tileId: data._id }]) }} key={i} className={`${itemClassNames} text-light ${!check ? 'ya-disabled' : ''}`}>
                    <BiFolder className="pr-2" size={'1.6rem'} />
                    <p>
                      {group.title}
                    </p>
                  </MenuItem>
                })
              }
            </SubMenu>
          )
        }
        <MenuItem onClick={() => { setShowDialog({ type: "edit-tile", tileId: data._id }) }} className={`${itemClassNames}`}>
          <BiEdit className="pr-2" size={"1.6rem"} />
          Edit
        </MenuItem>
        <MenuItem onClick={() => { setShowDialog({ type: "remove-tile", tileId: data._id, groupId: groupId }) }} className={`${itemClassNames}`}>
          <BiTrashAlt className="pr-2" size={"1.6rem"} />
          Delete
        </MenuItem>
      </ControlledMenu>
      {children}
    </div>
  )
}
