import React from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { Doc } from '../../../../../convex/_generated/dataModel'

interface WorkspaceHeaderprops {
    workspace: Doc<'workspaces'>
}
export const WorkspaceHeader = ({ workspace }: WorkspaceHeaderprops) => {
    return (
        <div className='flex items-center justify-between px-4 h-[49px] gap-0.5'>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant='transparent'
                        className='font-semibold text-lg w-auto p-1.5 overflow-hidden'
                        size='sm'
                    >
                        <span className='truncate'>
                            {workspace.name}
                        </span>

                    </Button>
                </DropdownMenuTrigger>
            </DropdownMenu>
        </div>
    )
}
