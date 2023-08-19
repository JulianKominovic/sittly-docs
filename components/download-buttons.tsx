import { DownloadAssets } from "../types/github-release";
import Debian from "./icons/Debian";
import Download from "./icons/Download";
export function DownloadButtons({ downloads }: DownloadAssets): any {
  return downloads.map((asset) => {
    let Icon: React.ReactNode = null;
    if (asset.name === "Debian") {
      Icon = <Debian className="w-4 h-4 mx-1 aspect-square" />;
    }

    return (
      asset && (
        <a
          href={asset.url}
          target="_blank"
          className="inline-flex items-center p-2 rounded-md bg-neutral-800 w-fit text-neutral-50"
        >
          <Download /> <span className="mx-2 leading-none">|</span> {Icon}{" "}
          {asset.name} <small className="mx-1 text-neutral-400">(.deb)</small>
        </a>
      )
    );
  });
}
