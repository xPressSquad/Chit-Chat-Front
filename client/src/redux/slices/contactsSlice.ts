import axiosClient from "@/api/axiosClient";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Contact {
    id: string;
    name: string;
    email: string;
}

interface ContactState {
    contacts: Contact[];
    loading: boolean;
    error: string | null;
}

export const getUserContacts = createAsyncThunk<Contact[], void, { rejectValue: string }>(
    'contacts',
    async (_, thunkAPI) => {
        try {
            const response = await axiosClient.get('/servers/get/servers');
            return response.data; // Assuming the API returns an array of contacts
        } catch (err: any) {
            return thunkAPI.rejectWithValue(err?.response?.data?.error || 'An unexpected error occurred');
        }
    }
);

const contactSlice = createSlice({
    name: 'contact',
    initialState: {
        contacts: [],
        loading: false,
        error: null
    } as ContactState,
    reducers: {
        addContact: (state, action: PayloadAction<Contact>) => {
            state.contacts.push(action.payload);
        },
        removeContact: (state, action: PayloadAction<string>) => {
            state.contacts = state.contacts.filter((contact) => contact.id !== action.payload);
        },
        updateContact: (state, action: PayloadAction<Contact>) => {
            const index = state.contacts.findIndex((contact) => contact.id === action.payload.id);
            if (index !== -1) {
                state.contacts[index] = action.payload;
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getUserContacts.pending, (state) => {
                state.loading = true,
                state.error = null
            })
            .addCase(getUserContacts.fulfilled, (state, action: PayloadAction<Contact[]>) => {
                state.contacts = action.payload,
                state.loading = false
            })
            .addCase(getUserContacts.rejected, (state, action) => {
                state.loading = false,
                state.error = action.payload as string
            })
    }

})

export const { addContact, removeContact, updateContact } = contactSlice.actions;
export default contactSlice.reducer;