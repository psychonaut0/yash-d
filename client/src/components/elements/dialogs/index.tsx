import { useAtom } from "jotai"
import { dialogType } from "../../../state"
import AddGroupDialog from "./addGroup"
import AddTileDialog from "./addTile"
import RemoveGroupDialog from "./removeGroup"

type Props = {
  id?: string
}

export default function Dialog({id}: Props) {


  const [showDialog, setShowDialog] = useAtom(dialogType)

  const dialogTypes = {
    "add-group": <AddGroupDialog />,
    "remove-group": showDialog.groupId && <RemoveGroupDialog id={showDialog.groupId}/>,
    "add-tile": <AddTileDialog />,
    "none": null
  }

  return dialogTypes[showDialog.type] || null
}
