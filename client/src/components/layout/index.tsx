import { useQuery } from "@tanstack/react-query";
import { Outlet } from "react-router-dom";
import { getGroups } from "../../api/groups";
import { getUser } from "../../api/user";
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

  const user = useQuery({
    queryFn: getUser,
    queryKey: ['user']
  })



  return (
    <>
      <Dialog />
      <div className="w-full h-full flex flex-col items-center min-h-screen bg-dark text-light">
        {
          !user?.isLoading &&
          <Header user={user.data} />
        }
        <div className="flex w-full h-full max-w-[1800px] relative z-20">
          <Sidebar groups={groups.data} />
          <div className="w-full min-h-[700px] rounded-3xl bg-dark-800 border-dark-600 border-2 p-4 md:p-20">
            {/* <div className="fixed   -left-48 w-screen h-screen bg-transparent pointer-events-none font-bold text-[600px] flex text-primary opacity-5 ">
              <span className="whitespace-nowrap">
                ヤシダイ
              </span>
            </div> */}
            <Outlet />
          </div>
          <div className="md:w-10" />
        </div>
        <Footer />
      </div>
    </>
  )
}
