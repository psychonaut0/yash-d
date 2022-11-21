
export default function Tile() {
  return (
    <div className="relative group cursor-pointer active:translate-y-1 transition-all active:opacity-50">
      <div className="w-full h-full scale-0 duration-75 group-hover:scale-100 transition-all absolute bg-primary translate-x-0 rounded-xl blur-lg opacity-80" />
      <div className="flex transition-all group-hover:shadow-2xl w-full h-full border-2  px-6  py-4 rounded-xl border-dark-600 group-hover:border-primary  bg-dark relative z-10 flex-col items-center space-y-2 ">
        <div className="absolute w-2 h-2 top-2 right-2">
          <div className="absolute blur-sm rounded-full bg-red-500 w-full h-full"></div>
          <div className="relative z-10 rounded-full border-red-500 border bg-dark-900 w-full h-full"></div>
        </div>
        <img alt="tile logo" className="w-16 py-4" src="vite.svg" />
        <h3 className="font-accent font-semibold text-primary-600 text-center text-xl">Tile Title</h3>
        <p className="text-center">
          Gummi bears apple pie.
        </p>
      </div>
    </div>
  )
}
