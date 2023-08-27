import Image from "next/image";
import React from "react";
import sittly from "../assets/images/sittly-landing.png";
import sittlyShortcuts from "../assets/images/sittly-shortcuts.png";
import sittlyExtensionStore from "../assets/images/sittly-store.png";
import { DownloadAssets, GithubRelease } from "../types/github-release";
import { DownloadButtons } from "../components/download-buttons";
import Link from "next/link";
import Github from "../components/icons/Github";
import Markdown from "../components/markdown/render";

let releases: DownloadAssets = {
  downloads: [],
  tag: "",
};

async function fetchSittlyReleases(): Promise<DownloadAssets> {
  const response: GithubRelease[] = await fetch(
    "https://api.github.com/repos/JulianKominovic/sittly-launcher/releases",
    {
      next: {
        // Each 10 minutes
        revalidate: 60 * 10,
      },
    }
  )
    .then((response) => {
      return response.json();
    })
    .catch((error) => {
      console.log(error);
      return [];
    });

  const newerRelease = response[0];
  if (!newerRelease) return releases;
  const assets = newerRelease.assets;

  const downloads: DownloadAssets["downloads"] = assets.map((asset) => {
    if (asset.content_type === "application/vnd.debian.binary-package")
      return {
        name: "Debian",
        url: asset.browser_download_url,
      };
    return {
      name: "AppImage",
      url: asset.browser_download_url,
    };
  });

  releases = {
    downloads,
    tag: newerRelease.tag_name,
  };

  return releases;
}

