import { DownloadAssets } from "../types/github-release";
import Debian from "./icons/Debian";
import Download from "./icons/Download";
export async function DownloadButtons({ downloads }: DownloadAssets) {
  return downloads.map((asset) => {
    let Icon: React.ReactNode = null;
    if (asset.name === "Debian") {
      Icon = <Debian className="w-4 h-4 aspect-square mx-1" />;
    }

    return (
      asset && (
        <a
          href={asset.url}
          target="_blank"
          className="bg-neutral-800 w-fit inline-flex items-center text-neutral-50 rounded-md p-2"
        >
          <Download /> <span className="leading-none mx-2">|</span> {Icon}{" "}
          {asset.name} <small className="mx-1 text-neutral-400">(.deb)</small>
        </a>
      )
    );
  });
}
