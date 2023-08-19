import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { EXTENSIONS_DB_TABLE } from "../../config/constants";
import { currentUser } from "@clerk/nextjs";
import ExtensionItem from "../../components/ExtensionItem";
import { ExtensionModel } from "../../types/db";

export const dynamic = "force-dynamic";

export default async function ServerComponent() {
  const user = await currentUser();
  if (!user) return <p>Not logged in</p>;
  if (!user.id) return <p>Not logged in</p>;

  const supabase = createServerComponentClient({ cookies });
  const { data, error } = await supabase
    .from(EXTENSIONS_DB_TABLE)
    .select("")
    .eq("user_id", user.id);
  if (error) return <p>{error.message}</p>;
  if (data.length === 0) return <p>No extensions</p>;
  const extensions = data as unknown as ExtensionModel[];
  return <main>{extensions.map(ExtensionItem)}</main>;
}
