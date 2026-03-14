import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  DocumentState,
  SchoolDocumentResponse,
  SingleSchoolDocumentResponse,
} from "./types";
import {
  fetchDocuments,
  fetchDocumentById,
  createBulkDocs,
  updateDoc,
  removeDocument,
} from "./thunks";

const initialState: DocumentState = {
  documents: [],
  document: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const schoolDocumentSlice = createSlice({
  name: "schoolDocument",
  initialState,
  reducers: {
    resetSchoolDocument: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
    clearSchoolDocument: (state) => {
      state.document = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch All
      .addCase(fetchDocuments.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        fetchDocuments.fulfilled,
        (state, action: PayloadAction<SchoolDocumentResponse>) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.documents = action.payload.data;
        },
      )
      .addCase(fetchDocuments.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      })
      // Fetch One
      .addCase(
        fetchDocumentById.fulfilled,
        (state, action: PayloadAction<SingleSchoolDocumentResponse>) => {
          state.document = action.payload.data;
        },
      )
      // Create Bulk
      .addCase(createBulkDocs.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        createBulkDocs.fulfilled,
        (state, action: PayloadAction<SchoolDocumentResponse>) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.message = action.payload.message;
        },
      )
      // Update
      .addCase(
        updateDoc.fulfilled,
        (state, action: PayloadAction<SingleSchoolDocumentResponse>) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.message = action.payload.message;
        },
      )
      // Remove
      .addCase(
        removeDocument.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.documents = state.documents.filter(
            (doc) => doc.schoolDocumentId !== action.payload,
          );
        },
      );
  },
});

export const { resetSchoolDocument, clearSchoolDocument } =
  schoolDocumentSlice.actions;
export default schoolDocumentSlice.reducer;
