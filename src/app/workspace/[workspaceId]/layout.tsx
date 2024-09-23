'use client'
import React from 'react'
import { Sidebar } from './_components/sidebar';
import { Toolbar } from './_components/toolbar';
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
                {children}
            </div>
        </div>
    )
}

export default WorkspaceIdLayout;
