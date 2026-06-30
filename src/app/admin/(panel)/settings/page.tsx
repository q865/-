import { getSettings } from "@/lib/settings";
import { SettingsForm } from "@/components/admin/settings-form";

export default async function AdminSettingsPage() {
  const settings = await getSettings();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-[#3d3a36]">Настройки сайта</h1>
        <p className="mt-1 text-[#9c9590]">Контакты, тексты и SEO</p>
      </div>
      <SettingsForm settings={settings} />
    </div>
  );
}
