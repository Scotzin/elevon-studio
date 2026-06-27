/* Tipos compartilhados pelos layouts de prévia. */
export type Plan = "basico" | "profissional" | "premium";
export type HasFn = (min: Plan) => boolean;
export type PhotoFn = (slot: number, w: number, h: number) => string;
