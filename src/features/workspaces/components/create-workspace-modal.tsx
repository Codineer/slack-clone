import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle
} from '@/components/ui/dialog'
import { useRouter } from 'next/router'
import React from 'react'
import { useCreateWorkspaceModal } from '../store/use-create-workspace-modal'
import { useCreateWorkspace } from '../api/use-create-workspace'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export const CreateWorkspaceModal = () => {
    const [open, setOpen] = useCreateWorkspaceModal();
    const { mutate } = useCreateWorkspace()
    const handleClose = () => {
        setOpen(false)
        //TODO: CLEAR FORM
    }
    const router = useRouter()
    const handleSubmit = () => {
        mutate({
            name: 'Workspace 1',
        },
            {
                onSuccess(data) {
                    router.push('/workspaces/${data}')
                },
                onError() {

                },
                onSettled: () => {

                }
            }
        )
    }
    return (
        <Dialog open={open} onOpenChange={handleClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add a Workspace</DialogTitle>
                </DialogHeader>
                <form className='flex flex-col gap-3' action="">
                    <Input disabled={false} required autoFocus minLength={3} placeholder="Workspace name e.g. 'Work','Personal','Home'">
                    </Input>
                    <div className='flex justify-end'>
                        <Button className='' disabled={false}>
                            Create
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}
