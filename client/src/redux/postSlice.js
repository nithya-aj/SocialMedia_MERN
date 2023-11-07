import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  posts: [],
  timeLinePosts: [],
  editPostData: null,
};

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    setPosts: (state, action) => {
      state.posts = action.payload;
    },
    setTimeLinePosts: (state, action) => {
      state.timeLinePosts = action.payload;
    },
    setPost: (state, action) => {
      const updatedPosts = state.posts.map((post) => {
        if (post._id === action.payload.post._id) {
          return action.payload.post;
        }
        return post;
      });
      state.posts = updatedPosts;
    },
    setEditData: (state, action) => {
      state.editPostData = action.payload;
    },
    clearEditData: (state) => {
      state.editPostData = null;
    },
  },
});

export const { setPosts, setEditData, clearEditData, setPost, setTimeLinePosts } =
  postSlice.actions;
export const selectEditData = (state) => state.posts.editPostData;
export default postSlice.reducer;
