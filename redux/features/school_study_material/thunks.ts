// src/redux/features/study_material/thunks.ts
import { createAsyncThunk } from "@reduxjs/toolkit";
import { studyMaterialService } from "./service";
import { UpdateStudyMaterialDto } from "./types";

export const createStudyMaterial = createAsyncThunk(
  "studyMaterial/create",
  async (formData: FormData, { rejectWithValue }) => {
    try {
      // Log untuk memantau data yang dikirim (Opsional - untuk dev saja)
      console.log("--- Sending Study Material ---");
      formData.forEach((value, key) => {
        if (key === "file") {
          const file = value as File;
          console.log(`Field [${key}]: ${file.name} (${file.size} bytes)`);
        } else {
          console.log(`Field [${key}]:`, value);
        }
      });

      const response = await studyMaterialService.create(formData);

      console.log("--- Success Response ---");
      console.log("Saved Data:", response.data);

      return response.data;
    } catch (error: any) {
      // Console Error yang lebih detail untuk Majid
      console.error("--- Create Study Material Error ---");
      console.error("Status:", error.response?.status);
      console.error("Message:", error.response?.data?.message);
      console.error("Full Error Object:", error);

      // Ambil pesan error spesifik dari NestJS (biasanya di error.response.data.message)
      const errorMessage =
        error.response?.data?.message || "Gagal membuat materi";

      return rejectWithValue(errorMessage);
    }
  },
);

export const fetchMaterialsBySubject = createAsyncThunk(
  "studyMaterial/fetchBySubject",
  async (subjectId: string, { rejectWithValue }) => {
    try {
      const response = await studyMaterialService.findBySubject(subjectId);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Gagal memuat materi",
      );
    }
  },
);

export const fetchOneMaterial = createAsyncThunk(
  "studyMaterial/fetchOne",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await studyMaterialService.findOne(id);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Materi tidak ditemukan",
      );
    }
  },
);

// Tambahkan createBulkStudyMaterial ke exports
export const createBulkStudyMaterial = createAsyncThunk(
  "studyMaterial/createBulk",
  async (formData: FormData, { rejectWithValue }) => {
    try {
      // Log untuk debug (Opsional)
      console.log("--- Sending Bulk Study Materials ---");

      const response = await studyMaterialService.createBulk(formData);

      console.log("--- Bulk Success Response ---");
      return response.data; // Mengembalikan array materi yang berhasil disimpan
    } catch (error: any) {
      console.error("--- Bulk Create Error ---");
      const errorMessage =
        error.response?.data?.message || "Gagal membuat materi secara masal";
      return rejectWithValue(errorMessage);
    }
  },
);

export const updateStudyMaterial = createAsyncThunk(
  "studyMaterial/update",
  async (
    { id, formData }: { id: string; formData: FormData },
    { rejectWithValue },
  ) => {
    try {
      console.log(`--- Updating Study Material ID: ${id} ---`);

      // Log data untuk debug
      formData.forEach((value, key) => {
        console.log(
          `Field [${key}]:`,
          value instanceof File ? `File: ${value.name}` : value,
        );
      });

      const response = await studyMaterialService.update(id, formData);

      console.log("--- Update Success Response ---", response);
      return response.data; // Mengembalikan data material yang sudah diupdate
    } catch (error: any) {
      console.error("--- Update Study Material Error ---");
      const errorMessage =
        error.response?.data?.message || "Gagal memperbarui materi";
      return rejectWithValue(errorMessage);
    }
  },
);

export const deleteStudyMaterial = createAsyncThunk(
  "studyMaterial/delete",
  async (id: string, { rejectWithValue }) => {
    try {
      await studyMaterialService.delete(id);
      return id;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Gagal menghapus materi",
      );
    }
  },
);
