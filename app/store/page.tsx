import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { SupabaseClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";
import { EXTENSIONS_DB_TABLE } from "../../config/constants";
import { ExtensionModel } from "../../types/db";
import Image from "next/image";
import Link from "next/link";
import ExtensionItem from "../../components/ExtensionItem";

export default async function StorePage({ params, searchParams }) {
  const { page: _page } = searchParams;
  const page = parseInt(_page ?? 1);
  const limit = 10;
  const offset = (page - 1) * limit;
  const supabase = createServerComponentClient({ cookies });
  const { data, count, error, status, statusText } = await supabase
    .from(EXTENSIONS_DB_TABLE)
    .select()
    .limit(limit)
    .range(offset, offset + limit - 1);

  const extensions = data as ExtensionModel[];
  console.log({ data, count, error, status, statusText });
  return (
    <main className="w-full max-w-lg min-h-screen p-4 pb-20 mx-auto">
      {extensions.map(ExtensionItem)}
    </main>
  );
}
