import { parseCSV } from "@/helpers/GGSheetHelper";
import { GGSheetData } from "@/types/GGSheetType";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SheetState {
  data: GGSheetData[];
  loading: boolean;
  language: "en" | "vi";
}

const initialState: SheetState = {
  data: [],
  loading: false,
  language: "en",
};

export const fetchSheetData = createAsyncThunk(
  "google_sheet/fetchData",
  async (url: string) => {
    const response = await fetch(url);
    const text = await response.text();
    return parseCSV(text);
  },
);

const sheetSlice = createSlice({
  name: "google_sheet",
  initialState,
  reducers: {
    setLanguage: (state, action: PayloadAction<"en" | "vi">) => {
      state.language = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSheetData.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        fetchSheetData.fulfilled,
        (state, action: PayloadAction<GGSheetData[]>) => {
          state.loading = false;
          state.data = action.payload;
        },
      )
      .addCase(fetchSheetData.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { setLanguage } = sheetSlice.actions;
export default sheetSlice.reducer;
