'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import clsx from 'clsx'
import { useInView } from 'framer-motion'

import { Container } from '@/components/Container'

interface Review {
  title: string
  body: string
  author: string
  rating: 1 | 2 | 3 | 4 | 5
}

const reviews: Array<Review> = [
  {
    title: 'Magic Money Multiplier',
    body: 'I turned a modest sum into a treasure chest overnight with Gnosis Pay. Even my cat\'s impressed, and trust me, she\'s hard to please.',
    author: 'GoldTouchGoose',
    rating: 5,
  },
  {
    title: 'Financial Ignorance Bliss',
    body: 'Didn\'t know a Bitcoin from a Bit-o-Honey before Gnosis Pay. Still don\'t. But now I\'m crypto-rich and candy-rich, too.',
    author: 'SweetToothSavant',
    rating: 5,
  },
  {
    title: 'Is This Even Legal?',
    body: 'Gnosis Pay is so effective, it feels like I\'m getting away with something. If this is wrong, I don\'t want to be right!',
    author: 'RebelWithACause',
    rating: 5,
  },
  {
    title: 'Who Needs Advisors?',
    body: 'Threw my financial advisor out the window—figuratively! Now it\'s just me, Gnosis Pay, and skyrocketing net worth.',
    author: 'WindowOfOpportunity',
    rating: 5,
  },
  {
    title: 'Insider, Schminsider',
    body: 'Started off as a Gnosis user, now they\'re practically begging for my insider tips. Next stop: Lamborghini dealership!',
    author: 'LamboLover',
    rating: 5,
  },
  {
    title: 'Speedy Riches',
    body: 'I\'m making money so fast with Gnosis Pay, I\'m getting whiplash. And yes, the cash is real—I pinched myself!',
    author: 'FastCashFreddy',
    rating: 5,
  },
  {
    title: 'Star Rating Broken',
    body: 'If I could give Gnosis Pay more stars, I would. It\'s the Swiss Army knife of finance apps, but way shinier.',
    author: 'FiveStarFanatic',
    rating: 5,
  },
  {
    title: 'Island Owner, Thanks Gnosis!',
    body: 'Just bought my private island thanks to Gnosis Pay. The previous owner? A pirate. No joke.',
    author: 'IslandInnovator',
    rating: 5,
  },
  {
    title: 'Debt, Be Gone!',
    body: 'Used Gnosis Pay for a fortnight, and now I\'m debt-free. Who needs college when you have Gnosis?',
    author: 'DebtDissolver',
    rating: 5,
  },
  {
    title: 'The Kid Crypto King',
    body: 'I\'m not even in high school, and I\'m out-earning my parents, thanks to Gnosis Pay. Take that, allowance!',
    author: 'MillionaireMinor',
    rating: 5,
  },
  {
    title: 'Investment Genius Here',
    body: 'Why work hard when Gnosis Pay works smarter? My clients think I\'m a genius. Gnosis, you\'re the real MVP.',
    author: 'LazyGeniusInvestor',
    rating: 5,
  },
  {
    title: 'Financial Superpowers',
    body: 'With Gnosis Pay\'s tips, I feel like I\'ve got X-ray vision for the markets. Super profits, here I come!',
    author: 'MarketMarvel',
    rating: 5,
  },
  {
    title: 'Job? What Job?',
    body: 'Gnosis Pay made me so much money, I forgot what my office looks like. Best "sick day" ever.',
    author: 'OfficeEscapee',
    rating: 5,
  },
  {
    title: 'Best Life Ever',
    body: 'If you crave a life of luxury, Gnosis Pay is your golden ticket. Seriously, I\'m typing this from my gold-plated yacht.',
    author: 'LuxLifeLuca',
    rating: 5,
  },
]


function StarIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true" {...props}>
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  )
}

function StarRating({ rating }: { rating: Review['rating'] }) {
  return (
    <div className="flex">
      {[...Array(5).keys()].map((index) => (
        <StarIcon
          key={index}
          className={clsx('h-5 w-5', rating > index ? 'fill-[#CDDF52]' : 'fill-gray-300')}
        />
      ))}
    </div>
  )
}


