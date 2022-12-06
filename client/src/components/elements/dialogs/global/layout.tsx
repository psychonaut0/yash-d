type Props = {
  title?: string,
  children?: React.ReactNode
}

export default function DialogLayout({ title, children }: Props) {
  return (
    <div className="fixed w-full h-full top-0 left-0 bg-dark-900 bg-opacity-90 z-50 flex justify-center items-center overflow-auto">
      <div className="min-w-[32rem] bg-dark-800 px-8 py-4 rounded-2xl border border-dark-600 text-light">
        <h1 className="max-w-xl text-6xl font-accent font-semibold py-6 text-primary-600">
          {title}
        </h1>
        {children}
      </div>
    </div>
  )
}
