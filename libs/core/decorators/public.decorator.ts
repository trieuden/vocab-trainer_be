import { SetMetadata } from "@nestjs/common";

export const IS_PUBLIC_KEY = "isPublic";

/** Bỏ qua JwtAuthGuard (route public). */
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
