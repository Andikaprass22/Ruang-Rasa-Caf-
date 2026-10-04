import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect } from "vitest";
import { Faq } from "./Faq";

describe("Faq", () => {
  it("membuka dan menutup jawaban", async () => {
    render(<Faq />);
    const firstQ = screen.getAllByRole("button")[0];
    expect(firstQ).toHaveAttribute("aria-expanded", "false");
    await userEvent.click(firstQ);
    expect(firstQ).toHaveAttribute("aria-expanded", "true");
    await userEvent.click(firstQ);
    expect(firstQ).toHaveAttribute("aria-expanded", "false");
  });
});
