import { useState } from "react"
import { filter } from "../../services/functions"

export default function Search({services, filteredServices, setFilteredServices}) {

  
  function handleChange(value) {
    let temp = [...filteredServices]
    temp = filter(value, 'name', services, 'include')

    setFilteredServices(temp)
  }
  


  return (
    <div className="h-24 w-full flex justify-center items-center ">
      <input onChange={(e) => { handleChange(e.target.value) }} className="bg-neutral-800 outline-none w-full h-10 rounded-full px-10 py-2" placeholder="Search..." />
    </div>
  )
}
