import { useQuery } from "@tanstack/react-query"
import { useAtom } from "jotai"
import { BiPlus } from "react-icons/bi"
import { useLoaderData, useLocation, useParams } from "react-router-dom"
import { getGroups } from "../api/groups"
import { getTiles } from "../api/tiles"
import { getUser } from "../api/user"
import Tile from "../components/elements/tile"
import Layout from "../components/layout"
import { dialogType, editMode } from "../state"

export default function Home() {






  const tiles = useQuery({
    queryKey: ['tiles'],
    queryFn: getTiles
  })

 



  const [showDialog, setShowDialog] = useAtom(dialogType)

  const [edit, setEdit] = useAtom(editMode)

  return (
    <>
      <div className="flex flex-col space-y-12">
        <div>
          <div className="w-full min-h-[200px] grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 sm:gap-4  md:gap-5 lg:gap-8 xl:gap-9 2xl:gap-10 px-6">
            {
              (tiles.isLoading || !tiles.data) ?
                <div>loading...</div>
                :
                tiles.data.map((tile, i) => {
                  return <Tile index={i}  key={i} data={tile} />
                })
            }
            {
              edit ?
                <div onClick={() => { setShowDialog({ type: "add-tile"}) }} className="group relative cursor-pointer w-full h-full border-2 px-2 py-4 rounded-lg flex justify-center items-center">
                  <BiPlus className="transition-all absolute group-hover:blur-md" size={"3rem"} />
                  <BiPlus size={"3rem"} />
                </div>
                :
                null
            }
          </div>
        </div>
      </div>
      <div className="w-full flex justify-center pt-10">

      </div>
    </>
  )
}
