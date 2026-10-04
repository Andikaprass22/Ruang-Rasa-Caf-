import { MessageCircle } from "lucide-react";
import { buildWhatsAppUrl } from "../../lib/utils";
import { Button } from "./Button";
import type { ButtonSize, ButtonVariant } from "./Button";

interface WhatsAppButtonProps {
  phone: string;
  message: string;
  label: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
}

export function WhatsAppButton({
  phone,
  message,
  label,
  variant,
  size,
  className,
}: WhatsAppButtonProps) {
  return (
    <Button
      href={buildWhatsAppUrl(phone, message)}
      target="_blank"
      rel="noopener noreferrer"
      variant={variant}
      size={size}
      className={className}
    >
      <MessageCircle className="h-4 w-4" aria-hidden="true" />
      {label}
    </Button>
  );
}
