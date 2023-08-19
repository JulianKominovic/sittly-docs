import { currentUser } from "@clerk/nextjs";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { EXTENSIONS_DB_TABLE } from "../../config/constants";
import { ExtensionModel } from "../../types/db";
import { redirect } from "next/navigation";
import { randomUUID } from "crypto";

export async function createOrEditExtension(data: FormData) {
  "use server";

  const user = await currentUser();
  if (!user) return null;
  if (!data) return;

  const repoUrl = data.get("repo-url") as string;
  const sanitizedUrl = new URL(repoUrl);
  const [_, repoOwner, repoName] = sanitizedUrl.pathname.split("/");
  const extensionName = data.get("extension-name");
  const extensionIconUrl = data.get("extension-icon-url");
  const extensionDescription = data.get("extension-description");
  const extensionId = data.get("id");
  const supabase = createServerComponentClient(
    { cookies },
    { supabaseKey: process.env.SUPABASE_SERVICE_ROLE }
  );

  const insert: ExtensionModel = {
    url: `https://github.com/${repoOwner}/${repoName}`,
    author:
      user.username ??
      user.firstName ??
      user.lastName ??
      user.emailAddresses[0].emailAddress ??
      "",
    name: extensionName as string,
    icon_url: extensionIconUrl as string,
    body: extensionDescription as string,
    user_id: user.id,
    id: (extensionId as string) || randomUUID(),
  };

  const { data: result, error } = await supabase
    .from(EXTENSIONS_DB_TABLE)
    .upsert([insert]);

  redirect("/backoffice");
}

export async function getUserExtensions(): Promise<ExtensionModel[] | null> {
  "use server";

  const user = await currentUser();
  if (!user) return null;

  const supabase = createServerComponentClient({ cookies });
  const { data, error } = await supabase
    .from(EXTENSIONS_DB_TABLE)
    .select()
    .eq("user_id", user.id);

  if (error) {
    console.log(error);
    return null;
  }
  return data;
}

export async function deleteExtension(data: FormData) {
  "use server";
  const user = await currentUser();
  if (!user) return null;

  const supabase = createServerComponentClient(
    { cookies },
    { supabaseKey: process.env.SUPABASE_SERVICE_ROLE }
  );
  const extensionId = data.get("id");
  console.log(extensionId);
  const { error } = await supabase
    .from(EXTENSIONS_DB_TABLE)
    .delete()
    .eq("id", extensionId)
    .eq("user_id", user.id);
  if (error) {
    console.log(error);
  }
  redirect("/backoffice");
}
