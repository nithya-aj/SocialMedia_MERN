import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    posts: []
}

const postSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {
        addPost: (state, action) => {
            state.posts.push(action.payload)
        },
        setPosts: (state, action) => {
            const sortedPosts = action.payload.sort((a, b) => b.createdAt.localeCompare(a.createdAt))
            state.posts = sortedPosts
        },
        editPost: (state, action) => {
            const updatedPost = action.payload.post;
            const postIndex = state.posts.findIndex((post) => post._id === updatedPost._id);
            if (postIndex !== -1) {
                state.posts[postIndex] = updatedPost;
            }
        }
    }
})

export const { addPost, setPosts, editPost } = postSlice.actions
export const selectPosts = (state) => state.posts.posts
export default postSlice.reducer