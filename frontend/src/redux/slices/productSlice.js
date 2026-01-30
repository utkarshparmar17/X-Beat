import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import productApi from '../../api/ProductAPI';

export const fetchProducts = createAsyncThunk(
    'products/fetchProducts',
    async (filters = {}, { rejectWithValue }) => {
        try {
            const data = await productApi.getProducts(filters);
            return data;
        } catch (err) {
            return rejectWithValue(err.response?.data || 'Failed to fetch products');
        }
    }
);

export const fetchProductById = createAsyncThunk(
    'products/fetchProductById',
    async (id, { rejectWithValue }) => {
        try {
            const data = await productApi.getProductById(id);
            return data;
        } catch (err) {
            return rejectWithValue(err.response?.data || 'Failed to fetch product');
        }
    }
);

const productSlice = createSlice({
    name: 'products',
    initialState: {
        items: [],
        selectedProduct: null,
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Fetch Products
            .addCase(fetchProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Fetch By ID
            .addCase(fetchProductById.pending, (state) => {
                state.loading = true;
                state.selectedProduct = null;
                state.error = null;
            })
            .addCase(fetchProductById.fulfilled, (state, action) => {
                state.loading = false;
                state.selectedProduct = action.payload;
            })
            .addCase(fetchProductById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default productSlice.reducer;