async function page() {
  const { downloads, tag } = await fetchSittlyReleases();
  const debianDownload = downloads.find((d) => d.name === "Debian");
  const installBashScript = `
  \`\`\`bash title='try-now.sh' copy
  # Create .sittly folder
  mkdir -p ~/.sittly
  cd ~/.sittly
  # Install Sittly libraries
  sudo apt install xsel xdotool xclip wmctrl
  # Download Sittly .deb
  wget ${debianDownload?.url}
  # Install Sittly
  sudo apt install ./${debianDownload?.url.split("/").pop()}

  \`\`\`
  `;

  return (
    <main className="w-full max-w-lg p-4 pb-20 mx-auto">
      <header className="my-8">
        <div>
          <div>
            <h1 id="home" className="text-5xl text-neutral-800">
              Sittly <span className="text-xs">v {tag}</span>
            </h1>
            <p className="text-neutral-600">
              Laucher like Raycast or Spotlight but for <u>Linux</u>
            </p>
          </div>
          <div className="flex flex-col my-4">
            <DownloadButtons downloads={downloads} tag={tag} />
            <small className="mt-2 text-xs text-neutral-500">
              * Sittly is ONLY tested on Ubuntu 22.04 (xorg NOT wayland). It may
              work on other desktops, but it's not guaranteed.
            </small>
            <a
              target="_blank"
              href="https://github.com/JulianKominovic/sittly-launcher"
              className="flex items-center gap-1 mt-4"
            >
              <Github />
              <span className="underline underline-offset-4">
                See github repo
              </span>
              <span className="inline-block -rotate-45">{"->"}</span>
            </a>
          </div>
        </div>
      </header>
      <Image
        priority
        src={sittly.src}
        alt="Sittly landing page"
        width={sittly.width}
        height={sittly.height}
      />

      <h2 className="mt-20 text-3xl text-neutral-800" id="extensions">
        Try it!
      </h2>
      <p className="text-neutral-600">
        Copy and paste the following code into a terminal
      </p>
      <Markdown githubRepoUrl={""}>{installBashScript}</Markdown>

      <section className="px-4 py-4 mt-10 border rounded-lg bg-amber-50 border-amber-200">
        <h2 className="flex items-center gap-2 text-3xl text-neutral-800">
          Current status{" "}
          <span className="px-2 py-0.5 text-xs bg-amber-100 text-amber-600 border border-amber-300 rounded-lg">
            Alpha
          </span>
        </h2>
        <p className="mb-2">
          Working on an alpha release with{" "}
          <b>
            almost no features for the final user but full of features for devs
          </b>{" "}
          to achieve a rapid extension development:
        </p>
        <ul className="my-4">
          <li>{"->"} UI elements</li>
          <li>{"->"} Hooks</li>
          <li>{"->"} Extensions support</li>
          <li>{"->"} Navigation</li>
          <li>{"->"} Pages</li>
        </ul>
        <Link href={"/docs"} className="block underline underline-offset-4">
          If you have some free time check out the docs{" ->"}
        </Link>
        <Link
          href={"/docs/roadmap"}
          className="block underline underline-offset-4"
        >
          See roadmap{" ->"}
        </Link>
      </section>
      <section className="px-4 mt-20">
        <h2 className="text-3xl text-neutral-800" id="extensions">
          Extensible
        </h2>
        <p className="text-neutral-600">
          Sittly is extensible, you can create your own extensions and download
          from the community using the <b>store</b>.
        </p>
        <Image
          className="-mx-3"
          loading="lazy"
          src={sittlyExtensionStore.src}
          alt="Sittly extension store"
          width={sittlyExtensionStore.width}
          height={sittlyExtensionStore.height}
        />
        <p>
          If you are interested in creating your own extension, see{" "}
          <Link
            href={"/docs/extensions/creating/setup"}
            className="underline underline-offset-4"
          >
            extensions docs{" ->"}
          </Link>
        </p>
        <p>
          Download them from the app or{" "}
          <Link href={"/store"} className="underline underline-offset-4">
            see the store {" ->"}
          </Link>{" "}
        </p>
      </section>
      <section className="px-4 mt-20">
        <h2 className="text-3xl text-neutral-800">Shortcuts</h2>
        <p className="text-neutral-600">
          Open Sittly with{" "}
          <kbd className="font-sans px-1 py-0.5 bg-neutral-200 border border-neutral-300 rounded-lg">
            Ctrl + Alt + K
          </kbd>{" "}
          and start typing. We are starting to work on shortcuts soon.
        </p>
        <Image
          loading="lazy"
          src={sittlyShortcuts.src}
          alt="Sittly shortcuts"
          width={sittlyShortcuts.width}
          height={sittlyShortcuts.height}
        />
        <Link href={"/docs"} className="underline underline-offset-4">
          See shorcuts in our docs{" ->"}
        </Link>
      </section>
      <section className="px-4 mt-20">
        <h2 className="text-3xl text-neutral-800">Agility</h2>
        <p className="text-neutral-600">
          Related to shortcuts and extensibility, Sittly is designed to be
          agile, because of that we designed a navigation system that allows you
          to navigate through the app with your keyboard, mouse or both.
        </p>
      </section>
      <section className="px-4 mt-20">
        <h2 className="text-3xl text-neutral-800">Performance</h2>
        <p className="text-neutral-600">
          Performance is one of our main goals, so we are using{" "}
          <a
            href="https://tauri.app/"
            target="_blank"
            className="underline underline-offset-4"
            rel="noopener noreferrer"
          >
            Tauri <span className="inline-block -rotate-45">{"->"}</span>
          </a>{" "}
          (Rust) and React using libraries and techniques that allow us to have
          a good performance.
        </p>
      </section>
      <section className="px-4 mt-20">
        <h2 className="text-3xl text-neutral-800">
          From developers to developers
        </h2>
        <p className="text-neutral-600">
          Sittly is made by developers for developers. This doesn't mean that
          you can't use it if you are not a developer, but it means that we are
          focused on developers needs.
        </p>
        <Link href={"/docs"} className="block underline underline-offset-4">
          Take a look at our docs{" ->"}
        </Link>
        <a
          target="_blank"
          href="https://github.com/JulianKominovic/sittly-launcher"
          className="underline underline-offset-4"
        >
          See Github repo{" "}
          <span className="inline-block -rotate-45">{"->"}</span>
        </a>
      </section>
      <section className="px-4 mt-20">
        <h2 className="text-3xl text-neutral-800">Open source</h2>
        <p className="text-neutral-600">
          We believe open source means security and transparency, so we decided
          to make Sittly open source.
        </p>
        <a
          target="_blank"
          href="https://github.com/JulianKominovic/sittly-launcher"
          className="underline underline-offset-4"
        >
          See Github repo{" "}
          <span className="inline-block -rotate-45">{"->"}</span>
        </a>
      </section>
    </main>
  );
}

export default page;
