export default function Header() {

  let name: String = "Admin"

  return (
    <>
    <div className="h-32" />
    <header className="w-full py-8 flex px-10 fixed top-0">
      <h1 className="text-4xl font-bold font-accent">
      Welcome back, <span className="text-primary">{name}</span>
      </h1>
    
    </header>
    </>
  )
}
