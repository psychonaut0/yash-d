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
          {children}
          <div className="w-10" />
        </div>
        <Footer />
      </div>
    </>
  )
}
