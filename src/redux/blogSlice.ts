import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BlogPost } from '../types';

interface BlogState {
  posts: BlogPost[];
  searchQuery: string;
  filterTags: string[];
}

const initialState: BlogState = {
  posts: JSON.parse(localStorage.getItem('posts') || '[]'),
  searchQuery: '',
  filterTags: [],
};

const blogSlice = createSlice({
  name: 'blog',
  initialState,
  reducers: {
    addPost: (state, action: PayloadAction<BlogPost>) => {
      state.posts.push(action.payload);
      localStorage.setItem('posts', JSON.stringify(state.posts));
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    setFilterTags: (state, action: PayloadAction<string[]>) => {
      state.filterTags = action.payload;
    },
    sortByDate: (state) => {
      state.posts.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );
    },
  },
});

export const { addPost, setSearchQuery, setFilterTags, sortByDate } =
  blogSlice.actions;

export default blogSlice.reducer;
