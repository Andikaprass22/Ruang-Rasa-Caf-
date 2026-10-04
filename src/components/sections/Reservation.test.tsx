import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, afterEach } from "vitest";
import { Reservation } from "./Reservation";

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("Reservation", () => {
  it("menampilkan peringatan saat field wajib kosong", async () => {
    render(<Reservation />);
    await userEvent.click(
      screen.getByRole("button", { name: /pesan via whatsapp/i }),
    );
    expect(screen.getAllByText(/wajib diisi/i).length).toBeGreaterThan(0);
  });

  it("membuka WhatsApp dengan ringkasan saat data lengkap", async () => {
    const open = vi.fn();
    vi.stubGlobal("open", open);
    render(<Reservation />);

    await userEvent.type(screen.getByLabelText(/nama/i), "Budi");
    await userEvent.type(screen.getByLabelText(/no\. hp/i), "08123456789");
    fireEvent.change(screen.getByLabelText(/tanggal/i), {
      target: { value: "2026-10-20" },
    });
    fireEvent.change(screen.getByLabelText(/jam/i), {
      target: { value: "19:00" },
    });
    await userEvent.type(screen.getByLabelText(/jumlah tamu/i), "4");

    await userEvent.click(
      screen.getByRole("button", { name: /pesan via whatsapp/i }),
    );

    expect(open).toHaveBeenCalledTimes(1);
    const url = open.mock.calls[0][0] as string;
    expect(url).toContain("https://wa.me/6281234567890?text=");
    const decoded = decodeURIComponent(url);
    expect(decoded).toContain("Budi");
    expect(decoded).toContain("19:00");
    expect(decoded).toContain("4 orang");
  });
});
