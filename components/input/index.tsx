"use client"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Wallpaper } from "@/types/wallpaper";
 
interface Props {
    setWallpapers: Dispatch<SetStateAction<Wallpaper[]>>;
}

export default function({ setWallpapers }: Props) {
    const [description, setDesciption] = useState("");
    const [loading, setLoading] = useState(false);

    const generateWallpaper = async function () {
        const params = {
            description: description,
        }

        setLoading(true);
        const result = await fetch("/api/gen-wallpaper", {
            method: "POST",
            body: JSON.stringify(params),
        });
        const { data } = await result.json();
        setLoading(false);
        
        if (data) {
            setWallpapers((wallpapers: Wallpaper[]) => [data, ...wallpapers]);
        }
    }

    const handleSubmit = async function() {
        if (!description) {
            alert("壁纸描述不能为空");
            return;
        }

        await generateWallpaper()
    }

    return (
        <div className="max-w-xl mx-auto flex items-center">
            <Input
                type="text"
                placeholder="请描述你要生成的壁纸"
                value={description}
                onChange={(e) => setDesciption(e.target.value)}
                disabled={loading}
            />
            <Button className="ml-4" onClick={handleSubmit} disabled={loading}>
                {loading ? "生成中..." : "生成壁纸"}
            </Button>
        </div>
    );
}