function Review({
  title,
  body,
  author,
  rating,
  className,
  ...props
}: Omit<React.ComponentPropsWithoutRef<'figure'>, keyof Review> & Review) {
  let animationDelay = useMemo(() => {
    let possibleAnimationDelays = ['0s', '0.1s', '0.2s', '0.3s', '0.4s', '0.5s']
    return possibleAnimationDelays[
      Math.floor(Math.random() * possibleAnimationDelays.length)
    ]
  }, [])

  return (
    <figure
      className={clsx(
        'animate-fade-in rounded-3xl bg-white p-6 opacity-0 shadow-md shadow-gray-900/5',
        className,
      )}
      style={{ animationDelay }}
      {...props}
    >
      <blockquote className="text-gray-900">
        <StarRating rating={rating} />
        <p className="mt-4 text-lg font-semibold leading-6 before:content-['“'] after:content-['”']">
          {title}
        </p>
        <p className="mt-3 text-base leading-7">{body}</p>
      </blockquote>
      <figcaption className="mt-3 text-sm text-gray-600 before:content-['–_']">
        {author}
      </figcaption>
    </figure>
  )
}

function splitArray<T>(array: Array<T>, numParts: number) {
  let result: Array<Array<T>> = []
  for (let i = 0; i < array.length; i++) {
    let index = i % numParts
    if (!result[index]) {
      result[index] = []
    }
    result[index].push(array[i])
  }
  return result
}

function ReviewColumn({
  reviews,
  className,
  reviewClassName,
  msPerPixel = 0,
}: {
  reviews: Array<Review>
  className?: string
  reviewClassName?: (reviewIndex: number) => string
  msPerPixel?: number
}) {
  let columnRef = useRef<React.ElementRef<'div'>>(null)
  let [columnHeight, setColumnHeight] = useState(0)
  let duration = `${columnHeight * msPerPixel}ms`

  useEffect(() => {
    if (!columnRef.current) {
      return
    }

    let resizeObserver = new window.ResizeObserver(() => {
      setColumnHeight(columnRef.current?.offsetHeight ?? 0)
    })

    resizeObserver.observe(columnRef.current)

    return () => {
      resizeObserver.disconnect()
    }
  }, [])

  return (
    <div
      ref={columnRef}
      className={clsx('animate-marquee space-y-8 py-4', className)}
      style={{ '--marquee-duration': duration } as React.CSSProperties}
    >
      {reviews.concat(reviews).map((review, reviewIndex) => (
        <Review
          key={reviewIndex}
          aria-hidden={reviewIndex >= reviews.length}
          className={reviewClassName?.(reviewIndex % reviews.length)}
          {...review}
        />
      ))}
    </div>
  )
}

function ReviewGrid() {
  let containerRef = useRef<React.ElementRef<'div'>>(null)
  let isInView = useInView(containerRef, { once: true, amount: 0.4 })
  let columns = splitArray(reviews, 3)
  let column1 = columns[0]
  let column2 = columns[1]
  let column3 = splitArray(columns[2], 2)

  return (
    <div
      ref={containerRef}
      className="relative -mx-4 mt-16 grid h-[49rem] max-h-[150vh] grid-cols-1 items-start gap-8 overflow-hidden px-4 sm:mt-20 md:grid-cols-2 lg:grid-cols-3"
    >
      {isInView && (
        <>
          <ReviewColumn
            reviews={[...column1, ...column3.flat(), ...column2]}
            reviewClassName={(reviewIndex) =>
              clsx(
                reviewIndex >= column1.length + column3[0].length &&
                'md:hidden',
                reviewIndex >= column1.length && 'lg:hidden',
              )
            }
            msPerPixel={10}
          />
          <ReviewColumn
            reviews={[...column2, ...column3[1]]}
            className="hidden md:block"
            reviewClassName={(reviewIndex) =>
              reviewIndex >= column2.length ? 'lg:hidden' : ''
            }
            msPerPixel={15}
          />
          <ReviewColumn
            reviews={column3.flat()}
            className="hidden lg:block"
            msPerPixel={10}
          />
        </>
      )}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-gray-50" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-gray-50" />
    </div>
  )
}

export function Reviews() {
  return (
    <section
      id="reviews"
      aria-labelledby="reviews-title"
      className="pb-16 pt-20 sm:pb-24 sm:pt-32"
    >
      <Container>
        <h2
          id="reviews-title"
          className="text-3xl font-medium tracking-tight text-gray-900 sm:text-center"
        >
          Everyone's hitting their financial glow-up with Gnosis Pay.
        </h2>
        <p className="mt-2 text-lg text-gray-600 sm:text-center">
          Thousands of people have doubled their net-worth in the last 30 days.
        </p>
        <ReviewGrid />
      </Container>
    </section>
  )
}
