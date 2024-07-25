import { v } from "convex/values";

import { mutation, query } from "./_generated/server";


const images = [
    "/placeholders/1.svg",
    "/placeholders/2.svg",
    "/placeholders/3.svg",
    "/placeholders/4.svg",
    "/placeholders/5.svg",
    "/placeholders/6.svg",
    "/placeholders/7.svg",
    "/placeholders/8.svg",
    "/placeholders/9.svg",
    "/placeholders/10.svg",
];

export const create = mutation({
    args: {
        orgId: v.string(),
        title: v.string(),
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();

        if (!identity) {
            throw new Error("unauthorized");
        }

        const randomImage = images[Math.floor(Math.random() * images.length)]

        const board = await ctx.db.insert("boards", {
            title: args.title,
            orgId: args.orgId,
            authorId: identity.subject,
            authorName: identity.name!,
            imageUrl: randomImage
        })

        return board;
    }
})

export const get = query({
    args: { id: v.id("boards") },
    handler: async (ctx, args) => {
        const board = ctx.db.get(args.id);

        return board;
    },
});


export const remove = mutation({
    args: {
        id: v.id("boards"),
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) {
            throw new Error("unauthorized");
        }

        const userId = identity.subject;

        const existingFavorite = await ctx.db
            .query("userFavorites")
            .withIndex("by_user_board", (q) =>
                q
                    .eq("userId", userId)
                    .eq("boardId", args.id)
            )
            .unique();

        if (existingFavorite) {
            await ctx.db.delete(existingFavorite._id);
        }

        ctx.db.delete(args.id)
    }
})


export const update = mutation({
    args: {
        title: v.string(),
        id: v.id("boards"),
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) {
            throw new Error("unauthorized");
        }
        const title = args.title.trim();

        if (!title) {
            throw new Error("标题不能为空");
        }
        if (title.length > 60) {
            throw new Error("标题不能超过60个字符");
        }

        const board = await ctx.db.patch(args.id, {
            title
        })

        return board;
    }
})
// 收藏
export const favorite = mutation({
    args: {
        id: v.id("boards"),
        orgId: v.string(),
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) {
            throw new Error('Unauthorized');
        }
        // 是否存在画板

        const board = await ctx.db.get(args.id);

        if (!board) {
            throw new Error('Board not found');
        }
        // 是否已经收藏
        const userId = identity.subject;

        const existingFavorite = await ctx.db.query('userFavorites')
            .withIndex("by_user_board", (q) =>
                q
                    .eq("userId", userId)
                    .eq("boardId", board._id))
            .unique();

        if (existingFavorite) {
            throw new Error('Already favorited');
        }

        await ctx.db.insert('userFavorites', {
            userId,
            boardId: board._id,
            orgId: args.orgId
        })

        return board;
    }
})

// 取消收藏
export const unfavorite = mutation({
    args: {
        id: v.id("boards"),
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) {
            throw new Error('Unauthorized');
        }
        // 是否存在画板

        const board = await ctx.db.get(args.id);

        if (!board) {
            throw new Error('Board not found');
        }
        // 是否已经收藏
        const userId = identity.subject;

        const existingFavorite = await ctx.db.query('userFavorites')
            .withIndex("by_user_board", (q) =>
                q
                    .eq("userId", userId)
                    .eq("boardId", board._id))
            .unique();

        if (!existingFavorite) {
            throw new Error("Favorited board not found");
        }

        await ctx.db.delete(existingFavorite._id);

        return board;
    }
})
