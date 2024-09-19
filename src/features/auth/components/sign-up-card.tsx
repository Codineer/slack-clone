import React, { useState } from 'react';
import {
    Card,
    CardHeader,
    CardDescription,
    CardContent,
    CardTitle
} from '../../../components/ui/card';
import { useAuthActions } from "@convex-dev/auth/react";
import { FormField, FormItem, FormControl, FormMessage, Form } from '@/components/ui/form';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Separator } from '../../../components/ui/separator';
import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { TriangleAlert } from 'lucide-react'

export const SignUpSchema = z.object({
    name: z.string().min(6, 'Name should be minimum of length 6'),
    email: z.string().email(),
    password: z.string().min(6, "Password must be at least 6 characters long"),
    confirmPassword: z.string().min(6, "Confirm password must be at least 6 characters long"),
}).superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
        ctx.addIssue({
            code: "custom",
            message: "The passwords did not match",
            path: ['confirmPassword']
        });
    }
});

interface SignUpCardProps {
    setState: (state: 'signIn' | 'signUp') => void;
}

export const SignUpCard = ({ setState }: SignUpCardProps) => {
    const { signIn } = useAuthActions();

    const [pending, setPending] = useState(false)
    const [error, setError] = useState('')
    const form = useForm({
        resolver: zodResolver(SignUpSchema),
        defaultValues: {
            email: "",
            password: "",
            confirmPassword: "",
        }
    });

    const onSubmit = (values: any) => {
        console.log(values.name, values.email, values.password)
        setPending(true);

        // Replace with your API endpoint
        signIn("password", { name: values.name, email: values.email, password: values.password, flow: 'signUp' }).catch(() => { setError('Something went wrong') }).finally(() => (
            setPending(false)
        ))
        // Handle successful signup

    };


    const onProviderSignUp = (value: 'github' | 'google') => {
        console.log(value)
        setPending(true)
        signIn(value).finally(() => {
            setPending(false);
        })
    }


    return (
        <Card className='w-full h-full p-8'>
            <CardHeader className="px-0 pt-0">
                <CardTitle>Sign up to continue</CardTitle>
                <CardDescription>Use your email or another service to continue</CardDescription>
            </CardHeader>
            {!!error && (
                <div className='bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive mb-6'>
                    <TriangleAlert className='size-4' />
                    <p>
                        {error}
                    </p>
                </div>
            )}
            <CardContent className='space-y-5 px-0 pb-0'>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-2.5'>
                        <FormField control={form.control} name="name" render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input {...field} placeholder='Full name' type='text' disabled={pending} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                        <FormField control={form.control} name="email" render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input {...field} placeholder='Email' type='email' disabled={pending} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                        <FormField control={form.control} name="password" render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input {...field} placeholder='Password' type='password' disabled={pending} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                        <FormField control={form.control} name="confirmPassword" render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input {...field} placeholder='Confirm password' type='password' disabled={pending} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                        <Button
                            type='submit'
                            className='w-full'
                            size={'lg'}
                            disabled={pending}
                        >
                            Continue
                        </Button>
                    </form>
                </Form>
                <Separator />
                <div className='flex flex-col gap-y-2.5'>
                    <Button
                        disabled={pending}
                        onClick={() => onProviderSignUp("google")}
                        variant={'outline'}
                        size={'lg'}
                        className='w-full relative'
                    >
                        <FcGoogle size={'19px'} className='absolute top-2.5 left-2.5' />
                        Continue with Google
                    </Button>
                    <Button
                        disabled={pending}
                        onClick={() => onProviderSignUp("github")}
                        variant={'outline'}
                        size={'lg'}
                        className='w-full relative'
                    >
                        <FaGithub size={'19px'} className='absolute top-2.5 left-2.5' />
                        Continue with Github
                    </Button>
                </div>
                <p className='text-xs text-muted-foreground'>
                    Already have an account? <span onClick={() => setState('signIn')} className='text-sky-700 hover:underline cursor-pointer'>Sign in</span>
                </p>
            </CardContent>
        </Card>
    );
};
