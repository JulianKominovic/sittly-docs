import Link from "next/link";
import { ExtensionModel } from "../types/db";

export default function ExtensionItem({
  author,
  body,
  icon_url,
  name,
  url,
  id,
  isBackoffice = false,
}: ExtensionModel & {
  isBackoffice?: boolean;
}) {
  if (isBackoffice)
    return (
      <div className="flex flex-col gap-2 px-6 py-4 mb-6 transition-colors border rounded-lg bg-neutral-50 border-neutral-50 hover:bg-neutral-100 hover:transition-colors">
        <header className="flex items-center gap-4">
          <img
            className="rounded-md"
            src={icon_url}
            alt={name}
            width={32}
            height={32}
          />
          <h2 className="text-2xl font-bold">{name}</h2>
          <aside className="flex items-center justify-end flex-grow gap-3">
            <Link
              href={`/backoffice/edit/${id}`}
              className="flex items-center justify-center px-4 py-2 font-medium transition-colors rounded-lg bg-neutral-500 text-neutral-200 hover:bg-neutral-700"
            >
              Edit
            </Link>
            <Link
              href={`/backoffice/delete/${id}`}
              className="flex items-center justify-center px-4 py-2 font-medium text-red-200 transition-colors bg-red-500 rounded-lg hover:bg-red-700"
            >
              Delete
            </Link>
          </aside>
        </header>
        <p className="text-sm truncate text-neutral-600">{url}</p>
        <p>{body}</p>
        <p className="text-sm text-neutral-600">Made by {author}</p>
      </div>
    );

  return (
    <Link
      href={`/store/${id}`}
      className="flex flex-col gap-2 px-6 py-4 mb-6 transition-colors border rounded-lg bg-neutral-50 border-neutral-50 hover:bg-neutral-100 hover:transition-colors"
    >
      <header className="flex items-center gap-4">
        <img
          className="rounded-md"
          src={icon_url}
          alt={name}
          width={32}
          height={32}
        />
        <h2 className="text-2xl font-bold">{name}</h2>
      </header>
      <p className="text-sm truncate text-neutral-600">{url}</p>
      <p>{body}</p>
      <p className="text-sm text-neutral-600">Made by {author}</p>
    </Link>
  );
}
