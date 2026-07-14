/* Tipos compartilhados pelos layouts de prévia. */
import type { TierTokens } from "@/lib/previaTiers";

export type Plan = "basico" | "profissional" | "premium";
export type HasFn = (min: Plan) => boolean;
export type PhotoFn = (slot: number, w: number, h: number) => string;

/* Props comuns a todos os layouts de nicho (o `demo` é somado em cada um). */
export type LayoutBaseProps = {
  has: HasFn;
  photo: PhotoFn;
  plan: Plan;
  tier: TierTokens;
};
