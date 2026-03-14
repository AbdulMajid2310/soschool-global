import { createAsyncThunk } from "@reduxjs/toolkit";
import schoolDocumentService from "./services";
import { SchoolDocumentQuery } from "./types";

export const fetchDocuments = createAsyncThunk(
  "schoolDocument/fetchAll",
  async (params: SchoolDocumentQuery, thunkAPI) => {
    try {
      return await schoolDocumentService.getDocuments(params);
    } catch (error: any) {
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  },
);

export const fetchDocumentById = createAsyncThunk(
  "schoolDocument/fetchOne",
  async (id: string, thunkAPI) => {
    try {
      return await schoolDocumentService.getDocumentById(id);
    } catch (error: any) {
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  },
);

export const createBulkDocs = createAsyncThunk(
  "schoolDocument/createBulk",
  async (formData: FormData, thunkAPI) => {
    try {
      return await schoolDocumentService.createBulkDocuments(formData);
    } catch (error: any) {
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  },
);

export const updateDoc = createAsyncThunk(
  "schoolDocument/update",
  async ({ id, formData }: { id: string; formData: FormData }, thunkAPI) => {
    try {
      return await schoolDocumentService.updateDocument(id, formData);
    } catch (error: any) {
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  },
);

export const removeDocument = createAsyncThunk(
  "schoolDocument/remove",
  async (id: string, thunkAPI) => {
    try {
      await schoolDocumentService.deleteDocument(id);
      return id;
    } catch (error: any) {
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  },
);
