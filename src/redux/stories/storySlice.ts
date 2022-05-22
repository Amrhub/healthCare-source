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

export const updateStory = createAsyncThunk(
  'story/update',
  async (story: UpdateStoryPayload) => {
    const response = await fetch(`${baseUrl}${apiVersion}/posts/${story.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(story),
    });
    return await response.json();
  },
);

interface UpdateStoryPayload {
  id: number;
  content: string;
  category: string;
}

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
    myStories: [] as Story[],
    loading: false,
    error: null,
  },
  reducers: {
    getMyStories: (state, { payload }) => {
      state.myStories = state.stories.filter((story) => story.user.id === payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createStory.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(createStory.fulfilled, (state, action: PayloadAction<Story>) => {
      state.loading = false;
      state.stories.push(action.payload);
      state.myStories = state.stories.filter(
        (story) => story.user.id === action.payload.user.id,
      );
    });

    builder.addCase(fetchStories.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(fetchStories.fulfilled, (state, action: PayloadAction<Story[]>) => {
      state.loading = false;
      state.stories = action.payload;
    });

    builder.addCase(updateStory.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(updateStory.fulfilled, (state, action) => {
      state.loading = false;
      const index = state.stories.findIndex((story) => story.id === action.payload.id);
      state.stories[index].content = action.payload.content;
      state.stories[index].category = action.payload.category;
      const myIndex = state.myStories.findIndex(
        (story) => story.id === action.payload.id,
      );
      if (myIndex !== -1) {
        state.myStories[myIndex].content = action.payload.content;
        state.myStories[myIndex].category = action.payload.category;
      }
    });
  },
});

export const postReducer = storySlice.reducer;

export const { getMyStories } = storySlice.actions;
