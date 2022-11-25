import { useQuery, useQueryClient } from "@tanstack/react-query"
import { useAtom } from "jotai"
import { useEffect } from "react"
import { useParams } from "react-router-dom"
import { getGroup, getGroups } from "../api/groups"
import Group from "../components/elements/group"
import { dialogType, editMode } from "../state"

export default function GroupPage() {

  const id = String(useParams().slug)


  const queryClient = useQueryClient()

  const group = useQuery({
    queryKey: ['group'],
    queryFn: () => getGroup('', id)
  })

  useEffect(() => {
    queryClient.invalidateQueries(['group'])
  }, [])
  




  const [edit, setEdit] = useAtom(editMode)

  const [showDialog, setShowDialog] = useAtom(dialogType)


  return (
    <>
      <div className="w-full flex flex-col justify-center items-center space-y-10">
        <div className="flex flex-col space-y-6">
          {
            !group.data || group.isLoading ?
              <div>loading...</div>
              :
              <Group data={group.data} />
          }
        </div>
        <div>
          {
            edit ?
              <button onClick={() => { setShowDialog({ type: "add-group" }) }} className="border-primary-600 border bg-primary p-2 rounded-md text-xl cursor-pointer">
                Add group
              </button>
              :
              null
          }
        </div>
      </div>
    </>
  )
}
