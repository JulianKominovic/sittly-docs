import Link from "next/link";
import ExtensionItem from "../../components/ExtensionItem";
import { getUserExtensions } from "../../server-actions/db/extensions";

export const dynamic = "force-dynamic";

export default async function ServerComponent() {
  const extensions = await getUserExtensions();
  if (!extensions)
    return (
      <main className="min-h-screen pt-20 text-center">
        Extensions not found
      </main>
    );
  return (
    <>
      <header className="flex items-center justify-between mb-8">
        <h1 className="text-4xl">My extensions</h1>
        <Link
          className="flex items-center justify-center px-4 py-2 transition-colors rounded-lg bg-neutral-800 text-neutral-200 hover:bg-neutral-700 "
          href={"/backoffice/create"}
        >
          Create
        </Link>
      </header>
      {extensions.map((props) => (
        <ExtensionItem {...props} isBackoffice />
      ))}
    </>
  );
}
