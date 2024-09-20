import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import dayjs from "dayjs";
import localizeFormat from "dayjs/plugin/localizedFormat";
import "dayjs/locale/pt-br";

dayjs.extend(localizeFormat);
dayjs.locale("pt-br");

export { dayjs };

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
