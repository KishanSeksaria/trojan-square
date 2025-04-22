'use client'
import Link from 'next/link'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle
} from './ui/navigation-menu'
import { usePathname } from 'next/navigation'

const Navigation = ({
  navigationItems
}: {
  navigationItems: {
    title: string
    href: string
  }[]
}) => {
  const pathname = usePathname()
  console.log('pathname', pathname)
  console.log(pathname.includes('/marketplace'))

  return (
    <NavigationMenu>
      <NavigationMenuList>
        {navigationItems.map(({ href, title }) => (
          <NavigationMenuItem key={href}>
            <Link href={href} legacyBehavior passHref>
              <NavigationMenuLink
                className={navigationMenuTriggerStyle()}
                active={pathname.includes(href)}
              >
                {title}
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  )
}

export default Navigation
