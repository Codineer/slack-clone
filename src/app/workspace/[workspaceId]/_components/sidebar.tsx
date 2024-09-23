import React from 'react'
import { UserButton } from '@/features/auth/components/user-button'
import { SidebarButton } from './sidebar-button'
import { WorkspaceSwitcher } from './workspace-switcher'
import { Bell, Home, MessageSquare, MoreHorizontal } from 'lucide-react'
import { usePathname } from 'next/navigation'
export const Sidebar = () => {
    const pathname = usePathname();
    return (
        <aside className='w-[70px] h-full bg-[#481349]  flex flex-col gap-y-4 items-center pt-[9px] pb-[4px]' >
            <WorkspaceSwitcher />
            <SidebarButton icon={Home} isActive={pathname.includes('/workspace')} label='Home' />
            <SidebarButton icon={MessageSquare} label='DMs' />
            <SidebarButton icon={Bell} label='Bell' />
            <SidebarButton icon={MoreHorizontal} label='More' />
            <div className='flex flex-col items-center justify-center gap-y-1 mt-auto'>

            </div>
            <div>
                <UserButton />
            </div>
        </aside>
    )
}
