"use client";

import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus } from 'lucide-react';
import { CreateOrganization } from '@clerk/nextjs';
import { Button } from "@/components/ui/button";
import Hint from "@/components/global/hint";


const NewButton = () => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <div className="aspect-square">
                    <Hint
                        label="Create organization"
                        side="right"
                        align="start"
                        sideOffset={18}
                    >
                        <button className="bg-white/25 w-full h-full rounded-sm flex items-center justify-center opacity-60 hover:opacity-100 transition">
                            <Plus />
                        </button>
                    </Hint>
                </div>
            </DialogTrigger>

            <DialogContent className="p-0 bg-transparent border-none max-w-[480px]">
                <CreateOrganization />
            </DialogContent>
        </Dialog>
    );
};

export default NewButton;
