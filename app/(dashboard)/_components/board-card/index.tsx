"use client";

import Image from "next/image";
import Link from "next/link";
import { formatDistanceToNow } from 'date-fns';
import { useAuth } from "@clerk/nextjs";
import { MoreHorizontal } from "lucide-react";

import { useApiMutation } from '@/hooks/use-api-mutation';
import { api } from '@/convex/_generated/api';
import Overlay from "./overlay";
import Actions from "@/components/actions";
import Footer from "./footer";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";

interface BoardCardProps {
    id: string;
    title: string;
    imageUrl: string;
    authorId: string;
    authorName: string;
    createdAt: number;
    orgId: string;
    isFavorite: boolean;
}

const BoardCard = ({
    id,
    title,
    imageUrl,
    authorId,
    authorName,
    createdAt,
    orgId,
    isFavorite
}: BoardCardProps) => {

    const { userId } = useAuth();
    const authorLabel = userId === authorId ? "You" : authorName;

    const createAtLabel = formatDistanceToNow(new Date(createdAt), {
        addSuffix: true
    })

    const { mutate: onFavorite, pengding: pengdingFavorite } = useApiMutation(api.board.favorite);
    const { mutate: onUnfavorite, pengding: pengdingUnfavorite } = useApiMutation(api.board.unfavorite);

    const toggleFavorite = () => {
        if (isFavorite) {
            // 取消收藏
            onUnfavorite({
                id
            }).catch(() => {
                toast.error('取消收藏失败')
            })
        } else {
            // 收藏
            onFavorite({
                id,
                orgId
            }).catch(() => {
                toast.error('收藏失败')
            })
        }
    }
    return (
        <Link href={`/board/${id}`}>
            <div className="group aspect-[100/127] border rounded-lg flex flex-col justify-between overflow-hidden">
                <div className="relative flex-1 bg-amber-50">
                    <Image
                        src={imageUrl}
                        alt={title}
                        fill
                        className="object-fit"
                    />
                    <Overlay />
                    <Actions
                        id={id}
                        title={title}
                        side="right"
                    >
                        <button className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 px-3 py-2 outline-none">
                            <MoreHorizontal
                                className="text-white opacity-75 hover:opacity-100 transition-opacity"
                            />
                        </button>
                    </Actions>
                </div>
                <Footer
                    isFavorite={isFavorite}
                    title={title}
                    authorLabel={authorLabel}
                    createAtLabel={createAtLabel}
                    onClick={toggleFavorite}
                    disabled={pengdingFavorite || pengdingUnfavorite}
                />
            </div>
        </Link>
    );
};

export default BoardCard;


BoardCard.Skeleton = function BoardCardSkeleton() {

    return (
        <div className="aspect-[100/127] border rounded-lg overflow-hidden">
            <Skeleton className="w-full h-full" />
        </div>
    )
}
