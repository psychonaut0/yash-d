import Tile from "./tile";
import { FaArrowRight } from 'react-icons/fa';
import { GroupInterface } from "../../interfaces/api";
import { useEffect, useState } from "react";
import { BiPlus, BiTrashAlt } from 'react-icons/bi';
import { useAtom } from "jotai";
import { dialogType, editMode } from "../../state";


type Props = {
  data: GroupInterface
}

export default function Group({ data }: Props) {



  const [edit, setEdit] = useAtom(editMode)

  const [showDialog, setShowDialog] = useAtom(dialogType)

  
  

  return (
    <>
      <div className="w-full flex flex-col space-y-10">
        <div className="w-full flex group flex-col space-y-2">
          <div className="flex px-6 justify-between items-center">
            <div className="flex space-x-4 items-center">
              {
                edit ?
                  <div onClick={() => { setShowDialog({ type: "remove-group", groupId: data._id }) }} className="relative group cursor-pointer flex">
                    <BiTrashAlt className="relative z-20 text-red-500 w-full h-full peer p-2 border rounded-md border-red-500" size={"1rem"} />
                    <BiTrashAlt className="transition-all text-red-500 w-[0%] h-[0%] scale-0 peer-hover:scale-100 p-0 peer-hover:w-full peer-hover:h-full absolute peer-hover:blur-md peer-hover:p-2 peer-hover:border rounded-md border-red-500" size={"1rem"} />
                  </div>
                  :
                  null
              }
              <h2 className="text-5xl transition-all font-accent font-bold">{data.title}</h2>
            </div>
          </div>
        </div>
        <div className="w-full min-h-[200px] grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 sm:gap-4  md:gap-5 lg:gap-8 xl:gap-9 2xl:gap-10 px-6">
          {
            data.tiles?.map((tile, i) => {
              return <Tile key={i} data={tile} />
            })
          }
          {
            edit ?
              <div onClick={() => { setShowDialog({ type: "add-tile-to-group", groupId: data._id }) }} className="group relative cursor-pointer w-full h-full border-2 px-2 py-4 rounded-lg flex justify-center items-center">
                <BiPlus className="transition-all absolute group-hover:blur-md" size={"3rem"} />
                <BiPlus size={"3rem"} />
              </div>
              :
              null
          }
        </div>
      </div>
    </>
  )
}
