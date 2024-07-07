import Link from 'next/link'
import { Logo } from '@/components/Logo'

export function RegistryLayout({
  title,
  subtitle,
  children,
}: {
  title: string
  subtitle: React.ReactNode
  children: React.ReactNode
}) {
  return (
    <main className="flex min-h-full overflow-hidden pt-16 sm:py-28">
      <div className="mx-auto flex w-full max-w-2xl flex-col px-4 sm:px-6">

        {/* <Link href="/" aria-label="Home">
          <Logo className="mx-auto h-10 w-auto" />
        </Link> */}

        {/* <div className="relative mt-12 sm:mt-16"> */}
        <div className="relative">


        </div>
        <div className="-mx-4 mt-10 flex-auto bg-gray-900 px-2 py-0 shadow-2xl shadow-gray-900/10 sm:mx-0 sm:flex-none sm:rounded-5xl sm:p-10">
          <h1 className="text-center text-2xl font-medium tracking-tight text-gray-100">
            {title}
          </h1>

          {subtitle && (
            <p className="mt-3 text-center text-lg text-gray-300">{subtitle}</p>
          )}
          {children}
        </div>


      </div>
    </main>
  )
}