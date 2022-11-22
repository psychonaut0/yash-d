import DialogLayout from "./layout";
import { BiX, BiTrashAlt } from "react-icons/bi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { removeGroup } from "../../../api/groups";
import { GroupInterface } from "../../../interfaces/api";


type Props = {
  setter:  React.Dispatch<React.SetStateAction<boolean>>,
  id: string
}


export default function RemoveGroupDialog({ setter, id }: Props) {
  const queryClient = useQueryClient()
  
  const mutation = useMutation({
    mutationFn: (id: string) => removeGroup(id),
    onMutate: async (removedGroupId) => {
      await queryClient.cancelQueries({ queryKey: ["groups"] })
      const prevGroups = queryClient.getQueryData<Array<GroupInterface>>(["groups"])
      let newGroups = prevGroups
      const index: number | undefined = newGroups?.findIndex((group: GroupInterface) => group._id === removedGroupId);
      index && newGroups?.splice(index, 1)
      queryClient.setQueryData(["groups"], newGroups)
      return { prevGroups }
    },
    onError: (err, removedGroupId, context) => {
      console.error(err)
      return context?.prevGroups
    },
    onSettled: (data) => {
      queryClient.invalidateQueries({ queryKey: ["groups"] })
    }
  })

  return (
    <DialogLayout title="Are you sure?">
        <div className="w-full flex space-x-6 justify-center px-6 py-4">
          <div onClick={() => { setter(false) }} className="cursor-pointer flex px-4 py-2 items-center border-primary-400 text-primary-400 border rounded-md"><BiX size={"2rem"} className="pr-2" />Cancel</div>
          <button onClick={() => {mutation.mutate(id); setter(false)}} type="submit" className="flex items-center  px-4 py-2 bg-primary rounded-md border-primary-400 border ">Remove <BiTrashAlt size={"2rem"} className="pl-2" /></button>
        </div>
    </DialogLayout>
  )
}
