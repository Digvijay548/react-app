import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import service from '../appwrite/config';

// Thunks for async operations
export const uploadFile = createAsyncThunk('file/upload', async ({ file, data }, { rejectWithValue }) => {
  try {
    const response = await service.createUserPost(file, data, data.Email);
    return response;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const deleteFile = createAsyncThunk('file/delete', async (fileId, { rejectWithValue }) => {
  try {
    const response = await service.DeleteFile(fileId);
    return response;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const getFilePreview = createAsyncThunk('file/preview', async (fileId, { rejectWithValue }) => {
  try {
    const response = await service.getFilePreview(fileId);
    return response;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

// Initial state
const initialState = {
  file: null,
  preview: null,
  loading: false,
  error: null
};

// Slice
const fileSlice = createSlice({
  name: 'file',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(uploadFile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(uploadFile.fulfilled, (state, action) => {
        state.loading = false;
        state.file = action.payload.databasereturn;
      })
      .addCase(uploadFile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteFile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteFile.fulfilled, (state) => {
        state.loading = false;
        state.file = null;
      })
      .addCase(deleteFile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getFilePreview.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getFilePreview.fulfilled, (state, action) => {
        state.loading = false;
        state.preview = action.payload;
      })
      .addCase(getFilePreview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export default fileSlice.reducer;
