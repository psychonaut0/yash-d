export default function Main({data}) {

  const services = [
    {
      title: "mimmo",
      icon: "boh.jpg"
    },
    {
      title: "pippo",
      icon: "boh.jpg"
    },
    {
      title: "gino",
      icon: "boh.jpg"
    },
    {
      title: "foo",
      icon: "boh.jpg"
    },
    {
      title: "bar",
      icon: "boh.jpg"
    }
  ]

  return (
    <div className="flex min-h-screen w-full text-slate-100">
      <div className="w-1/2 min-h-screen bg-neutral-900">

      {
        services.map((service, i) => {
          return <div className="" key={i}>
              {service.title}
            </div>
        })
      }
      </div>
      <div className="w-1/2 min-h-screen bg-neutral-800">
        <div className="text-[150px] text-neutral-900 font-black">
        さらに別のセルフホストダッシュボード
        </div>
      </div>
    </div>
  )
}
