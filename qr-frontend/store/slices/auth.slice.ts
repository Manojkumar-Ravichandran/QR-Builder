import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { authService } from '@/services/auth.service';

interface AuthState {
  user: any;
  token: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  token: null,
  loading: false,
  error: null,
};

export const login = createAsyncThunk(
  'auth/login',
  async (payload: { email: string; password: string }, thunkAPI) => {
    try {
      const res = await authService.login(payload);
      return res.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || 'Login failed'
      );
    }
  }
);

export const register = createAsyncThunk(
  'auth/register',
  async (payload: { name: string; email: string; password: string }, thunkAPI) => {
    try {
      const res = await authService.register(payload);
      return res.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || 'Registration failed'
      );
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.token = null;
    },
    restoreSession(state, action: PayloadAction<{ user: any; token: string }>) {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // LOGIN
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.data.user;
        state.token = action.payload.data.token;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // REGISTER
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { logout, restoreSession, clearError } = authSlice.actions;
export default authSlice.reducer;
