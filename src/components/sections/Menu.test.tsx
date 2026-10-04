import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect } from "vitest";
import { Menu } from "./Menu";

describe("Menu", () => {
  it("menampilkan semua item lalu menyaring saat kategori dipilih", async () => {
    render(<Menu />);
    expect(screen.getByText("Nasi Goreng Rempah")).toBeInTheDocument();
    await userEvent.click(screen.getByRole("button", { name: "Minuman" }));
    expect(screen.queryByText("Nasi Goreng Rempah")).not.toBeInTheDocument();
    expect(screen.getByText("Kopi Susu Ruang Rasa")).toBeInTheDocument();
  });

  it("menampilkan pesan saat tidak ada item yang cocok", () => {
    render(<Menu items={[]} />);
    expect(screen.getByText(/belum ada menu/i)).toBeInTheDocument();
  });
});
