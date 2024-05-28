"use client";

import { Button } from "@/components/ui/button";
import { Wallpaper } from "@/types/wallpaper";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Props {
  wallpapers: Wallpaper[];
}

export default function ({wallpapers}: Props) {
    
  console.log("wallpaper:", wallpapers)
  return (
    <div>
      <section>
        <div className="mx-auto w-full max-w-7xl px-5 py-16 md:px-10 md:py-24">
          <div className="mb-8 text-center md:mb-12 ">
            <h2 className="text-3xl font-bold md:text-5xl text-primary">
              全部壁纸
            </h2>
            <p className="mt-4 text-[#636262] sm:text-sm md:text-base">
              一共 100 条由 AI 生成的壁纸
            </p>
          </div>
          <div className="mb-12 grid grid-cols-1 gap-5 sm:grid-cols-2 md:mb-16 md:grid-cols-3 md:gap-4 ">
            {wallpapers &&
              wallpapers.map((wallpaper: Wallpaper, idx: number) => {
                return (
                  <a
                        href={`/wallpaper/${wallpaper.uuid}`}
                        key={idx}
                        className="rounded-xl overflow-hidden mb-4 inline-block border border-solid border-[#cdcdcd] md:mb-8 lg:mb-10"
                      >
                        <Image
                          src={wallpaper.img_url}
                          alt={wallpaper.img_description}
                          width={350}
                          height={200}
                          loading="lazy"
                        />

                        <div className="px-5 py-4 sm:px-6">
                          <p className="flex-col text-[#808080]">
                            {wallpaper.img_description}
                          </p>
                          <div className="flex items-center mb-2 mt-6 flex-wrap gap-2 md:mb-2">
                            <Badge variant="secondary">
                              {wallpaper.img_size}
                            </Badge>

                            <div className="flex-1"></div>
                            <Avatar>
                              <AvatarImage
                                src={wallpaper.created_user?.avatar_url}
                                alt={wallpaper.created_user?.nickname}
                              />
                              <AvatarFallback>
                                {wallpaper.created_user?.nickname}
                              </AvatarFallback>
                            </Avatar>
                          </div>
                        </div>
                      </a>
                );
              })}
          </div>
          <div className="w-full flex justify-center">
            <Button>查看更多</Button>
          </div>
        </div>
      </section>
    </div>
  );
}