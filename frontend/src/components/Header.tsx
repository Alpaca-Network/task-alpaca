'use client'
import Link from 'next/link'
import { Popover } from '@headlessui/react'
import { AnimatePresence, motion } from 'framer-motion'

import styles from "@/styles/Home.module.css";

import { ConnectButton } from '@rainbow-me/rainbowkit';

import { Button } from '@/components/Button'
import { Container } from '@/components/Container'
import { Logo } from '@/components/Logo'
import { NavLinks } from '@/components/NavLinks'
import { useEffect, useState } from 'react';

import { ChevronUpIcon, MenuIcon } from './Icons';

function MobileNavLink(
  props: Omit<
    React.ComponentPropsWithoutRef<typeof Popover.Button<typeof Link>>,
    'as' | 'className'
  >,
) {
  return (
    <Popover.Button
      as={Link}
      className="block text-base leading-7 tracking-tight text-gray-700"
      {...props}
    />
  )
}

export function Header() {
  return (
    <header>
      <nav>
        <Container className="relative z-50 flex justify-between py-8">
          <div className="relative z-10 flex items-center gap-16">
            <Link href="/" aria-label="Home" className="flex items-center">
              <Logo className="h-10 w-auto mr-2" />
              <span className="ml-2" >
                <h1 className="text-2xl font-medium tracking-tight text-gray-900">
                  Task Llama
                </h1>
              </span> {/* Adjust margin as needed */}
            </Link>
            {/* <div className="hidden lg:flex lg:gap-10">
              <NavLinks />
            </div> */}
          </div>
          <div className="flex items-center gap-6">
            <Popover className="lg:hidden">
              {({ open }) => (
                <>
                  <Popover.Button
                    className="relative z-10 -m-2 inline-flex items-center rounded-lg stroke-gray-900 p-2 hover:bg-gray-200/50 hover:stroke-gray-600 active:stroke-gray-900 ui-not-focus-visible:outline-none"
                    aria-label="Toggle site navigation"
                  >
                    {({ open }) =>
                      open ? (
                        <ChevronUpIcon className="h-6 w-6" />
                      ) : (
                        <MenuIcon className="h-6 w-6" />
                      )
                    }
                  </Popover.Button>
                  <AnimatePresence initial={false}>
                    {open && (
                      <>
                        <Popover.Overlay
                          static
                          as={motion.div}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="fixed inset-0 z-0 bg-gray-300/60 backdrop-blur"
                        />
                        <Popover.Panel
                          static
                          as={motion.div}
                          initial={{ opacity: 0, y: -32 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{
                            opacity: 0,
                            y: -32,
                            transition: { duration: 0.2 },
                          }}
                          className="absolute inset-x-0 top-0 z-0 origin-top rounded-b-2xl bg-gray-50 px-6 pb-6 pt-32 shadow-2xl shadow-gray-900/20"
                        >
                          <div className="space-y-4">
                            {/* <MobileNavLink href="/#features">
                              Features
                            </MobileNavLink>
                            <MobileNavLink href="/#reviews">
                              Reviews
                            </MobileNavLink>
                            <MobileNavLink href="/#pricing">
                              Pricing
                            </MobileNavLink>
                            <MobileNavLink href="/#faqs">FAQs</MobileNavLink> */}
                          </div>
                          <div className="mt-8 flex flex-col gap-4">
                            {/* <Button href="/login" variant="outline">
                              Log in
                            </Button> */}
                            {/* <Button href="/dashboard">Download the app</Button> */}
                          </div>
                        </Popover.Panel>
                      </>
                    )}
                  </AnimatePresence>
                </>
              )}
            </Popover>
            {/* <Button href="/login" variant="outline" className="hidden lg:block">
              Log in
            </Button> */}
            <div className="flex space-x-8"> {/* Adjust spacing as needed */}
              <Link href="/task" aria-label="Task" className="flex items-center">
                <span className="ml-2" >
                  <p className="text-md text-gray-900 md:mt-0">
                    Task
                  </p>
                </span> 
              </Link>
              <Link href="/leaderboard" aria-label="leaderboard" className="flex items-center">
                <span className="ml-2" >
                  <p className="text-md text-gray-900 md:mt-0">
                    Task
                  </p>
                </span> 
              </Link>

              <Link href="#faqs-title" aria-label="Telegram" className="flex items-center">
                <span className="ml-2" >
                  <p className="text-md text-gray-900 md:mt-0">
                    FAQ
                  </p>
                </span> {/* Adjust margin as needed */}
              </Link>
            </div>
            {/* <Button href="/" variant='solid' className="hidden lg:block">
              Coming Soon
            </Button> */}
            <div className='mm-flexContainer'>
              <div className=''>
                <ConnectButton />
                {/* {
                  !hasProvider ? (
                    <Button onClick={() => window.open("https://metamask.io", "_blank")}>
                      Install MetaMask
                    </Button>
                  ) : isClient && window.ethereum?.isMetaMask && wallet.accounts.length < 1 ? (
                    <Button color='gray' disabled={isConnecting} onClick={connectMetaMask}>
                      Connect MetaMask
                    </Button>
                  ) : (
                    hasProvider && wallet.accounts.length > 0 && (
                      // <a
                      //   className="text_link tooltip-bottom"
                      //   href="#" // Here, you might want to use the actual link, commented out in your original code
                      //   // href={`https://etherscan.io/address/${wallet.accounts[0]}`}
                      //   // target="_blank"
                      //   data-tooltip="Open in Block Explorer"
                      // >
                      //   {formatAddress(wallet.accounts[0])}
                      // </a>
                      <Button variant='outline' onClick={() => navigator.clipboard.writeText(wallet.accounts[0])} title='Copy to clipboard'>
                        {formatAddress(wallet.accounts[0])}
                      </Button>

                    )
                  )
                } */}

              </div>
            </div>
          </div>


        </Container>
      </nav>
    </header >
  )
}
