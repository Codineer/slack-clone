import { mutation, query } from './_generated/server';
import { v } from 'convex/values'
import { auth } from './auth'
export const get = query({
    args: {},
    handler: async (ctx) => {
        return await ctx.db.query('workspaces').collect()
    },
})

export const create = mutation({
    args: {
        name: v.string()
    },
    handler: async (ctx, args) => {
        const userId = await auth.getUserId(ctx);
        if (!userId) {
            throw new Error('Unauthorized');
        }
        //TODO : Create a proper method later
        const joinCode = '123456';

        const workspaceId = await ctx.db.insert('workspaces', {
            name: args.name,
            userId,
            joincode: joinCode,
        });
        // const workspace = await ctx.db.get(workspaceId);
        return workspaceId
    }
})