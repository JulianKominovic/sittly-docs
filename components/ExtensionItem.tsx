import Link from "next/link";
import { ExtensionModel } from "../types/db";
import Image from "next/image";

export default function ExtensionItem({
  author,
  body,
  icon_url,
  name,
  url,
}: ExtensionModel) {
  const detailsPath = new URL(url).pathname;
  return (
    <Link
      href={`/store${detailsPath}`}
      className="flex flex-col gap-2 px-6 py-4 mb-6 border rounded-md bg-neutral-100 border-neutral-50"
    >
      <header className="flex items-center gap-4">
        <Image src={icon_url} alt={name} width={32} height={32} />
        <h2 className="text-2xl font-bold">{name}</h2>
      </header>
      <p className="text-sm text-neutral-600">{url}</p>
      <p className="text-lg">{body}</p>
      <p className="text-sm text-neutral-600">{author}</p>
    </Link>
  );
}
