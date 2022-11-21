import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { getGroups } from "./api/groups"
import AddGroupDialog from "./components/elements/dialogs/addGroup";
import Group from "./components/elements/group";
import Layout from "./components/layout";

function App() {
  const groups = useQuery({
    queryKey: ['groups'],
    queryFn: getGroups
  })

  const [showDialog, setShowDialog ] = useState<boolean>(false)

  return (
    <>
      {
        showDialog ?
        <AddGroupDialog setter={setShowDialog}/>
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
        <div onClick={() => {setShowDialog(true)}} className="w-full border-b-2 cursor-pointer">
          Add group
        </div>
      </Layout>
    </>
  )
}

export default App
