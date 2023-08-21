import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { EXTENSIONS_DB_TABLE } from "../../../config/constants";
import { cookies } from "next/headers";
import { ExtensionModel } from "../../../types/db";
import Markdown from "../../../components/markdown/render";

function fetchReadme(githubUrl: string) {
  const url = new URL(githubUrl);
  const [_, owner, repo] = url.pathname.split("/");
  const readmeUrl = `https://raw.githubusercontent.com/${owner}/${repo}/main/README.md`;
  return fetch(readmeUrl)
    .then((response) => {
      return response.text();
    })
    .catch((err) => {
      console.error(err);
      return "";
    });
}

export default async function StoreIdDetails({ params }) {
  const supabase = createServerComponentClient({ cookies });
  const { data, error } = await supabase
    .from(EXTENSIONS_DB_TABLE)
    .select()
    .eq("id", params.id)
    .limit(1);

  if (error) {
    console.error(error);
    return (
      <main className="w-full max-w-lg min-h-screen p-4 pb-20 mx-auto">
        <h1>Something went wrong</h1>
      </main>
    );
  }

  const extension: ExtensionModel = data[0];

  const readme = await fetchReadme(extension.url);

  return (
    <main className="w-full max-w-lg min-h-screen p-4 pb-20 mx-auto prose">
      <Markdown githubRepoUrl={extension.url}>{readme}</Markdown>
    </main>
  );
}
