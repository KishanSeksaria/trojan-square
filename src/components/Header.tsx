import Link from 'next/link'
import Image from 'next/image'
import {
  SignedOut,
  SignInButton,
  SignUpButton,
  SignedIn,
  UserButton
} from '@clerk/nextjs'
import { ModeToggle } from './ui/mode-toggle'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle
} from './ui/navigation-menu'
import { navigationItems } from '@/config/navigation'

function Header() {
  return (
    <header className='bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b backdrop-blur'>
      <div className='flex h-16 items-center px-4'>
        <nav className='flex flex-1 items-center gap-6'>
          <Link href='/' className='flex items-center gap-2'>
            <Image src='/globe.svg' alt='Logo' width={24} height={24} />
            <span className='hidden font-bold sm:inline-block'>
              Trojan Square
            </span>
          </Link>
          <SignedIn>
            <NavigationMenu>
              <NavigationMenuList>
                {navigationItems.map(item => (
                  <NavigationLinkItem
                    key={item.href}
                    href={item.href}
                    title={item.title}
                  />
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </SignedIn>
        </nav>

        <div className='ml-auto flex items-center gap-4'>
          <ModeToggle />
          <SignedOut>
            <SignInButton mode='modal'>
              <button className='hover:text-primary text-sm font-medium transition-colors'>
                Sign In
              </button>
            </SignInButton>
            <SignUpButton mode='modal'>
              <button className='hover:text-primary text-sm font-medium transition-colors'>
                Sign Up
              </button>
            </SignUpButton>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </div>
    </header>
  )
}

type NavigationLinkItemProps = {
  href: string
  title: string
}

const NavigationLinkItem = ({ href, title }: NavigationLinkItemProps) => (
  <NavigationMenuItem key={href}>
    <Link href={href} legacyBehavior passHref>
      <NavigationMenuLink className={navigationMenuTriggerStyle()}>
        {title}
      </NavigationMenuLink>
    </Link>
  </NavigationMenuItem>
)

export default Header
