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
      return res.data.data; // access nested data property
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
      const res = await qrCodeService.create(payload);
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
      const res = await qrCodeService.update(id, data);
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
      await qrCodeService.delete(id);
      return id;
    } catch (err: any) {
      return rejectWithValue(err.response?.data || 'Failed to delete QR');
    }
  }
);

export const getQRById = createAsyncThunk(
  'qr/getById',
  async (id: string, { rejectWithValue }) => {
    try {
      const res = await qrCodeService.getById(id);
      return res.data.data; // adjust if backend response differs
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
