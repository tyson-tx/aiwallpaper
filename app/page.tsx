'use client'

import Header from "@/components/header";
import Wallpapers from "@/components/wallpapers";
import Footer from "@/components/footer";
import Hero from "@/components/hero";
import { useEffect, useState } from "react";
import { Wallpaper } from "@/types/wallpaper";
import Input from "@/components/input";

export default function Home() {
  const [wallpapers, setWallpapers] = useState<Wallpaper[]>([]);

  const fetchWallpapers = async function () {
      const result = await fetch("/api/get-wallpapers");
      const { data } = await result.json();
      if (data) {
          setWallpapers(data);
      }
  }

    useEffect(() => {
        fetchWallpapers();
    }, []);

  return (
    <div className="w-screen h-screen">
      <Header />
      <Hero />
      <Input setWallpapers={setWallpapers}/>
      <Wallpapers wallpapers={wallpapers} />
      <Footer />
    </div>
  );
}
