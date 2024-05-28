import { findWallpaperByUuid, getRandWallpapers } from "@/models/wallpaper";

import { Button } from "@/components/ui/button";
import { FaDownload } from "react-icons/fa";
import Image from "next/image";
import { Metadata } from "next";
import { Wallpaper } from "@/types/wallpaper";

export async function generateMetadata({
  params,
}: {
  params: { uuid: string };
}): Promise<Metadata> {
  let description = "";

  if (params.uuid) {
    const wallpaper = await findWallpaperByUuid(params.uuid);
    if (wallpaper) {
      description = wallpaper.img_description;
    }
  }

  return {
    title: `AI Wallpaper - ${description}`,
    description: `AI Wallpaper about ${description}, generated by AI Wallpaper Generator | AI Wallpaper Shop.`,
    alternates: {
      canonical: `${process.env.WEB_BASE_URI}/wallpaper/${params.uuid}`,
    },
  };
}

export default async function ({ params }: { params: { uuid: string } }) {
  const wallpaper = await findWallpaperByUuid(params.uuid);
  const random_wallpapers = await getRandWallpapers(1, 20);

  return (
    <>
      {wallpaper && (
        <section>
          <div className="mx-auto w-full max-w-7xl px-5 py-4 md:px-10 md:py-12">
            <div className="flex flex-col items-center">
              <div className="mb-8 text-center md:mb-12 lg:mb-16">
                <h1 className="text-primary text-3xl font-semibold capitalize md:text-6xl">
                  AI Wallpaper Preview
                </h1>
                <p className="mx-auto mt-8 text-lg">
                  {wallpaper.img_description}
                </p>

                <h2>
                  <a href={`/download/${params.uuid}`}>
                    <Button className="mt-8">
                      Download Wallpaper
                      <FaDownload className="ml-2" />
                    </Button>
                  </a>
                </h2>
              </div>

              <a className="relative mb-12 flex max-w-full grid-cols-1 flex-col gap-4 overflow-hidden rounded-xl border border-solid border-black bg-white font-bold text-black [box-shadow:rgb(0,_0,_0)_9px_9px] [grid-area:1/1/2/2] md:[grid-area:1/1/2/4]">
                <Image
                  src={wallpaper.img_url}
                  alt={wallpaper.img_description}
                  width={1792}
                  height={1024}
                  loading="lazy"
                />
              </a>

              <h2 className="text-xl font-semibold capitalize md:text-5xl my-4 md:my-16">
                More Wallpapers
              </h2>

              <div className="mb-8 grid w-full grid-cols-1 md:mb-12 md:grid-cols-3 md:gap-4 lg:mb-16">
                {random_wallpapers &&
                  random_wallpapers.map((wallpaper: Wallpaper, idx: number) => {
                    return (
                      <a
                        href={`/wallpaper/${wallpaper.uuid}`}
                        className="max-[767px]: flex max-w-full grid-cols-1 flex-col gap-4 rounded-md bg-white py-4 font-bold text-black lg:px-2"
                      >
                        <Image
                          src={wallpaper.img_url}
                          alt={wallpaper.img_description}
                          width={350}
                          height={200}
                          loading="lazy"
                          className="inline-block h-60 w-full rounded-xl object-cover"
                        />
                        <div className="flex w-full flex-col items-start justify-start py-4">
                          <p className="font-normal text-[#636262]">
                            {wallpaper.img_description}
                          </p>
                        </div>
                      </a>
                    );
                  })}
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}