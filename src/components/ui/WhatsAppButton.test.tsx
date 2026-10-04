import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { WhatsAppButton } from "./WhatsAppButton";

describe("WhatsAppButton", () => {
  it("membuat link wa.me dengan pesan ter-encode", () => {
    render(
      <WhatsAppButton
        phone="+62 812-3456-7890"
        message="Halo Ruang Rasa Café"
        label="Pesan"
      />,
    );
    const link = screen.getByRole("link", { name: /pesan/i });
    expect(link).toHaveAttribute(
      "href",
      "https://wa.me/6281234567890?text=Halo%20Ruang%20Rasa%20Caf%C3%A9",
    );
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });
});
