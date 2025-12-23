import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

/* ----------------------------------
   Types
----------------------------------- */
export interface QRCode {
  _id: string;
  name: string;
  type: 'url' | 'text' | 'wifi';
  data: string;
  isDynamic: boolean;
  status: 'active' | 'inactive';
  scans: number;
  design?: {
    color: string;
    bgColor: string;
  };
  createdAt: string;
}

interface QRState {
  list: QRCode[];
  loading: boolean;
  error: string | null;
}

/* ----------------------------------
   Initial State
----------------------------------- */
const initialState: QRState = {
  list: [],
  loading: false,
  error: null,
};

/* ----------------------------------
   API Base
----------------------------------- */
const API_URL = '/api/qrs'; // adjust if needed

/* ----------------------------------
   Thunks
----------------------------------- */

// ✅ GET all QRs
export const getAllQRs = createAsyncThunk(
  'qr/getAll',
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(API_URL);
      return res.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data || 'Failed to fetch QRs');
    }
  }
);

// ✅ CREATE QR
export const createQR = createAsyncThunk(
  'qr/create',
  async (payload: Partial<QRCode>, { rejectWithValue }) => {
    try {
      const res = await axios.post(API_URL, payload);
      return res.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data || 'Failed to create QR');
    }
  }
);

// ✅ UPDATE QR
export const updateQR = createAsyncThunk(
  'qr/update',
  async (
    { id, data }: { id: string; data: Partial<QRCode> },
    { rejectWithValue }
  ) => {
    try {
      const res = await axios.put(`${API_URL}/${id}`, data);
      return res.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data || 'Failed to update QR');
    }
  }
);

// ✅ DELETE QR
export const deleteQR = createAsyncThunk(
  'qr/delete',
  async (id: string, { rejectWithValue }) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      return id;
    } catch (err: any) {
      return rejectWithValue(err.response?.data || 'Failed to delete QR');
    }
  }
);

/* ----------------------------------
   Slice
----------------------------------- */
const qrSlice = createSlice({
  name: 'qr',
  initialState,
  reducers: {
    clearQRError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder

      // GET ALL
      .addCase(getAllQRs.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllQRs.fulfilled, (state, action: PayloadAction<QRCode[]>) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(getAllQRs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // CREATE
      .addCase(createQR.fulfilled, (state, action: PayloadAction<QRCode>) => {
        state.list.unshift(action.payload);
      })

      // UPDATE
      .addCase(updateQR.fulfilled, (state, action: PayloadAction<QRCode>) => {
        const index = state.list.findIndex(
          (qr) => qr._id === action.payload._id
        );
        if (index !== -1) state.list[index] = action.payload;
      })

      // DELETE
      .addCase(deleteQR.fulfilled, (state, action: PayloadAction<string>) => {
        state.list = state.list.filter((qr) => qr._id !== action.payload);
      });
  },
});

export const { clearQRError } = qrSlice.actions;
export default qrSlice.reducer;
