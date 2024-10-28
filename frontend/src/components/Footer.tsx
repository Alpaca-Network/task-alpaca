import Image from 'next/image'
import Link from 'next/link'

import { Button } from '@/components/Button'
import { Container } from '@/components/Container'
import { TextField } from '@/components/Fields'
import { Logomark } from '@/components/Logo'
import { NavLinks } from '@/components/NavLinks'
import qrCode from '@/images/qr-code.svg'

function QrCodeBorder(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 96 96" fill="none" aria-hidden="true" {...props}>
      <path
        d="M1 17V9a8 8 0 0 1 8-8h8M95 17V9a8 8 0 0 0-8-8h-8M1 79v8a8 8 0 0 0 8 8h8M95 79v8a8 8 0 0 1-8 8h-8"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  )
}

export function Footer() {
  return (
    <footer className="">
      <Container>
        <div className="flex flex-col items-start justify-between gap-y-12 pb-6 pt-16 lg:flex-row lg:items-center lg:py-16">
        </div>
        <div className="flex flex-col items-center border-t pb-12 pt-8 md:flex-row-reverse md:justify-between md:pt-6 border-gray-300 ">
          <div className="flex space-x-8"> {/* Adjust spacing as needed */}
            <Link href="https://twitter.com/" aria-label="Twitter" className="flex items-center">
              <span className="ml-2" >
                <p className="text-md text-gray-300 md:mt-0">
                  Twitter
                </p>
              </span> {/* Adjust margin as needed */}
            </Link>
            <Link href="https://t.me/" aria-label="Telegram" className="flex items-center">
              <span className="ml-2" >
                <p className="text-md text-gray-300 md:mt-0">
                  Telegram
                </p>
              </span> {/* Adjust margin as needed */}
            </Link>
            <Link href="#" aria-label="FAQ" className="flex items-center">
              <span className="ml-2" >
                <p className="text-md text-gray-300 md:mt-0">
                  FAQ
                </p>
              </span> {/* Adjust margin as needed */}
            </Link>
          </div>

          <p className="mt-0 text-md text-gray-300 md:mt-0">
            &copy;Task Alpaca {new Date().getFullYear()}. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  )
}
