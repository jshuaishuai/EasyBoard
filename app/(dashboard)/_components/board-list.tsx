import EmptyBoards from "./empty-boards";
import EmptyFavorites from "./empty-favorites";
import EmptySearch from "./empty-search";

interface BoardListProps {
    orgId: string;
    query: {
        search?: string;
        favorites?: string;
    }
}

const BoardList = ({ orgId, query }: BoardListProps) => {

    const data = [];

    if (!data.length && query.search) {
        // 无搜索结果
        return <EmptySearch />
    }

    if (!data.length && query.favorites) {
        // 无收藏

        return <EmptyFavorites />

    }

    if (!data.length) {
        // 无内容

        return <EmptyBoards />

    }

    return (
        <div>
            内容
        </div>
    );
};

export default BoardList;
