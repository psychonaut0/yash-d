import { useAtom } from "jotai"
import { dialogType } from "../../../../state"
import AddGroupDialog from "./variants/addGroup"
import AddTileDialog from "./variants/addTile"
import AddTileToGroupDialog from "./variants/addTileToGroup"
import EditTile from "./variants/editTile"
import RemoveGroupDialog from "./variants/removeGroup"
import RemoveTileDialog from "./variants/removeTile"

export default function Dialog() {


  const [showDialog, setShowDialog] = useAtom(dialogType)

  console.log(showDialog)


  const dialogTypes = {
    "add-group": <AddGroupDialog />,
    "remove-group": showDialog.groupId && <RemoveGroupDialog id={showDialog.groupId} />,
    "add-tile-to-group": showDialog.groupId && <AddTileToGroupDialog groupId={showDialog.groupId} />,
    "add-tile": <AddTileDialog />,
    "remove-tile": showDialog.tileId && <RemoveTileDialog id={showDialog.tileId} groupId={showDialog.groupId} />,
    "edit-tile": showDialog.tileId && <EditTile id={showDialog.tileId} />,
    "none": null
  }

  return dialogTypes[showDialog.type] || null
}
