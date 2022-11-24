import { useQuery } from "@tanstack/react-query";
import { useAtom } from "jotai";
import { getGroups } from "./api/groups"
import { getTiles } from "./api/tiles";
import Dialog from "./components/elements/dialogs";
import Group from "./components/elements/group";
import Layout from "./components/layout";
import { dialogType, editMode } from "./state";

function App() {


  const groups = useQuery({
    queryKey: ['groups'],
    queryFn: getGroups
  })

  const tiles = useQuery({
    queryKey: ['tiles'],
    queryFn: getTiles
  })



  const [showDialog, setShowDialog] = useAtom(dialogType)

  const [edit, setEdit] = useAtom(editMode)



  return (
    <>
      <Dialog />
      <Layout>
        <div className="flex flex-col space-y-12">
        {
          (groups.isLoading || !groups.data) ?
            <div>loading...</div>
            :
            groups.data.map((group, i) => {
              return <Group key={i} data={group} />
            })
        }
        </div>
        <div className="w-full flex justify-center">
          {
            edit ?
              <button onClick={() => { setShowDialog({type: "add-group"}) }} className="border-primary-600 border bg-primary p-2 rounded-md text-xl cursor-pointer">
                Add group
              </button>
              :
              null
          }

        </div>
      </Layout>
    </>
  )
}

export default App
