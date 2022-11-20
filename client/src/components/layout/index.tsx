import Footer from "./footer";
import Header from "./header";
import Sidebar from "./sidebar";

type Props = {
  children?: React.ReactNode
}

export default function Layout({ children }: Props) {
  return (
    <>
      <div className="w-full min-h-screen bg-dark text-light">
        <Header />
        <div className="flex">
          <Sidebar />
          <div className="w-full min-h-screen rounded-3xl bg-dark-800 border-dark-600 border-2 p-20">
          {children}
          </div>
          <div className="w-10" />
        </div>
        <Footer />
      </div>
    </>
  )
}
