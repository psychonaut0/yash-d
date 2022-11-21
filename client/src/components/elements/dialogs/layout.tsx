type Props = {
  title?: string,
  children?: React.ReactNode
}

export default function DialogLayout({ title, children }: Props) {
  return (
    <div className="fixed w-full h-full bg-dark-900 bg-opacity-90 z-50 flex justify-center items-center">
      <div className="bg-dark-800 px-8 py-4 rounded-2xl border border-dark-600 text-light">
        <h1 className="text-6xl font-accent font-semibold py-6 text-primary-600">
          {title}
        </h1>
        {children}
      </div>
    </div>
  )
}
