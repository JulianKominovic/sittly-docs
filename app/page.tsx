import Image from "next/image";
import React from "react";
import sittly from "../assets/images/sittly-landing.png";
import sittlySelectEmoji from "../assets/images/sittly-select-emoji.png";
import sittlyAddExtension from "../assets/images/sittly-add-extension.png";
import sittlyContextMenuEmoji from "../assets/images/sittly-context-menu.png";
import {
  AssetDownloadFileTypes,
  DownloadAssets,
  GithubRelease,
} from "../types/github-release";
import { DownloadButtons } from "../components/download-buttons";
import Link from "next/link";
import blurryShapes from "../assets/images/deco.jpg";

type Props = {};

async function fetchSittlyReleases(): Promise<DownloadAssets> {
  // const response: GithubRelease[] = await fetch(
  //   "https://api.github.com/repos/JulianKominovic/sittly-launcher/releases",
  //   {
  //     next: {
  //       revalidate: 60 * 60 * 24,
  //     },
  //   }
  // )
  //   .then((response) => response.json())
  //   .catch((error) => {
  //     console.log(error);
  //     return [];
  //   });

  // const newerRelease = response[0];
  // if (!newerRelease) return { downloads: [], tag: "" };
  // const assets = newerRelease.assets;

  // const downloads: DownloadAssets["downloads"] = assets.map((asset) => {
  //   if (asset.content_type === "application/vnd.debian.binary-package")
  //     return {
  //       name: "Debian",
  //       url: asset.browser_download_url,
  //     };
  //   return {
  //     name: "AppImage",
  //     url: asset.browser_download_url,
  //   };
  // });

  // return {
  //   downloads,
  //   tag: newerRelease.tag_name,
  // };
  return {
    downloads: [
      {
        name: "Debian",
        url: "",
      },
    ],
    tag: "0.0.0",
  };
}

async function page(props: Props) {
  const { downloads, tag } = await fetchSittlyReleases();
  console.log(downloads, tag);
  return (
    <main className="p-4 pb-20 mx-auto max-w-lg">
      <header className="">
        <div>
          <h1 id="home" className="text-neutral-800 text-5xl">
            Sittly <span className="text-xs">v {tag}</span>
          </h1>
          <p className="text-neutral-600">
            Laucher like Raycast or Spotlight but for <u>Linux</u>
          </p>
          <div className="flex flex-col my-4">
            <DownloadButtons downloads={downloads} tag={tag} />
            <small className="text-neutral-500 mt-1 text-xs">
              Sittly is ONLY tested on X11 desktops, like ubuntu(gnome). It may
              work on other desktops, but it's not guaranteed.
            </small>
          </div>
        </div>
        <Image
          priority
          src={sittly.src}
          alt="Sittly landing page"
          width={sittly.width}
          height={sittly.height}
        />
        <Image
          priority
          src={sittlyAddExtension.src}
          alt="Sittly add extension"
          width={sittlyAddExtension.width}
          height={sittlyAddExtension.height}
        />
        <Image
          loading="lazy"
          src={sittlySelectEmoji.src}
          alt="Sittly Select emoji"
          width={sittlySelectEmoji.width}
          height={sittlySelectEmoji.height}
        />
        <Image
          loading="lazy"
          src={sittlyContextMenuEmoji.src}
          alt="Sittly Select emoji context menu"
          width={sittlyContextMenuEmoji.width}
          height={sittlyContextMenuEmoji.height}
        />
      </header>
      <section className="mt-10 rounded-lg bg-amber-50 px-4 border border-amber-200 py-4">
        <h2 className="text-3xl text-neutral-800 flex items-center gap-2">
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
        <Link href={"/docs"} className="underline block underline-offset-4">
          If you have some free time check out the docs{" ->"}
        </Link>
        <Link
          href={"/docs/roadmap"}
          className="underline block underline-offset-4"
        >
          Follow the development goals{" ->"}
        </Link>
      </section>
      <section className="mt-20 px-4">
        <h2 className="text-3xl text-neutral-800" id="extensions">
          Extensible
        </h2>
        <p className="text-neutral-600">
          Sittly is extensible, you can create your own extensions or download
          them from the community.{" "}
          <small className="text-amber-600 font-medium">
            (extensions store is under development)
          </small>
        </p>
        <p>
          If you are interested in creating your own extension, see{" "}
          <Link
            href={"/docs/extensions/creating/setup"}
            className="underline underline-offset-4"
          >
            extensions docs{" ->"}
          </Link>
        </p>
      </section>
      <section className="mt-20 px-4">
        <h2 className="text-3xl text-neutral-800">Shortcuts</h2>
        <p className="text-neutral-600">
          Open Sittly with{" "}
          <kbd className="font-sans px-1 py-0.5 bg-neutral-200 border border-neutral-300 rounded-lg">
            Ctrl + Alt + K
          </kbd>{" "}
          and start typing. We are starting to work on shortcuts soon.
        </p>
        <Link href={"/docs"} className="underline underline-offset-4">
          See shorcuts in our docs{" ->"}
        </Link>
      </section>
      <section className="mt-20 px-4">
        <h2 className="text-3xl text-neutral-800">Agility</h2>
        <p className="text-neutral-600">
          Related to shortcuts and extensibility, Sittly is designed to be
          agile, because of that we designed a navigation system that allows you
          to navigate through the app with your keyboard, mouse or both.
        </p>
      </section>
      <section className="mt-20 px-4">
        <h2 className="text-3xl text-neutral-800">Performance</h2>
        <p className="text-neutral-600">
          Performance is one of our main goals, so we are using{" "}
          <a
            href="https://tauri.app/"
            target="_blank"
            className="underline underline-offset-4"
            rel="noopener noreferrer"
          >
            Tauri <span className="-rotate-45 inline-block">{"->"}</span>
          </a>{" "}
          (Rust) and React using libraries and techniques that allow us to have
          a good performance.
        </p>
      </section>
      <section className="mt-20 px-4">
        <h2 className="text-3xl text-neutral-800">
          From developers to developers
        </h2>
        <p className="text-neutral-600">
          Sittly is made by developers for developers. This doesn't mean that
          you can't use it if you are not a developer, but it means that we are
          focused on developers needs.
        </p>
        <Link href={"/docs"} className="underline block underline-offset-4">
          Take a look at our docs{" ->"}
        </Link>
        <a
          target="_blank"
          href="https://github.com/JulianKominovic/sittly-launcher"
          className="underline underline-offset-4"
        >
          See Github repo{" "}
          <span className="-rotate-45 inline-block">{"->"}</span>
        </a>
      </section>
      <section className="mt-20 px-4">
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
          <span className="-rotate-45 inline-block">{"->"}</span>
        </a>
      </section>
    </main>
  );
}

export default page;
