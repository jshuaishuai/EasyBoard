import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";
import { toast } from 'sonner';
import { useApiMutation } from '@/hooks/use-api-mutation';
import { api } from '@/convex/_generated/api';

interface NewBoardButtonProps {
    orgId: string;
    disabled?: boolean;
}



const NewBoardButton = ({
    orgId,
    disabled
}: NewBoardButtonProps) => {
    const { pengding, mutate } = useApiMutation(api.board.create);

    const handleClick = () => {
        mutate({
            orgId,
            title: 'Untitled'
        }).then((id) => {
            toast.success('Board created');
            // TODO: 跳转到看板
        }).catch(() => {
            toast.error('Failed to create board')
        })
    }
    return (
        <button
            onClick={handleClick}
            className={cn("col-span-1 aspect-[100/127] bg-blue-600 rounded-lg hover:bg-blue-800 flex flex-col items-center justify-center py-6",
                (disabled || pengding) && 'opacity-75 hover:bg-blue-600 cursor-not-allowed')}
        >
            <Plus className="h-12 w-12 text-white stroke-1" />
            <p className="text-sm text-white font-light"> New board</p>
        </button>
    );
};

export default NewBoardButton;
