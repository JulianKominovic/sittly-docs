import { currentUser } from "@clerk/nextjs";
import { ExtensionModel } from "../types/db";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { EXTENSIONS_DB_TABLE } from "../config/constants";
import { cookies } from "next/headers";

export async function extensionBelongsToUser(
  extensionId: ExtensionModel["id"]
) {
  const user = await currentUser();
  if (!user) return null;

  const supabase = createServerComponentClient({ cookies });
  const { data, error } = await supabase
    .from(EXTENSIONS_DB_TABLE)
    .select()
    .eq("id", extensionId)
    .eq("user_id", user.id)
    .limit(1);

  if (error) {
    console.log(error);
    return null;
  }
  if (data.length === 0) return null;

  return data.at(0) as ExtensionModel;
}
