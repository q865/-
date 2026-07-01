import { Phone, Send } from "lucide-react";
import type { SiteSettings } from "@/generated/prisma/client";
import { VkIcon } from "@/components/icons/vk-icon";
import { Button } from "@/components/ui/button";
import { buildTelegramOrderUrl, buildTelUrl } from "@/lib/contact-links";
import { formatPhone } from "@/lib/utils";

export function OrderButtons({
  settings,
  productName,
}: {
  settings: SiteSettings;
  productName?: string;
}) {
  return (
    <div className="flex flex-col gap-3">
      <Button asChild size="lg" className="w-full">
        <a
          href={buildTelegramOrderUrl(settings.telegramUrl, productName)}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Send className="h-4 w-4" />
          Заказать в Telegram
        </a>
      </Button>

      <Button asChild variant="secondary" size="lg" className="w-full">
        <a href={settings.vkUrl} target="_blank" rel="noopener noreferrer">
          <VkIcon className="h-4 w-4" />
          Написать ВКонтакте
        </a>
      </Button>

      {settings.maxUrl ? (
        <Button asChild variant="outline" size="lg" className="w-full">
          <a href={settings.maxUrl} target="_blank" rel="noopener noreferrer">
            Написать в MAX
          </a>
        </Button>
      ) : (
        <p className="rounded-2xl bg-blue-soft-light/50 px-4 py-3 text-sm text-blue-soft-dark">
          Найдите нас в MAX по номеру {formatPhone(settings.phone)}
        </p>
      )}

      <Button asChild variant="outline" size="lg" className="w-full">
        <a href={buildTelUrl(settings.phone)}>
          <Phone className="h-4 w-4" />
          Позвонить {formatPhone(settings.phone)}
        </a>
      </Button>
    </div>
  );
}
