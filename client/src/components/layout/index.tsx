import Footer from "./footer";
import Header from "./header";
import Sidebar from "./sidebar";

type Props = {
  children?: React.ReactNode
}

export default function Layout({ children }: Props) {
  return (
    <div className="w-full flex flex-col items-center min-h-screen bg-dark text-light">
      <Header />
      <div className="flex w-full max-w-[1800px] relative z-20">
        <Sidebar />
        <div className="w-full min-h-screen rounded-3xl bg-dark-800 border-dark-600 border-2 p-4 md:p-20">
          {children}
        </div>
        <div className="md:w-10" />
      </div>
      <Footer />
    </div>
  )
}
