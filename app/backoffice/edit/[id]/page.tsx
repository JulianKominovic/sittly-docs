import { redirect } from "next/navigation";
import { extensionBelongsToUser } from "../../../../utils/auth";
import ExtensionCreateModifyFormServerComponent from "../../../../components/ExtensionCreateModifyForm";
import { createOrEditExtension } from "../../../../server-actions/db/extensions";

export default async function EditExtension({ params }) {
  const { id } = params;
  const extensionToModify = await extensionBelongsToUser(id);
  if (!extensionToModify) return redirect("/backoffice");

  return (
    <ExtensionCreateModifyFormServerComponent
      action={createOrEditExtension}
      method="PATCH"
      defaultValues={{
        repoUrl: extensionToModify.url,
        extensionIconUrl: extensionToModify.icon_url,
        extensionName: extensionToModify.name,
        extensionDescription: extensionToModify.body,
        id: extensionToModify.id,
      }}
    />
  );
}
