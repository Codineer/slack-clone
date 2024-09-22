'use client'
import React from 'react'
import { Toolbar } from './_components/toolbar';
const WorkspaceIdLayout = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    return (
        <div className='h-full'>
            <Toolbar />
            {children}
        </div>
    )
}

export default WorkspaceIdLayout;
