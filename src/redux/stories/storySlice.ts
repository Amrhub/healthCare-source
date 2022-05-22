import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { apiVersion, baseUrl } from '../configureStore';

export const createStory = createAsyncThunk(
  'story/create',
  async (story: CreateStoryPayload) => {
    const response = await fetch(`${baseUrl}${apiVersion}/posts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(story),
    });
    return await response.json();
  },
);

export const fetchStories = createAsyncThunk('story/fetch', async () => {
  const response = await fetch(`${baseUrl}${apiVersion}/posts`);
  return await response.json();
});

interface CreateStoryPayload {
  content: string;
  category: string;
  user_id: number;
}

export interface Story {
  id: number;
  category: string;
  content: string;
  commentsCounter: number;
  likesCounter: number;
  user: {
    id: number;
    name: string;
    profilePic: string;
  };
}

const storySlice = createSlice({
  name: 'story',
  initialState: {
    stories: [] as Story[],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createStory.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(createStory.fulfilled, (state, action: PayloadAction<Story>) => {
      state.loading = false;
      state.stories.push(action.payload);
    });

    builder.addCase(fetchStories.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(fetchStories.fulfilled, (state, action: PayloadAction<Story[]>) => {
      state.loading = false;
      state.stories = action.payload;
    });
  },
});

export const postReducer = storySlice.reducer;
