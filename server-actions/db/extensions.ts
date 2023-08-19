import { currentUser } from "@clerk/nextjs";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { EXTENSIONS_DB_TABLE } from "../../config/constants";

export async function postExtension(data: FormData) {
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
  const supabase = createServerComponentClient(
    { cookies },
    { supabaseKey: process.env.SUPABASE_SERVICE_ROLE }
  );

  const { data: result, error } = await supabase
    .from(EXTENSIONS_DB_TABLE)
    .upsert([
      {
        url: `https://github.com/${repoOwner}/${repoName}`,
        author:
          user.username ?? user.firstName ?? user.lastName ?? user.username,
        name: extensionName,
        icon_url: extensionIconUrl,
        body: extensionDescription,
        user_id: user.id,
      },
    ]);
  console.log(result, error);
}
