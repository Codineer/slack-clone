'use client'
import React, { useState } from 'react'


const AuthScreen = () => {
    const [state, setState] = useState('signIn');
    return (
        <div className='h-full flex items-center justify-center bg-[#5C3B58]'>
            <div className='md:h-auto md:w-[420px]'>
                Auth Screen
            </div>
        </div>
    )
}

export default AuthScreen
