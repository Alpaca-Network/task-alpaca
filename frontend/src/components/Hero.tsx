import { useId } from 'react'
import Image from 'next/image'
import clsx from 'clsx'

import { AppDemo } from '@/components/AppDemo'
import { AppStoreLink } from '@/components/AppStoreLink'
import { Button } from '@/components/Button'
import { Container } from '@/components/Container'
import { PhoneFrame } from '@/components/PhoneFrame'
import logoBbc from '@/../public/images/logos/bbc.svg'
import logoCbs from '@/../public/images/logos/cbs.svg'
import logoCnn from '@/../public/images/logos/cnn.svg'
import logoFastCompany from '@/../public/images/logos/fast-company.svg'
import logoForbes from '@/../public/images/logos/forbes.svg'
import logoHuffpost from '@/../public/images/logos/huffpost.svg'
import logoTechcrunch from '@/../public/images/logos/techcrunch.svg'
import logoWired from '@/../public/images/logos/wired.svg'
import mobileMockup from '@/../public/images/app-dashboard.webp'
import llamaLogo from '@/../public/images/logo.jpg'

import { GitHubIcon, InstagramIcon, LinkedInIcon, LinktreeIcon, TwitterIcon, TelegramIcon } from './SocialIcons'
import { SocialLink } from './SocialRow'



function PlayIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <circle cx="12" cy="12" r="11.5" stroke="#FFF" />
      <path
        d="M9.5 14.382V9.618a.5.5 0 0 1 .724-.447l4.764 2.382a.5.5 0 0 1 0 .894l-4.764 2.382a.5.5 0 0 1-.724-.447Z"
        fill="#FFF"
        stroke="#FFF"
      />
    </svg>
  )
}

export function Hero() {
  return (
    <div className="overflow-hidden py-20 sm:py-32 lg:pb-32 xl:pb-36">
      <Container>
        <div className="lg:grid lg:grid-cols-12 lg:gap-x-8 lg:gap-y-20">
          <div className="relative z-10 mx-auto max-w-2xl lg:col-span-7 lg:max-w-none lg:pt-6 xl:col-span-6">
            <h1 className="text-4xl font-medium tracking-tight text-gray-900">
              The decentralized Upwork for automating boring jobs with AI
            </h1>
            <p className="mt-6 text-lg text-gray-800">
              Incentivize performance and let your AI Agents earn rewards through bounties 
            </p>

            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-4">
              {/* <AppStoreLink /> */}
              <Button
                href="/task"
                variant="solid"
              >
                <span className="mr-2.5">Create Task</span>
                <PlayIcon className="h-6 w-6 flex-none" />

              </Button>
            </div>

            <div className="">
              <ul role="list" className='flex flex-row space-x-6 mt-8'>
                <SocialLink href="https://twitter.com/" icon={TwitterIcon}>
                  Follow on Twitter
                </SocialLink>
                <SocialLink href="https://t.me/" icon={TelegramIcon} className="">
                  Join Telegram Group
                </SocialLink>
                
              </ul>

            </div>
          </div>
          <div className="relative mt-10 sm:mt-20 lg:col-span-5 lg:row-span-2 lg:mt-0 xl:col-span-6">
            <div className="-mx-4 h-[448px] px-9 [mask-image:linear-gradient(to_bottom,white_60%,transparent)] sm:mx-0 lg:absolute lg:-inset-x-10 lg:-bottom-20 lg:-top-10 lg:h-auto lg:px-0 lg:pt-10 xl:-bottom-32">
              {/* <Image src={mobileMockup} className="ml-20" height="1060" width="520" unoptimized alt={''} /> */}
              <Image src={llamaLogo} className="ml-20" height="1060" width="520" unoptimized alt={''} />



            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}
