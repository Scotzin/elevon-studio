import {
  Sparkles,
  MessageCircle,
  Smartphone,
  ShieldCheck,
  LayoutGrid,
  Palette,
  Briefcase,
  Wrench,
  Scissors,
  UtensilsCrossed,
  ShoppingBag,
  Beef,
  Store,
  Headphones,
  PenTool,
  Target,
  BadgeCheck,
  Rocket,
  Check,
  ArrowRight,
  Instagram,
  Menu,
  X,
  Plus,
  Minus,
  Quote,
  MapPin,
  Mail,
  Star,
  Zap,
  type LucideIcon,
} from "lucide-react";

/**
 * Mapa de icones: permite chamar um icone pelo nome (string) a partir
 * dos dados em lib/site.ts. Para usar um icone novo, importe-o acima
 * e adicione na lista abaixo.
 */
const icons: Record<string, LucideIcon> = {
  Sparkles,
  MessageCircle,
  Smartphone,
  ShieldCheck,
  LayoutGrid,
  Palette,
  Briefcase,
  Wrench,
  Scissors,
  UtensilsCrossed,
  ShoppingBag,
  Beef,
  Store,
  Headphones,
  PenTool,
  Target,
  BadgeCheck,
  Rocket,
  Check,
  ArrowRight,
  Instagram,
  Menu,
  X,
  Plus,
  Minus,
  Quote,
  MapPin,
  Mail,
  Star,
  Zap,
};

type IconProps = {
  name: string;
  className?: string;
  strokeWidth?: number;
};

export default function Icon({ name, className, strokeWidth = 2 }: IconProps) {
  const LucideComp = icons[name] ?? Sparkles;
  return <LucideComp className={className} strokeWidth={strokeWidth} />;
}
