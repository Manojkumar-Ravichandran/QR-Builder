import { qrCodeService } from '@/services/qrcode.service';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

/* ----------------------------------
   Types
----------------------------------- */
export interface QRCode {
  _id: string;
  name: string;
  type: 'url' | 'text' | 'wifi';
  data: string;
  shortCode?: string;
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
  selected: QRCode | null;
  loading: boolean;
  error: string | null;
}

/* ----------------------------------
   Initial State
----------------------------------- */
const initialState: QRState = {
  list: [],
  selected: null,
  loading: false,
  error: null,
};

/* ----------------------------------
   Thunks
----------------------------------- */

// ✅ GET all QRs
export const getAllQRs = createAsyncThunk(
  'qr/getAll',
  async (_, { rejectWithValue }) => {
    try {
      const res = await qrCodeService.getAll();
      return res.data; // res is the body, res.data is the array
    } catch (err: any) {
      const message = err.response?.data?.message || err.message || 'Failed to fetch QRs';
      return rejectWithValue(message);
    }
  }
);

// ✅ CREATE QR
export const createQR = createAsyncThunk(
  'qr/create',
  async (payload: Partial<QRCode>, { rejectWithValue }) => {
    try {
      const res = await qrCodeService.create(payload);
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('show-toast', { detail: { message: res.message || 'QR Code created successfully', type: 'success' } }));
      }
      return res.data;
    } catch (err: any) {
      const message = err.response?.data?.message || err.message || 'Failed to create QR';
      return rejectWithValue(message);
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
      const res = await qrCodeService.update(id, data);
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('show-toast', { detail: { message: res.message || 'QR Code updated successfully', type: 'success' } }));
      }
      return res.data;
    } catch (err: any) {
      const message = err.response?.data?.message || err.message || 'Failed to update QR';
      return rejectWithValue(message);
    }
  }
);

// ✅ DELETE QR
export const deleteQR = createAsyncThunk(
  'qr/delete',
  async (id: string, { rejectWithValue }) => {
    try {
      const res = await qrCodeService.delete(id);
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('show-toast', { detail: { message: res.message || 'QR Code deleted successfully', type: 'success' } }));
      }
      return id;
    } catch (err: any) {
      const message = err.response?.data?.message || err.message || 'Failed to delete QR';
      return rejectWithValue(message);
    }
  }
);

export const getQRById = createAsyncThunk(
  'qr/getById',
  async (id: string, { rejectWithValue }) => {
    try {
      const res = await qrCodeService.getById(id);
      return res.data; // res is body, res.data is the object
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || 'Failed to fetch QR'
      );
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
      })

      // GET BY ID
      .addCase(getQRById.pending, (state) => {
        state.loading = true;
        state.selected = null;
      })
      .addCase(getQRById.fulfilled, (state, action: PayloadAction<QRCode>) => {
        state.loading = false;
        state.selected = action.payload;
      })
      .addCase(getQRById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearQRError } = qrSlice.actions;
export default qrSlice.reducer;
