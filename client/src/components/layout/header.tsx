export default function Header() {

  let name: String = "Admin"

  return (
    <header className="w-full py-8 flex px-10 bg-dark">
      <h1 className="text-4xl font-bold font-accent">
      Welcome back, <span className="text-primary">{name}</span>
      </h1>
    
    </header>
  )
}
