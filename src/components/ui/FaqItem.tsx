import { ChevronDown } from "lucide-react";
import type { FaqItem as FaqData } from "../../lib/types";
import { cn } from "../../lib/utils";

interface FaqItemProps {
  item: FaqData;
  open: boolean;
  onToggle: () => void;
}

export function FaqItem({ item, open, onToggle }: FaqItemProps) {
  const panelId = `faq-panel-${item.id}`;

  return (
    <div className="border-b border-sand">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-6 py-5 text-left transition-colors hover:text-terracotta focus-visible:outline-none focus-visible:text-terracotta focus-visible:ring-2 focus-visible:ring-terracotta focus-visible:ring-offset-2 focus-visible:ring-offset-cream"
      >
        <span className="font-display text-lg text-espresso">{item.question}</span>
        <ChevronDown
          className={cn(
            "h-5 w-5 shrink-0 text-terracotta transition-transform duration-300",
            open && "rotate-180",
          )}
          aria-hidden="true"
        />
      </button>
      {open && (
        <div id={panelId} className="panel-in max-w-prose pb-5 text-sm leading-relaxed text-mocha">
          {item.answer}
        </div>
      )}
    </div>
  );
}
