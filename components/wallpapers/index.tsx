"use client"

import { Wallpaper } from "@/types/wallpaper";
import WallpapersList from "./wallpapersList";

interface Props {
    wallpapers: Wallpaper[];
}

export default function({ wallpapers }: Props) {

    return (
        <section className="max-w-6xl mx-auto">
            <WallpapersList wallpapers={wallpapers} />
        </section>
    )
}