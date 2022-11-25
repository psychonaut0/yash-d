import { useAtom } from "jotai"
import { useEffect, useState } from "react"
import { BiCheck, BiCheckSquare, BiEdit } from "react-icons/bi"
import { editMode } from "../../state"

export default function Header() {

  const [edit, setEdit] = useAtom(editMode)

  const [opacity, setOpacity] = useState(1.00)

  function handleScrollEvent() {
    const distanceY = window.pageYOffset || document.documentElement.scrollTop
    const maxHeight = 70
    let opacityValue = opacity
    if (distanceY <= maxHeight) {
      opacityValue = 1 - (distanceY / maxHeight)
      setOpacity(opacityValue)
    }
    else {
      setOpacity(0)
    }
  }


  useEffect(() => {
    window.addEventListener('scroll', handleScrollEvent);
    return () => {
      window.removeEventListener("scroll", handleScrollEvent)
    }
  }, [])

  let name: String = "Admin"

  return (
    <>
      <div className="h-32" />
      <header style={{opacity: opacity}} className="w-full py-8 flex justify-between px-10 fixed top-0">
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
