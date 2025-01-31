"use client";
import Image from "next/image";
import { useOrganizationList, useOrganization } from '@clerk/nextjs';
import { cn } from "@/lib/utils";
import Hint from "@/components/global/hint";
interface ItemProps {
    id: string;
    name: string;
    imageUrl: string;
}

const Item = ({ id, name, imageUrl }: ItemProps) => {

    const { organization } = useOrganization();
    const { setActive } = useOrganizationList();

    const isActive = organization?.id === id;

    const handleClick = () => {
        if (!setActive) {
            return;
        }
        setActive({
            organization: id
        })
    }
    return (
        <div className="relative aspect-square">
            <Hint
                label={name}
                side="right"
                align="start"
                sideOffset={18}
            >

                <Image
                    fill
                    src={imageUrl}
                    alt={name}
                    onClick={handleClick}
                    className={cn("rounded-md cursor-pointer opacity-75 hover:opacity-100 transition",
                        isActive && "opacity-100"
                    )}
                />
            </Hint>
        </div>
    );
};

export default Item;
