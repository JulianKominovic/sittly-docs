import ExtensionCreateModifyFormServerComponent from "../../../components/ExtensionCreateModifyForm";
import { createOrEditExtension } from "../../../server-actions/db/extensions";

export const dynamic = "force-dynamic";

export default async function ServerComponent() {
  return (
    <ExtensionCreateModifyFormServerComponent
      action={createOrEditExtension}
      method="POST"
    />
  );
}
