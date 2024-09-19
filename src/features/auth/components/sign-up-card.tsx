import React from 'react';
import {
    Card,
    CardHeader,
    CardDescription,
    CardContent,
    CardTitle
} from '../../../components/ui/card';
import { FormField, FormItem, FormControl, FormMessage, Form } from '@/components/ui/form';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Separator } from '../../../components/ui/separator';
import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

export const SignUpSchema = z.object({
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
    const form = useForm({
        resolver: zodResolver(SignUpSchema),
        defaultValues: {
            email: "",
            password: "",
            confirmPassword: "",
        }
    });

    const onSubmit = async (values: any) => {
        try {
            // Replace with your API endpoint
            await fetch('/api/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(values),
            });
            // Handle successful signup
        } catch (error) {
            // Handle errors
            console.error('Signup error:', error);
        }
    };

    return (
        <Card className='w-full h-full p-8'>
            <CardHeader className="px-0 pt-0">
                <CardTitle>Sign up to continue</CardTitle>
                <CardDescription>Use your email or another service to continue</CardDescription>
            </CardHeader>
            <CardContent className='space-y-5 px-0 pb-0'>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-2.5'>
                        <FormField control={form.control} name="email" render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input {...field} placeholder='Email' type='email' disabled={false} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                        <FormField control={form.control} name="password" render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input {...field} placeholder='Password' type='password' disabled={false} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                        <FormField control={form.control} name="confirmPassword" render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input {...field} placeholder='Confirm password' type='password' disabled={false} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                        <Button
                            type='submit'
                            className='w-full'
                            size={'lg'}
                            disabled={false}
                        >
                            Continue
                        </Button>
                    </form>
                </Form>
                <Separator />
                <div className='flex flex-col gap-y-2.5'>
                    <Button
                        disabled={false}
                        onClick={() => { }}
                        variant={'outline'}
                        size={'lg'}
                        className='w-full relative'
                    >
                        <FcGoogle size={'19px'} className='absolute top-2.5 left-2.5' />
                        Continue with Google
                    </Button>
                    <Button
                        disabled={false}
                        onClick={() => { }}
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
