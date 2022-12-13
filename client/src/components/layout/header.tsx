import { useAtom } from "jotai"
import { useEffect, useState } from "react"
import { BiCheck, BiCheckSquare, BiEdit, BiLogIn, BiSearch, BiUser, BiUserCheck, BiUserCircle } from "react-icons/bi"
import { Link } from "react-router-dom"
import { UserInterface } from "../../interfaces/api"
import { editMode, searchString } from "../../state"
import UserMenu from "./userMenu"

export default function Header({ user }: { user: UserInterface | Boolean | undefined }) {


  const [edit, setEdit] = useAtom(editMode)
  const [searchQuery, setSearchQuery] = useAtom(searchString)

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



  return (
    <>
      <div className="h-32" />
      {
        opacity !== 0 ?
          <header style={{ opacity: opacity }} className="w-full py-8 flex justify-between px-10 fixed top-0 z-50">
            <h1 className="text-4xl font-regular font-accent">
              Welcome{`${user ? ' back' : ''}`}, <span className="text-primary font-bold">{`${user ? (user as UserInterface).username : 'Visitor'}`}</span>
            </h1>
            <div className="flex items-center space-x-4">
              <div className="group relative flex items-center">
                <BiSearch className="peer transition-all cursor-pointer absolute right-2 text-primary" size={"2rem"} />
                <input 
                value={searchQuery} 
                onChange={(e) => {setSearchQuery(e.target.value)}} 
                placeholder="Search..." 
                className={`
                ${searchQuery !== '' ? 'w-full bg-dark-800 border-dark-600' : 'hover:w-full hover:bg-dark-800 hover:border-dark-600 focus:w-full focus:bg-dark-800 peer-hover:w-auto peer-hover:border-dark-600 peer-hover:bg-dark-800 transition-all w-[0%]  bg-transparent border-transparent'} focus:border-primary focus:outline-none p-2 rounded-md border-2`} />
              </div>
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
            </div>
          </header>
          :
          null
      }
    </>
  )
}
