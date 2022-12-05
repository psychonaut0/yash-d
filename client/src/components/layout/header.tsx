import { useAtom } from "jotai"
import { useEffect, useState } from "react"
import { BiCheck, BiCheckSquare, BiEdit, BiLogIn, BiUser, BiUserCheck, BiUserCircle } from "react-icons/bi"
import { Link } from "react-router-dom"
import { UserInterface } from "../../interfaces/api"
import { editMode } from "../../state"
import UserMenu from "./userMenu"

export default function Header({ user }: { user: UserInterface | Boolean | undefined }) {


  const [edit, setEdit] = useAtom(editMode)

  const [opacity, setOpacity] = useState(1.00)

  const [showUserMenu, setShowUserMenu] = useState<Boolean>(false)

  // Opacity Scroll handler
  function handleScrollEvent() {
    const distanceY = window.pageYOffset || document.documentElement.scrollTop
    const maxHeight = 70
    let opacityValue = opacity
    if (distanceY <= maxHeight) {
      opacityValue = 1 - (distanceY / maxHeight)
      setOpacity(opacityValue)
    }
    else {
      setShowUserMenu(false)
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
      {
        opacity !== 0 ?
          <header style={{ opacity: opacity }} className="w-full py-8 flex justify-between px-10 fixed top-0 z-50">
            <h1 className="text-4xl font-regular font-accent">
              Welcome{`${user ? ' back' : ''}`}, <span className="text-primary font-bold">{`${user ? name : 'Visitor'}`}</span>
            </h1>
            {
              user ?
                <div className="">
                  <div onClick={() => { setShowUserMenu(!showUserMenu) }} className="cursor-pointer relative group flex justify-center items-center">
                    <BiUserCircle className="text-primary absolute group-hover:blur-sm transition-all" size={"2.5rem"} />
                    <BiUserCircle className="text-primary relative z-10" size={"2.5rem"} />
                  </div>
                  {
                    showUserMenu ?
                      <UserMenu setter={setShowUserMenu} />
                      :
                      null
                  }
                </div>
                :
                <Link className="cursor-pointer relative group" to={"/login"}>
                  <BiLogIn className="text-primary absolute group-hover:blur-sm transition-all" size={"2.5rem"} />
                  <BiLogIn className="text-primary relative z-10" size={"2.5rem"} />
                </Link>
            }
          </header>
          :
          null
      }
    </>
  )
}
