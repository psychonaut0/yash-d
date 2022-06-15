import { filter, getServices } from "../../../services/functions"
import Card from "../../widgets/card"
import { motion } from "framer-motion"
import { useState } from "react"
import Search from "../../sections/search"
import CardList from "../../sections/card-list"

export default function Main({ data }) {

  const services = getServices()

  const [filteredServices, setFilteredServices] = useState(services)


  return (
    <div className=" flex flex-col px-10 min-h-screen justify-center bg-neutral-900 w-full text-slate-100">
      <Search services={services} filteredServices={filteredServices} setFilteredServices={setFilteredServices} />
      <CardList filteredServices={filteredServices} />
    </div>
  )
}
