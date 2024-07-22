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
        const identity = ctx.auth.getUserIdentity();
        if (!identity) {
            throw new Error("unauthorized");
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
        const identity = ctx.auth.getUserIdentity();
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
