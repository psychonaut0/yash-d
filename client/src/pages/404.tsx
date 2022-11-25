import {TbError404} from "react-icons/tb";

export default function NotFound() {
  return (
    <div className="font-mono w-full h-full min-h-screen flex flex-col space-y-4 justify-center items-center bg-dark-900 text-light text-8xl">
      <span className="flex items-center font-sans"><TbError404 size={'12rem'} /> <div className="transform rotate-90 px-20">{":("}</div> </span>
      PAGE NOT FOUND
    </div>
  )
}
