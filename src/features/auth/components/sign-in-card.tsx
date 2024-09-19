import React, { useState } from 'react';
import {
    Card,
    CardHeader,
    CardDescription,
    CardContent,
    CardTitle
} from '../../../components/ui/card';
import { useAuthActions } from "@convex-dev/auth/react";
import { Button } from '@/components/ui/button';
import { Input } from '../../../components/ui/input';
import { Separator } from '../../../components/ui/separator';
import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';
import { SignInFlow } from '@/features/auth/types';

interface SignInCardProps {
    setState: any
}

export const SignInCard = ({ setState }: SignInCardProps) => {
    const { signIn } = useAuthActions();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [pending, setPending] = useState(false)

    const handleSubmit = async (event: React.FormEvent) => {

        event.preventDefault(); // Prevent default form 
    };
    const onProviderSignIn = (value: 'github' | 'google') => {
        console.log(value)
        setPending(true)
        signIn(value).finally(() => {
            setPending(false);
        })

    }

    return (
        <Card className='w-full h-full p-8'>
            <CardHeader className="px-0 pt-0">
                <CardTitle>
                    Login to continue
                </CardTitle>
                <CardDescription>
                    Use your email or another service to continue
                </CardDescription>
            </CardHeader>
            <CardContent className='space-y-5 px-0 pb-0'>
                <form onSubmit={handleSubmit} className='space-y-2.5'>
                    <Input
                        disabled={pending}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder='Email'
                        type='email'
                        required
                    />
                    <Input
                        disabled={pending}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder='Password'
                        type='password'
                        required
                    />

                    <Button type='submit' className='w-full' size={'lg'} disabled={pending}>
                        Continue
                    </Button>
                </form>
                <Separator />
                <div className='flex flex-col gap-y-2.5'>
                    <Button
                        disabled={pending}
                        onClick={() => onProviderSignIn("google")}
                        variant={'outline'}
                        size={'lg'}
                        className='w-full relative'
                    >
                        <FcGoogle size={'19px'} className='absolute top-2.5 left-2.5' />
                        Continue with Google
                    </Button>
                    <Button
                        disabled={pending}
                        onClick={() => onProviderSignIn("github")}
                        variant={'outline'}
                        size={'lg'}
                        className='w-full relative'
                    >
                        <FaGithub size={'19px'} className='absolute top-2.5 left-2.5' />
                        Continue with Github
                    </Button>
                </div>
                <p className='text-xs text-muted-foreground'>
                    Don't have an account? <span onClick={() => setState('signUp')} className='text-sky-700 hover:underline cursor-pointer'> Sign Up </span>
                </p>
            </CardContent>
        </Card>
    );
};
