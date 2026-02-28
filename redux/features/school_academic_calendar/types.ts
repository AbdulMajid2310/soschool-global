// src/store/academic-calendar/types.ts

export interface CalendarItem {
    calendarId: string;
    name: string;
    description: string;
    startDate: string; // ISO Date String
    endDate: string;   // ISO Date String
    category: string;
    isActive: boolean;
    createdAt?: string;
    updatedAt?: string;
}

// Struktur data yang sudah dikelompokkan oleh backend
export interface GroupedCalendar {
    month: string; // Contoh: "Februari 2026"
    data: CalendarItem[];
}

// Payload untuk Create (Single item dalam array bulk)
export interface CreateCalendarItemPayload {
    name: string;
    description?: string;
    startDate: string;
    endDate: string;
    category: string;
    schoolId: string;
}

// Payload untuk Bulk Create (Sesuai DTO NestJS kita)
export interface CreateBulkCalendarPayload {
    calendars: CreateCalendarItemPayload[];
}

// Payload untuk Update
export interface UpdateCalendarPayload extends Partial<CreateCalendarItemPayload> {
    id: string; // calendarId
}

// State untuk Redux Slice
export interface AcademicCalendarState {
    items: GroupedCalendar[];
    detail: CalendarItem | null;
    loading: boolean;
    success: boolean;
    error: string | null;
}