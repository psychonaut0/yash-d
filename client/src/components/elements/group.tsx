import Tile from "./tile";
import { FaArrowRight } from 'react-icons/fa';
import { GroupInterface } from "../../interfaces/api";
import { useState } from "react";
import { BiTrashAlt } from 'react-icons/bi';
import RemoveGroupDialog from "./dialogs/removeGroup";


type Props = {
  data: GroupInterface
}

export default function Group({ data }: Props) {

  const [showDialog, setShowDialog] = useState<boolean>(false)


  return (
    <>
      {
        showDialog ?
          <RemoveGroupDialog setter={setShowDialog} id={data._id}/>
          :
          null
      }
      <div className="w-full flex flex-col space-y-10">
        <div className="flex group flex-col space-y-2">
          <div className="flex px-6 justify-between items-center">
            <div className="flex space-x-4 items-center">
              <div onClick={() => {setShowDialog(true)}} className="relative group cursor-pointer flex">
                <BiTrashAlt className="relative z-20 text-red-500 w-full h-full peer p-2 border rounded-md border-red-500" size={"1rem"} />
                <BiTrashAlt className="transition-all text-red-500 w-[0%] h-[0%] scale-0 peer-hover:scale-100 p-0 peer-hover:w-full peer-hover:h-full absolute peer-hover:blur-md peer-hover:p-2 peer-hover:border rounded-md border-red-500" size={"1rem"} />
              </div>
              <h2 className="text-5xl transition-all font-accent font-bold">{data.title}</h2>
            </div>
            <FaArrowRight size={"1.8rem"} />
          </div>
          <div className="relative">
            <div className="w-full relative z-10  h-[2px] rounded-full  bg-light" />
          </div>
        </div>
        <div className="w-full grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 sm:gap-4  md:gap-5 lg:gap-8 xl:gap-9 2xl:gap-10 px-6">
          {
            data.tiles?.map((tile, i) => {
              return <Tile key={i} />
            })
          }
        </div>
      </div>
    </>
  )
}
