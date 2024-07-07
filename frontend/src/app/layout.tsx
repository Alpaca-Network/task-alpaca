'use client';

import { Inter } from 'next/font/google'
import '@/styles/tailwind.css'
import clsx from 'clsx'

import '@rainbow-me/rainbowkit/styles.css';

import { getDefaultConfig, RainbowKitProvider, Chain, darkTheme } from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import {
  QueryClientProvider,
  QueryClient,
} from "@tanstack/react-query";

import { http, createConfig } from '@wagmi/core'
import Script from 'next/script';

export const galadrielChain = {
  id: 696969,
  name: 'Galadriel Chain',
  nativeCurrency: { name: 'Galadriel', symbol: 'GAL', decimals: 18 },
  rpcUrls: {
    default: { http: ['https://devnet.galadriel.com/'] },
  },
  blockExplorers: {
    default: { name: 'Galadriel Chain Explorer', url: 'https://explorer.galadriel.com/' },
  },
} as const satisfies Chain

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

const config = getDefaultConfig({
  appName: 'Galadriel',
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID || "task-llama",
  chains: [ galadrielChain],
});

export const wagmiConfig = createConfig({
  chains: [galadrielChain],
  transports: {
   
    [galadrielChain.id]: http(),
  },
})

const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={clsx('h-full bg-white antialiased', inter.variable)}
    >

      {/* Google Analytics Scripts */}
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_MEASUREMENT_ID}`}
      />

      <Script id="google-analytics" strategy="afterInteractive">
        {`
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_MEASUREMENT_ID}');
    `}
      </Script>

      <body className="flex h-full flex-col">
        <WagmiProvider  config={config}>
          <QueryClientProvider client={queryClient}>
            <RainbowKitProvider
              theme={darkTheme({
                accentColor: '#fb7e3e',
                accentColorForeground: 'white',
                borderRadius: 'small',
                fontStack: 'system',
                overlayBlur: 'small',
              })}
              initialChain={galadrielChain}
            >

                <div className="flex min-h-full flex-col">
                  {children}
                </div>
 
            </RainbowKitProvider>
          </QueryClientProvider>
        </WagmiProvider>
      </body>
    </html >
  )
}
