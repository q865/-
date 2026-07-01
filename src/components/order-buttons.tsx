import { Phone, Send } from "lucide-react";
import type { SiteSettings } from "@/generated/prisma/client";
import { VkIcon } from "@/components/icons/vk-icon";
import { Button } from "@/components/ui/button";
import { buildTelegramOrderUrl, buildTelUrl } from "@/lib/contact-links";
import { formatPhone } from "@/lib/utils";

function TelegramButton({
  settings,
  productName,
  className,
}: {
  settings: SiteSettings;
  productName?: string;
  className?: string;
}) {
  return (
    <Button asChild size="lg" className={className}>
      <a
        href={buildTelegramOrderUrl(settings.telegramUrl, productName)}
        target="_blank"
        rel="noopener noreferrer"
      >
        <Send className="h-4 w-4" />
        Заказать в Telegram
      </a>
    </Button>
  );
}

function PhoneButton({ settings, className }: { settings: SiteSettings; className?: string }) {
  return (
    <Button asChild variant="outline" size="lg" className={className}>
      <a href={buildTelUrl(settings.phone)}>
        <Phone className="h-4 w-4" />
        Позвонить {formatPhone(settings.phone)}
      </a>
    </Button>
  );
}

function VkButton({ settings }: { settings: SiteSettings }) {
  return (
    <Button asChild variant="secondary" size="lg" className="w-full max-sm:whitespace-normal max-sm:text-center">
      <a href={settings.vkUrl} target="_blank" rel="noopener noreferrer">
        <VkIcon className="h-4 w-4 shrink-0" />
        Написать ВКонтакте
      </a>
    </Button>
  );
}

function MaxButton({ settings }: { settings: SiteSettings }) {
  if (!settings.maxUrl) return null;

  return (
    <Button asChild variant="outline" size="lg" className="w-full">
      <a href={settings.maxUrl} target="_blank" rel="noopener noreferrer">
        Написать в MAX
      </a>
    </Button>
  );
}

function MaxFallbackNote({ settings }: { settings: SiteSettings }) {
  if (settings.maxUrl) return null;

  return (
    <p className="text-center text-xs leading-5 text-muted sm:text-left">
      MAX: найдите нас по номеру{" "}
      <a href={buildTelUrl(settings.phone)} className="font-medium text-foreground hover:text-rose-dusty-dark">
        {formatPhone(settings.phone)}
      </a>
    </p>
  );
}

function SecondaryButtons({
  settings,
  showMaxNote,
}: {
  settings: SiteSettings;
  showMaxNote: boolean;
}) {
  return (
    <>
      <VkButton settings={settings} />
      <MaxButton settings={settings} />
      {showMaxNote ? <MaxFallbackNote settings={settings} /> : null}
    </>
  );
}

export function OrderButtons({
  settings,
  productName,
  compact = false,
  hideTelegramOnMobile = false,
  showMaxNote = false,
}: {
  settings: SiteSettings;
  productName?: string;
  compact?: boolean;
  /** Скрыть Telegram на mobile — когда есть нижняя панель. */
  hideTelegramOnMobile?: boolean;
  /** Мелкая строка про MAX вместо голубого блока. */
  showMaxNote?: boolean;
}) {
  const buttonClass = "w-full max-sm:whitespace-normal max-sm:text-center";

  if (!compact) {
    return (
      <div className="flex flex-col gap-3 sm:gap-4">
        <TelegramButton settings={settings} productName={productName} className={buttonClass} />
        <VkButton settings={settings} />
        <MaxButton settings={settings} />
        {showMaxNote ? <MaxFallbackNote settings={settings} /> : null}
        {!showMaxNote && !settings.maxUrl ? (
          <p className="rounded-2xl bg-blue-soft-light/50 px-4 py-3 text-sm text-blue-soft-dark">
            Найдите нас в MAX по номеру {formatPhone(settings.phone)}
          </p>
        ) : null}
        <PhoneButton settings={settings} className={buttonClass} />
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col gap-3 sm:hidden">
        {!hideTelegramOnMobile ? (
          <TelegramButton settings={settings} productName={productName} className={buttonClass} />
        ) : null}
        <PhoneButton settings={settings} className={buttonClass} />
        <details className="rounded-2xl border border-neutral-border/80 bg-neutral-surface/80 px-4 py-3">
          <summary className="touch-target cursor-pointer list-none text-sm font-semibold text-foreground marker:content-none [&::-webkit-details-marker]:hidden">
            Ещё способы связи
          </summary>
          <div className="mt-3 flex flex-col gap-3">
            <SecondaryButtons settings={settings} showMaxNote={false} />
          </div>
        </details>
        {showMaxNote ? <MaxFallbackNote settings={settings} /> : null}
      </div>

      <div className="hidden flex-col gap-3 sm:flex sm:gap-4">
        <TelegramButton settings={settings} productName={productName} className={buttonClass} />
        <VkButton settings={settings} />
        <MaxButton settings={settings} />
        {showMaxNote ? <MaxFallbackNote settings={settings} /> : null}
        <PhoneButton settings={settings} className={buttonClass} />
      </div>
    </>
  );
}
