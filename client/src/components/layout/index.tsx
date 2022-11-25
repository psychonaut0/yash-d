import { useQuery } from "@tanstack/react-query";
import { Outlet } from "react-router-dom";
import { getGroups } from "../../api/groups";
import Dialog from "../elements/dialogs";
import Footer from "./footer";
import Header from "./header";
import Sidebar from "./sidebar";

type Props = {
  children?: React.ReactNode
}

export default function Layout({ children }: Props) {

  const groups = useQuery({
    queryKey: ['groups'],
    queryFn: () => getGroups({})
  })

  return (
    <>
    <Dialog />
    <div className="w-full flex flex-col items-center min-h-screen bg-dark text-light">
      <Header />
      <div className="flex w-full max-w-[1800px] relative z-20">
        <Sidebar groups={groups.data}/>
        <div className="w-full min-h-screen rounded-3xl bg-dark-800 border-dark-600 border-2 p-4 md:p-20">
          <Outlet />
        </div>
        <div className="md:w-10" />
      </div>
      <Footer />
    </div>
    </>
  )
}
