import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { apiVersion, baseUrl } from '../configureStore';

export const fetchComments = createAsyncThunk(
  'comments/fetchComments',
  async (postId: number) => {
    const response = await fetch(`${baseUrl}${apiVersion}/comments?post_id=${postId}`);
    return await response.json();
  },
);

export const createComment = createAsyncThunk(
  'comment/createComment',
  async ({
    content,
    postId,
    userId,
  }: {
    content: string;
    postId: number;
    userId: number;
  }) => {
    const response = await fetch(`${baseUrl}${apiVersion}/comments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ content, post_id: postId, user_id: userId }),
    });
    return await response.json();
  },
);

interface CommentType {
  id: number;
  content: string;
  user: {
    profilePic: string;
    name: string;
  };
}

const commentsSlice = createSlice({
  name: 'comments',
  initialState: {
    comments: [] as CommentType[],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchComments.fulfilled, (state, action) => {
      state.comments = action.payload;
    });

    builder.addCase(createComment.fulfilled, (state, action) => {
      state.comments = [action.payload, ...state.comments];
    });
  },
});

export const commentReducer = commentsSlice.reducer;
