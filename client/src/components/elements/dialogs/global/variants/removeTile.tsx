import DialogLayout from "../layout";
import { BiX, BiTrashAlt } from "react-icons/bi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { removeGroup } from "../../../../../api/groups";
import { GroupInterface, TileInterface } from "../../../../../interfaces/api";
import { useAtom } from "jotai";
import { dialogType } from "../../../../../state";
import { removeTile } from "../../../../../api/tiles";


type Props = {
  id: string,
  groupId?: string
}



export default function RemoveTileDialog({ id, groupId }: Props) {
  const queryClient = useQueryClient()

  console.log(queryClient.getQueryData(['groups']))

  const [showDialog, setShowDialog] = useAtom(dialogType)


  const mutation = useMutation({
    mutationFn: (id: string) => removeTile(id),
    onMutate: async (removedTileId) => {
      await queryClient.cancelQueries({ queryKey: ["groups", "tiles"] })
      let prevGroups: GroupInterface[] | undefined = []
      if (groupId) {
        console.log('zan zan')
        prevGroups = queryClient.getQueryData<Array<GroupInterface>>(["groups"])
        let newGroups = prevGroups
        const groupIndex: number | undefined = newGroups?.findIndex((group: GroupInterface) => group._id === groupId)
        console.log('ok', groupIndex);
        const tileIndex: number | undefined = groupIndex && newGroups?.[groupIndex].tiles?.findIndex((tile: TileInterface) => tile._id === removedTileId);
        console.log('ok 2', tileIndex);
        (tileIndex && groupIndex) && newGroups?.[groupIndex].tiles?.splice(tileIndex, 1);
        console.log('ALMOST',newGroups);
        queryClient.setQueryData(["groups"], newGroups)
      }
      const prevTiles = queryClient.getQueryData<Array<TileInterface>>(["tiles"])
      let newTiles = prevTiles
      const index: number | undefined = newTiles?.findIndex((tile: TileInterface) => tile._id === removedTileId);
      index && newTiles?.splice(index, 1)
      queryClient.setQueryData(["tiles"], newTiles)
      return groupId ? { prevGroups } : { prevTiles }
    },
    onError: (err, removedGroupId, context) => {
      console.error(err)
      return context?.prevTiles || context?.prevGroups
    },
    onSettled: (data) => {
      queryClient.invalidateQueries({ queryKey: ["groups", "tiles"] })
      setShowDialog({ type: "none" })
    }
  })

  return (
    <DialogLayout title="Are you sure?">
      <div className="w-full flex space-x-6 justify-center px-6 py-4">
        <div onClick={() => { setShowDialog({ type: "none" }) }} className="cursor-pointer flex px-4 py-2 items-center border-primary-400 text-primary-400 border rounded-md"><BiX size={"2rem"} className="pr-2" />Cancel</div>
        <button onClick={() => { mutation.mutate(id) }} type="submit" className="flex items-center  px-4 py-2 bg-primary rounded-md border-primary-400 border ">Remove <BiTrashAlt size={"2rem"} className="pl-2" /></button>
      </div>
    </DialogLayout>
  )
}
