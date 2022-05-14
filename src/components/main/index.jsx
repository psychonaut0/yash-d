import { getServices } from "../../services/functions"

export default function Main({data}) {

  const config = getServices()

  console.log(config)


  
  return (
    <div className="flex min-h-screen w-full text-slate-100">
      <div className="w-1/2 min-h-screen bg-neutral-900">

      {
        config.services.map((service, i) => {
          return <div className="" key={i}>
              {service.name}
              <img src={service.icon} />
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
