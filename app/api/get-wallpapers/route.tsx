import { getWallpapers } from "@/models/wallpapers"

export async function GET(req:Request) {

    const wallpapers = await getWallpapers(1, 50);

    return Response.json({
        code: 0,
        message: 'ok',
        data: wallpapers,
    })
}