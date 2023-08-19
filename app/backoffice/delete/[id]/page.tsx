import { redirect } from "next/navigation";
import { extensionBelongsToUser } from "../../../../utils/auth";

import { deleteExtension } from "../../../../server-actions/db/extensions";
import Link from "next/link";

export default async function EditExtension({ params }) {
  const { id } = params;
  const extensionToDelete = await extensionBelongsToUser(id);
  if (!extensionToDelete) return redirect("/backoffice");

  return (
    <form action={deleteExtension} method="DELETE">
      <input
        type="hidden"
        name="id"
        defaultValue={extensionToDelete.id}
        readOnly
      />
      <h2>Are you sure?</h2>
      <p className="mb-4">You are going to delete {extensionToDelete.name}</p>

      <Link
        href={"/backoffice"}
        className="inline-flex items-center justify-center px-4 py-2 mr-4 font-medium transition-colors rounded-lg w-fit bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
      >
        No! Go back
      </Link>
      <button
        type="submit"
        className="inline-flex items-center justify-center px-4 py-2 font-medium text-red-200 transition-colors bg-red-500 rounded-lg hover:bg-red-700"
      >
        Yes, delete it
      </button>
    </form>
  );
}
