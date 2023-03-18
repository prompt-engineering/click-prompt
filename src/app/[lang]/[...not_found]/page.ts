/// https://stackoverflow.com/a/75625136

import { notFound } from "next/navigation";

export default function NotFoundCatchAll() {
  notFound();
  return null;
}
