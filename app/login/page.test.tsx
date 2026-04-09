import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import LoginPage from "./page";
import { api } from "@/lib/axiosInstance";
import { useRouter } from "next/navigation";

// 1. Mocking dependencies
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

jest.mock("@/lib/axiosInstance", () => ({
  api: {
    post: jest.fn(),
    get: jest.fn(),
  },
}));

// 2. Polyfill untuk atob - HAPUS ": string" agar tidak menyebabkan SyntaxError di Babel
if (typeof window !== "undefined" && !window.atob) {
  window.atob = (str) => Buffer.from(str, "base64").toString("binary");
}

describe("LoginPage Unit Test", () => {
  const mockPush = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();

    // Setup default mock untuk useRouter
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    });
  });

  it("seharusnya menunjukkan error jika login gagal", async () => {
    // Arrange
    (api.post as jest.Mock).mockRejectedValueOnce({
      response: { data: { message: "Invalid credentials" } },
    });

    render(<LoginPage />);

    // Act
    fireEvent.change(screen.getByPlaceholderText(/name@school.com/i), {
      target: { value: "test@mail.com" },
    });
    fireEvent.change(screen.getByPlaceholderText(/••••••••/i), {
      target: { value: "password123" },
    });

    const submitButton = screen.getByRole("button", {
      name: /Verifikasi Identitas/i,
    });
    fireEvent.click(submitButton);

    // Assert
    await waitFor(() => {
      expect(screen.getByText(/Invalid credentials/i)).toBeInTheDocument();
    });
  });

  it("seharusnya berpindah ke RoleSelector jika login berhasil", async () => {
    // Arrange
    const mockSid = "header.eyBzdWIiOiAiMTIzIn0.signature"; // Payload: {"sub": "123"}
    (api.post as jest.Mock).mockResolvedValueOnce({
      data: { data: { sid: mockSid } },
    });
    (api.get as jest.Mock).mockResolvedValueOnce({
      data: { data: [{ id: "1", name: "Admin" }] },
    });

    render(<LoginPage />);

    // Act
    fireEvent.change(screen.getByPlaceholderText(/name@school.com/i), {
      target: { value: "abdulma272@mail.com" },
    });
    fireEvent.change(screen.getByPlaceholderText(/••••••••/i), {
      target: { value: "Abdulmajid@23" },
    });

    const submitButton = screen.getByRole("button", {
      name: /Verifikasi Identitas/i,
    });
    fireEvent.click(submitButton);

    // Assert
    await waitFor(() => {
      // Cek apakah judul berubah ke RoleSelector (cek teks "Otoritas Akses")
      expect(screen.getByText(/Otoritas Akses/i)).toBeInTheDocument();
      // Cek localStorage apakah sid tersimpan
      expect(localStorage.getItem("sid")).toBe(mockSid);
    });
  });
});
