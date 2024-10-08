'use client'
import React from 'react'
import { Sidebar } from './_components/sidebar';
import { Toolbar } from './_components/toolbar';
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup
} from '@/components/ui/resizable'
import { WorkspaceSidebar } from './_components/workspace-sidebar';
const WorkspaceIdLayout = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    return (
        <div className='h-full'>
            <Toolbar />
            <div className='flex h-[calc(100vh-40px)]'>
                <Sidebar />
                <ResizablePanelGroup
                    direction='horizontal'
                    autoSaveId={'ca-workspace-layout'}
                >
                    <ResizablePanel defaultValue={20} minSize={11} className='bg-[#5E2C5F]'>
                        <WorkspaceSidebar />
                    </ResizablePanel>
                    <ResizableHandle withHandle />
                    <ResizablePanel minSize={20}>
                        {children}
                    </ResizablePanel>
                </ResizablePanelGroup>
            </div>
        </div>
    )
}

export default WorkspaceIdLayout;

