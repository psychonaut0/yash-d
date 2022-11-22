import { useAtom } from "jotai"
import { BiCheck, BiCheckSquare, BiEdit } from "react-icons/bi"
import { editMode } from "../../state"

export default function Header() {

  const [edit, setEdit] = useAtom(editMode)

  let name: String = "Admin"

  return (
    <>
      <div className="h-32" />
      <header className="w-full py-8 flex justify-between px-10 fixed top-0">
        <h1 className="text-4xl font-bold font-accent">
          Welcome back, <span className="text-primary">{name}</span>
        </h1>
        <div onClick={() => { setEdit(!edit) }} className="cursor-pointer relative group">
          {
            !edit ?
              <>
                <BiEdit className="text-primary absolute group-hover:blur-sm transition-all" size={"2.5rem"} />
                <BiEdit className="text-primary relative z-10" size={"2.5rem"} />
              </>
              :
              <>
                <BiCheckSquare className="text-primary absolute group-hover:blur-sm transition-all" size={"2.5rem"} />
                <BiCheckSquare className="text-primary relative z-10" size={"2.5rem"} />
              </>
          }
        </div>
      </header>
    </>
  )
}
