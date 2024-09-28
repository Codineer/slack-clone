import {
    Dialog,
    DialogContent,
    DialogTrigger,
    DialogHeader,
    DialogTitle,
    DialogClose,
    DialogFooter
} from '@/components/ui/dialog'
import { useRouter } from 'next/navigation';
import { useRemoveWorkspace } from '@/features/workspaces/api/use-remove-workspace';
import { useUpdateWorkspace } from '@/features/workspaces/api/use-update-workspace';
import { TrashIcon } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { useWorkspaceId } from '@/hooks/use-workspace-id';
import { toast } from 'sonner';
import { useConfirm } from '@/hooks/use-confirm';

interface PreferencesModalProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    initialValue: string;
}

export const PreferencesModal = ({
    open,
    setOpen,
    initialValue
}
    : PreferencesModalProps) => {
    const [ConfirmDialog, confirm] = useConfirm('Are you sure?', "This action is irreversible");
    const [ConfirmEditDialog, confirmEdit] = useConfirm('Are you sure?', "This action is irreversible");
    const workspaceId = useWorkspaceId();
    const router = useRouter()
    const [value, setValue] = useState(initialValue);
    const [editOpen, setEditOpen] = useState(false)
    const { mutate: updateWorkspace, isPending: isUpdatingWorkspace } = useUpdateWorkspace();
    const { mutate: removeWorkspace, isPending: isRemovingWorkspace } = useRemoveWorkspace();
    const close = () => {
        setOpen(false)
    }

    const handleRemove = async (e: React.FormEvent<HTMLFormElement>) => {

        e.preventDefault()
        const ok = await confirm();
        if (!ok) return



        removeWorkspace({
            id: workspaceId,
        }, {
            onSuccess: () => {
                router.replace('/')
                toast.success('Workspace removed')
            },
            onError: () => {
                toast.error('Failed to remove workspaces')
            }
        })
    }
    const handleEdit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        updateWorkspace({
            id: workspaceId,
            name: value
        }, {
            onSuccess: () => {
                setEditOpen(false)
                toast.success('Workspace updated')
            },
            onError: () => {
                toast.error('Failed to upload workspaces')
            }
        })
    }
    return (
        <>
            <ConfirmDialog />
            <Dialog open={open} onOpenChange={close}>
                <DialogContent className='p-0 bg-gray-50 overflow-hidden'>
                    <DialogHeader className='p-4 border-b bg-white'>
                        <DialogTitle>
                            {value}
                        </DialogTitle>
                    </DialogHeader>
                    <div className='px-4 pb-4 flex-col gap-y-2'>
                        <Dialog open={editOpen} onOpenChange={setEditOpen}>

                            <DialogTrigger asChild>
                                <div className='px-4 py-4 bg-white rounded-lg  border cursor-pointer hover:bg-gray-50'>
                                    <div className='flex items-center justify-between'>
                                        <p className='text-sm font-semibold'>
                                            Workspace name
                                        </p>
                                        <p className='text-sm text-[#1264a3] hover:underline font-semibold'>
                                            Edit
                                        </p>
                                    </div>
                                    <p className='text-sm'>
                                        {value}
                                    </p>
                                </div>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>
                                        Rename this workspace
                                    </DialogTitle>
                                </DialogHeader>
                                <form className='space-y-4' onSubmit={handleEdit}>
                                    <Input value={value} disabled={isUpdatingWorkspace} onChange={(e) => setValue(e.target.value)}
                                        required
                                        autoFocus
                                        minLength={3}
                                        maxLength={80}
                                        placeholder="Workspace name e.g. 'Work','Personal','Home'"
                                    />
                                    <DialogFooter>
                                        <DialogClose asChild>
                                            <Button variant={'outline'} disabled={isUpdatingWorkspace}>
                                                Cancel
                                            </Button>
                                        </DialogClose>
                                        <Button disabled={isUpdatingWorkspace}>
                                            Save
                                        </Button>
                                    </DialogFooter>
                                </form>
                            </DialogContent>
                        </Dialog>
                        <button disabled={isRemovingWorkspace} onClick={handleRemove}
                            className='flex items-center gap-x-2 px-5 py-4 bg-white rounded-lg border cursor-pointer w-full mt-3 hover:bg-gray-50 text-rose-600'
                        >
                            <TrashIcon className='size-4' />
                            <p className='text-sm font-semibold'>
                                Delete workspace
                            </p>

                        </button>
                    </div>
                </DialogContent>
            </Dialog >
        </>

    )
}