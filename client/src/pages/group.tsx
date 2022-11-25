import { useQuery, useQueryClient } from "@tanstack/react-query"
import { useAtom } from "jotai"
import { useEffect } from "react"
import { BiSad } from "react-icons/bi"
import { useParams } from "react-router-dom"
import { getGroup, getGroups } from "../api/groups"
import Group from "../components/elements/group"
import { dialogType, editMode } from "../state"

export default function GroupPage() {

  const id = String(useParams().slug)

  const group = useQuery({
    queryKey: ['group', id],
    queryFn: () => getGroup('', id)
  })

  const [edit, setEdit] = useAtom(editMode)

  const [showDialog, setShowDialog] = useAtom(dialogType)

  console.log(group)


  return (
    <>
      {
        !group.data ?
          <div className="w-full h-full flex flex-col text-8xl space-y-10 opacity-50 justify-center items-center"><div>No groups here</div><BiSad size={'6rem'} /></div>
          :
          <div className="w-full flex flex-col justify-center items-center space-y-10">
            <div className="w-full flex flex-col space-y-6">
              {
                group.isLoading ?
                  <div>loading...</div>
                  :
                  <Group data={group.data} />
              }
            </div>
          </div>
      }
    </>
  )
}
