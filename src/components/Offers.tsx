import { Card, CardContent } from "@/components/ui/card";
import { ShineBorder } from "@/components/magicui/shine-border";
import { LucideIcon } from "lucide-react"; // required for icon typing

type OffersCardProps = {
  icon: LucideIcon;
  title: string;
  description: string;
  iconColor: string;
};

export function OffersCard({ icon: Icon, title, description, iconColor }: OffersCardProps) {
  return (
    <Card className="relative overflow-hidden max-w-[350px] w-full bg-white/95 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-8 transition-all hover:-translate-y-1 flex flex-col items-center text-center">
      <ShineBorder shineColor={["#A07CFE", "#FE8FB5", "#FFBE7B"]} />
      <CardContent className="flex flex-col items-center text-center gap-4">
        <Icon className={`${iconColor} mb-4`} size={36} />
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>
        <p className="text-gray-600 dark:text-gray-300">{description}</p>
      </CardContent>
    </Card>
  );
}
