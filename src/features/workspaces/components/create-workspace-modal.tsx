import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle
} from '@/components/ui/dialog'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { useCreateWorkspaceModal } from '../store/use-create-workspace-modal'
import { useCreateWorkspace } from '../api/use-create-workspace'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
export const CreateWorkspaceModal = () => {
    const [open, setOpen] = useCreateWorkspaceModal();
    const [name, setName] = useState('')
    const { mutate, isPending } = useCreateWorkspace()
    const handleClose = () => {
        setOpen(false)
        setName('')
        //TODO: CLEAR FORM
    }
    const router = useRouter();
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        mutate({ name }, {
            onSuccess(id) {
                toast.success('Workspace Created')
                router.push(`/workspace/${id}`)
                handleClose();
            }
        })
    }
    return (
        <Dialog open={open} onOpenChange={handleClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add a Workspace</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className='flex flex-col gap-3' >
                    <Input disabled={false} value={name} onChange={(e) => setName(e.target.value)} required autoFocus minLength={3} placeholder="Workspace name e.g. 'Work','Personal','Home'">
                    </Input>
                    <div className='flex justify-end'>
                        <Button className='' disabled={isPending}>
                            Create
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}
