import { useAtom } from "jotai";
import { useState } from "react";
import { BiPlus } from "react-icons/bi";
import { FiFolder, FiHome, FiPlus, FiPlusCircle, FiPlusSquare, FiSettings } from "react-icons/fi";
import { Link, useLocation, useMatch } from "react-router-dom";
import { GroupInterface } from "../../interfaces/api";
import { dialogType, editMode } from "../../state";

type Props = {
  groups: GroupInterface[] | undefined
}

function Curves() {
  return (
    <>
      <span className="w-10 h-10 absolute bg-dark-800 overflow-hidden -right-0 -top-10 before:absolute before:content-['-'] before:right-0 before:bottom-0 before:w-[200%] before:h-[200%] before:bg-dark before:border-2 before:border-dark-600 before:rounded-[25%] pointer-events-none" />
      <span className="w-10 h-10 absolute bg-dark-800 overflow-hidden -right-0 -bottom-10 before:absolute before:content-['-'] before:right-0 before:top-0 before:w-[200%] before:h-[200%] before:bg-dark before:border-2 before:border-dark-600 before:rounded-[25%] pointer-events-none" />
    </>
  )
}

export default function Sidebar({ groups }: Props) {


  const [edit, setEdit] = useAtom(editMode)

  const [showDialog, setShowDialog] = useAtom(dialogType)

  const location = useLocation().pathname

  const activeClasses = "text-primary bg-dark-800 border-2 border-r-0 border-dark-600"
  const inactiveClasses = "border-transparent"
  const defaultClasses = "left-[2px] relative z-10 py-6 pl-4 border-2 border-r-0 pr-10 rounded-l-3xl flex group"

  return (
    <aside className="h-auto hidden pl-4 py-16 md:flex flex-col items-between space-y-2 text-light">
      <Link to={'/'} className={`${location === '/' ? activeClasses : inactiveClasses} ${defaultClasses}`}>
        {location === '/' && <Curves />}
        <FiHome className="absolute group-hover:blur-sm transition-all" size={'1.5rem'} />
        <FiHome className="relative z-10 cursor-pointer" size={'1.5rem'} />
      </Link>
      <div className="w-full h-full flex flex-col flex-grow justify-center items-center space-y-2 py-10">
        {
          groups?.map((group, i) => {
            return <Link to={`/group/${group._id}`} className={`${location === `/group/${group._id}` ? activeClasses : inactiveClasses} ${defaultClasses}`} key={i}>
              {location === `/group/${group._id}` && <Curves />}
              <FiFolder className="relative z-10 cursor-pointer" size={'1.5rem'} />
              <FiFolder className="absolute group-hover:blur-sm transition-all" size={'1.5rem'} />
            </Link>
          })
        }
        {
          edit ?
            <button onClick={() => { setShowDialog({ type: "add-group" }) }} className={`${defaultClasses} ${inactiveClasses}`}>
              <FiPlusSquare className="relative z-10 cursor-pointer" size={'1.5rem'} />
              <FiPlusSquare className="absolute group-hover:blur-sm transition-all" size={'1.5rem'} />

            </button>
            :
            null
        }
      </div>
      <Link to={'/settings'} className={`${location === '/settings' ? activeClasses : inactiveClasses} ${defaultClasses}`}>
        {location === `/settings` && <Curves />}
        <FiSettings className="relative z-10 cursor-pointer" size={'1.5rem'} />
        <FiSettings className="absolute group-hover:blur-sm transition-all" size={'1.5rem'} />
      </Link>
    </aside>
  )
}
