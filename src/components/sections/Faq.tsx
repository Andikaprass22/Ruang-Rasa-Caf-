import { useState } from "react";
import { faqs } from "../../lib/data";
import { FaqItem } from "../ui/FaqItem";
import { SectionHeading } from "../ui/SectionHeading";

export function Faq() {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <section id="faq" className="scroll-mt-20">
      <div className="mx-auto max-w-3xl px-6 py-16 lg:py-24">
        <SectionHeading
          eyebrow="FAQ"
          title="Pertanyaan yang sering diajukan"
          align="center"
        />
        <div className="mt-10 border-t border-sand">
          {faqs.map((item) => (
            <FaqItem
              key={item.id}
              item={item}
              open={openId === item.id}
              onToggle={() => setOpenId(openId === item.id ? null : item.id)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
