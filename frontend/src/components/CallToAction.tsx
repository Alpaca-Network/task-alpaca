import { AppStoreLink } from '@/components/AppStoreLink'
import { Container } from '@/components/Container'
import { Button } from './Button'

export function CallToAction() {
  return (
    <section
      id="get-free-shares-today"
      className="relative overflow-hidden bg-white py-20 lg:py-28"
    >
      <div className="absolute left-20 top-1/2 -translate-y-1/2 sm:left-1/2 sm:-translate-x-1/2">
      </div>
      <Container className="relative">
        <div className="mx-auto max-w-md sm:text-center">
          <h2 className="text-2xl font-medium tracking-tight text-black sm:text-3xl">
          Create Task
          </h2>
          <p className="mt-4 text-lg text-gray-800">
            Connect your wallet and create a task
          </p>
          <div className="mt-8 flex justify-center">
            <Button href="/task" variant='solid' className="hidden lg:block">
              Try it Now
            </Button>
          </div>
        </div>
      </Container>
    </section>
  )
}
