import React from "react";
export default async function ExtensionCreateModifyFormServerComponent({
  action,
  method = "POST",
  defaultValues,
}: {
  action: any;
  method: "POST" | "GET" | "PUT" | "DELETE" | "PATCH";
  defaultValues?: {
    repoUrl: string;
    extensionName: string;
    extensionIconUrl: string;
    extensionDescription: string;
    id: string;
  };
}) {
  return (
    <form method={method} action={action}>
      <input
        readOnly
        type="hidden"
        name="id"
        defaultValue={defaultValues?.id}
      />
      <fieldset className="flex flex-col gap-2 mb-6">
        <label htmlFor="repo-url">Github repo URL *</label>
        <input
          defaultValue={defaultValues?.repoUrl}
          required
          className="px-4 py-2 rounded-md bg-neutral-100"
          type="url"
          name="repo-url"
          id="repo-url"
          placeholder="e.g: https://github.com/JulianKominovic/sittly-extension-template"
        />
        <small className="text-neutral-600">
          Must be github repo url, not branches, not commits or anything else
        </small>
      </fieldset>
      <fieldset className="flex flex-col gap-2 mb-6">
        <label htmlFor="extension-name">Extension name *</label>
        <input
          defaultValue={defaultValues?.extensionName}
          required
          className="px-4 py-2 rounded-md bg-neutral-100"
          type="text"
          name="extension-name"
          id="extension-name"
          placeholder="My awesome extension"
        />
        <small className="text-neutral-600">
          This name will be visible to users
        </small>
      </fieldset>
      <fieldset className="flex flex-col gap-2 mb-6">
        <label htmlFor="extension-icon-url">Extension icon URL *</label>
        <input
          defaultValue={defaultValues?.extensionIconUrl}
          required
          className="px-4 py-2 rounded-md bg-neutral-100"
          type="url"
          name="extension-icon-url"
          id="extension-icon-url"
          placeholder="https://placehold.co/600x400.png"
        />
        <small className="text-neutral-600">
          This will be the icon for your extension. Must be a valid image. GIF
          are also supported.
        </small>
      </fieldset>
      <fieldset className="flex flex-col gap-2 mb-6">
        <label htmlFor="extension-description">Description *</label>
        <textarea
          defaultValue={defaultValues?.extensionDescription}
          required
          rows={6}
          className="px-4 py-2 rounded-md bg-neutral-100"
          name="extension-description"
          id="extension-description"
          placeholder="My awesome extension does awesome things, like..."
        />
        <small className="text-neutral-600">
          Be
          <strong> concise</strong> and <strong>clear</strong>
        </small>
      </fieldset>
      <footer className="flex gap-4">
        <button
          className="px-4 py-2 border rounded-md border-neutral-400 bg-neutral-100 text-neutral-800 focus:ring-2 focus:ring-gray-400"
          type="reset"
        >
          Cancel
        </button>
        <button
          className="px-4 py-2 border rounded-md border-neutral-950 bg-neutral-800 text-neutral-200 focus:ring-2 focus:ring-gray-950"
          type="submit"
        >
          {defaultValues ? "Modify" : "Create"} extension
        </button>
      </footer>
    </form>
  );
}
