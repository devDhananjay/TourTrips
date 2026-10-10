import {
  Award,
  BadgeIndianRupee,
  Briefcase,
  Car,
  CheckCircle2,
  Globe,
  Headset,
  Heart,
  Hotel,
  Map,
  Plane,
  Sparkles,
  Users,
  type LucideIcon,
} from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  Map,
  Globe,
  Heart,
  Users,
  Briefcase,
  Hotel,
  Plane,
  Car,
  BadgeIndianRupee,
  Sparkles,
  Award,
  Headset,
  CheckCircle2,
};

export default function IconBadge({
  name,
  className = "h-6 w-6",
}: {
  name: string;
  className?: string;
}) {
  const Icon = iconMap[name] || Sparkles;
  return <Icon className={className} />;
}
