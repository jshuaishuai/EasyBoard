"use client";

import { DropdownMenuContentProps } from "@radix-ui/react-dropdown-menu";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { toast } from "sonner";
import { Link2, Pencil, Trash2 } from "lucide-react";
import ComfirmModal from "./confirm-modal";
import { Button } from "./ui/button";
import { useApiMutation } from '@/hooks/use-api-mutation';
import { api } from '@/convex/_generated/api';
import { useRenameModal } from "@/store/use-rename-modal";

interface ActionsProps {
    children?: React.ReactNode;
    side?: DropdownMenuContentProps["side"];
    sideOffset?: DropdownMenuContentProps["sideOffset"];
    id: string;
    title: string;

}

const Actions = ({
    children,
    side,
    sideOffset,
    id,
    title
}: ActionsProps) => {
    const { pengding, mutate } = useApiMutation(api.board.remove);
    const { onOpen } = useRenameModal();

    const handleCopyLink = () => {
        navigator.clipboard.writeText(`${window.location.origin}/board/${id}`)
            .then(() => {
                toast.success('复制成功')
            })
            .catch(() => {
                toast.error("复制失败")
            })
    }

    const handleDeleteBoard = () => {
        mutate({
            id
        }).then(() => {
            toast.success('删除成功');
        }).catch(() => {
            toast.error("删除失败");
        })
    }

    const handleRename = () => {
        onOpen(id, title);
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                {children}
            </DropdownMenuTrigger>
            <DropdownMenuContent
                onClick={(e) => e.stopPropagation()}
                side={side}
                sideOffset={sideOffset}
            >
                <DropdownMenuItem
                    onClick={handleCopyLink}
                    className="p-2 cursor-pointer"
                >
                    <Link2 className="h-4 w-4 mr-2" />
                    复制链接
                </DropdownMenuItem>
                <DropdownMenuItem
                    onClick={handleRename}
                    className="p-2 cursor-pointer"
                >
                    <Pencil className="h-4 w-4 mr-2" />
                    重命名
                </DropdownMenuItem>
                <ComfirmModal
                    header="删除"
                    description="是否删除该画板?"
                    onConfirm={handleDeleteBoard}
                >
                    <Button variant="ghost" className="p-2 cursor-pointer text-sm w-full justify-start font-normal">
                        <Trash2 className="h-4 w-4 mr-2" />
                        删除
                    </Button>
                </ComfirmModal>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default Actions;
