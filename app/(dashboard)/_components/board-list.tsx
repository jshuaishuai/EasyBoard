import EmptyBoards from "./empty-boards";
import EmptyFavorites from "./empty-favorites";
import EmptySearch from "./empty-search";
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import BoardCard from "./board-card";

interface BoardListProps {
    orgId: string;
    query: {
        search?: string;
        favorites?: string;
    }
}

const BoardList = ({ orgId, query }: BoardListProps) => {

    const data = useQuery(api.boards.get, {
        orgId
    });

    console.log('%c [ data ]-18', 'font-size:13px; background:pink; color:#bf2c9f;', data)

    if (data === undefined) {
        return <div>Loading...</div>

    }
    if (!data?.length && query.search) {
        // 无搜索结果
        return <EmptySearch />
    }

    if (!data?.length && query.favorites) {
        // 无收藏

        return <EmptyFavorites />

    }

    if (!data?.length) {
        // 无内容

        return <EmptyBoards />

    }

    return (
        <div>
            <h2 className="text-3xl">{query.favorites ? 'Favorites boards' : 'Team boards'}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-5 mt-8 pb-10">
                {
                    data?.map((board) => (
                        <BoardCard
                            key={board._id}
                            id={board._id}
                            title={board.title}
                            imageUrl={board.imageUrl}
                            authorId={board.authorId}
                            authorName={board.authorName}
                            createdAt={board._creationTime}
                            orgId={board.orgId}
                            isFavorite={false}

                        />
                    ))
                }

            </div>
        </div>
    );
};

export default BoardList;
