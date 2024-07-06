import React from 'react'
import { GitHubIcon, LinkedInIcon, LinktreeIcon, TelegramIcon } from './SocialIcons'
import Link from 'next/link'

export function SocialLink({
    icon: Icon,
    ...props
}: React.ComponentPropsWithoutRef<typeof Link> & {
    icon: React.ComponentType<{ className?: string }>
}) {
    return (
        <Link className="group -m-1 p-1" {...props}>
            <Icon className="h-7 w-7 fill-zinc-400 transition group-hover:fill-zinc-200 dark:fill-zinc-300 dark:group-hover:fill-zinc-200" />
        </Link>
    )
}

const SocialRow = () => {
    return (
        <div className="mt-6 flex gap-6">
            {/* <SocialLink
                    href="https://twitter.com"
                    aria-label="Follow us on Twitter"
                    icon={TwitterIcon}
                    /> */}
            {/* <SocialLink
                    href="https://instagram.com"
                    aria-label="Follow on Instagram"
                    icon={InstagramIcon}
                    /> */}
            <SocialLink
                href="https://github.com/"
                aria-label="Follow on GitHub"
                icon={GitHubIcon}
            />
            <SocialLink
                href="https://www.linkedin.com/in/"
                aria-label="Follow on LinkedIn"
                icon={LinkedInIcon}
            />
            <SocialLink
                href="https://linktr.ee/"
                aria-label="Get connected with me"
                icon={LinktreeIcon}
            />
            <SocialLink
                href="https://linktr.ee/"
                aria-label="Get connected with me"
                icon={TelegramIcon}
            />
        </div>
    )
}

export default SocialRow