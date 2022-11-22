import { useQuery } from "@tanstack/react-query";
import { useAtom } from "jotai";
import { useState } from "react";
import { getGroups } from "./api/groups"
import AddGroupDialog from "./components/elements/dialogs/addGroup";
import Group from "./components/elements/group";
import Layout from "./components/layout";
import { editMode } from "./state";

function App() {


  const groups = useQuery({
    queryKey: ['groups'],
    queryFn: getGroups
  })



  const [showDialog, setShowDialog] = useState<boolean>(false)

  const [edit, setEdit] = useAtom(editMode)



  return (
    <>
      {
        showDialog ?
          <AddGroupDialog setter={setShowDialog} />
          :
          null
      }
      <Layout>
        {
          (groups.isLoading || !groups.data) ?
            <div>loading...</div>
            :
            groups.data.map((group, i) => {
              return <Group key={i} data={group} />
            })
        }
        <div className="w-full flex justify-center">
          {
            edit ?
              <button onClick={() => { setShowDialog(true) }} className="border-primary-600 border bg-primary p-2 rounded-md text-xl cursor-pointer">
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
