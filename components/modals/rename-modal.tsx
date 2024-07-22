"use client";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogClose,
    DialogFooter,
    DialogTitle,
} from "@/components/ui/dialog";

import { toast } from "sonner";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useRenameModal } from '@/store/use-rename-modal';
import { FormEventHandler, useState } from "react";
import { useApiMutation } from '@/hooks/use-api-mutation';
import { api } from '@/convex/_generated/api';
const RenameModal = () => {

    const { isOpen, onClose, initialValues } = useRenameModal();
    const [title, settitle] = useState(initialValues.title)
    const { mutate, pengding } = useApiMutation(api.board.update);

    const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        // 更新
        mutate({
            title,
            id: initialValues.id
        })
            .then(() => {
                toast.success("更新成功");
                onClose();
            })
            .catch(() => {
                toast.error("更新失败");
            })
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        重命名
                    </DialogTitle>
                </DialogHeader>
                <DialogDescription>
                    请输入新的名称
                </DialogDescription>

                <form onSubmit={onSubmit} className="space-y-4">
                    <Input
                        required
                        maxLength={60}
                        value={title}
                        placeholder="请输入新的名称"
                        onChange={(e) => settitle(e.target.value)}
                    />
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button type="button" variant="outline">取消</Button>
                        </DialogClose>
                        <Button type="submit">保存</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default RenameModal;
