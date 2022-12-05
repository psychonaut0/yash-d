import { BiEdit, BiPencil, BiUser } from "react-icons/bi"
import { FiSettings } from "react-icons/fi"

export default function UserMenu({setter}: {setter: React.Dispatch<React.SetStateAction<Boolean>>}) {

  const elementClasses = `cursor-pointer hover:text-primary transition-all w-full flex items-center px-4 pb-1 border-b border-dark-600 last:border-0`

  return (
    <div className="w-screen h-screen absolute top-0 left-0 overflow-hidden">
      <div onClick={() => {setter(false)}} className="absolute w-full h-full z-10" />
      <div className="z-50 w-72 absolute top-20 right-10 rounded-md flex justify-end items-center">
        <div className="w-max rounded-lg bg-dark-800 p-2 border-dark-600 border-2 flex flex-col justify-center items-center space-y-2 text-lg">
          <div className={`${elementClasses}`}>
            <BiUser className="px-2" size={'3rem'} />
            <p className="pl-4">
              Your Profile
            </p>
          </div>
          <div className={`${elementClasses}`}>
            <BiEdit className="px-2" size={'3rem'} />
            <p className="pl-4">
              Edit mode
            </p>
          </div>
          <div className={`${elementClasses}`}>
            <FiSettings className="px-2" size={'3rem'} />
            <p className="pl-4">
              Settings
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
