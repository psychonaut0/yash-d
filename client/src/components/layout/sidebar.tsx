import { FiHome, FiSettings } from "react-icons/fi";


export default function Sidebar() {
  return (
    <aside className="hidden pl-4 pt-16 md:flex flex-col items-center space-y-2">
      <div className="relative z-10 left-[2px] text-primary py-6 pl-4 pr-10 bg-dark-800  border-2 border-r-0 border-dark-600 rounded-l-3xl">
        <span className="w-10 h-10 absolute bg-dark-800 overflow-hidden -right-0 -top-10 before:absolute before:content-['-'] before:right-0 before:bottom-0 before:w-[200%] before:h-[200%] before:bg-dark before:border-2 before:border-dark-600 before:rounded-[25%] pointer-events-none" />
        <span className="w-10 h-10 absolute bg-dark-800 overflow-hidden -right-0 -bottom-10 before:absolute before:content-['-'] before:right-0 before:top-0 before:w-[200%] before:h-[200%] before:bg-dark before:border-2 before:border-dark-600 before:rounded-[25%] pointer-events-none" />
        <FiHome className="absolute blur-sm" size={'1.5rem'} />
        <FiHome className="relative z-10 cursor-pointer" size={'1.5rem'} />
      </div>
      <div className="relative z-10 left-[2px] text-light py-6 pl-4 pr-10 rounded-l-3xl">
        <FiSettings size={'1.5rem'} />
      </div>
    </aside>
  )
}
