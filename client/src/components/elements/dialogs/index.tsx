import { useAtom } from "jotai"
import { dialogType } from "../../../state"
import AddGroupDialog from "./addGroup"
import AddTileDialog from "./addTile"
import RemoveGroupDialog from "./removeGroup"


export default function Dialog() {


  const [showDialog, setShowDialog] = useAtom(dialogType)

  const dialogTypes = {
    "add-group": <AddGroupDialog />,
    "remove-group": showDialog.groupId && <RemoveGroupDialog id={showDialog.groupId}/>,
    "add-tile": showDialog.groupId && <AddTileDialog groupId={showDialog.groupId} />,
    "none": null
  }

  return dialogTypes[showDialog.type] || null
}
