import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { CiWarning } from "react-icons/ci";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { getGroups } from "../../api/groups";
import { getUser } from "../../api/user";
import Dialog from "../elements/dialogs/global";
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

  const navigate = useNavigate()
  const location = useLocation().pathname

  useEffect(() => {
    if(!user.data){
      navigate('/login')
    }
  }, [])
  


  const allowedPaths = [
    '/login'
  ]

  return (
    <>
      <Dialog />
      <div className="w-full h-full flex flex-col items-center min-h-screen bg-dark text-light">
        {
          !user?.isLoading &&
          <Header user={user.data} />
        }
        <div className="flex w-full h-full max-w-[1800px] relative z-20">
          <Sidebar user={user.data} groups={groups.data} />
          <div className="w-full min-h-[700px] rounded-3xl bg-dark-800 border-dark-600 border-2 p-4 md:p-20">
            {
              user.data || allowedPaths.includes(location) ?
                <Outlet />
                :
                <div className="flex flex-col space-y-10 w-full h-full justify-center items-center text-3xl opacity-80">
                  <CiWarning className="py-10" size={'14rem'} />
                  <p>
                    Hey, i don't know you! Please <Link to={'/login'} className="transition-all text-primary hover:text-primary-600 hover:underline"> login </Link>  to view the content!
                  </p>
                </div>
            }
          </div>
          <div className="md:w-10" />
        </div>
        <Footer />
      </div>
    </>
  )
}
