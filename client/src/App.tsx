import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import {getGroups} from "./api/groups"
import Group from "./components/elements/group";
import Layout from "./components/layout";

function App() {
  


  const groups = useQuery({
    queryKey: ['groups'],
    queryFn: getGroups
  })

  return (
    <Layout>
      {
        (groups.isLoading || !groups.data) ?
          <div>loading...</div>
        :
        groups.data.map((group, i) => {
          return <Group key={i} data={group} />
        })
      }
      <div onClick={() => {}} className="w-full border-b-2 cursor-pointer">
        Add group
      </div>
    </Layout>
  )
}

export default App
