import { downloadAndUploadImage } from "@/lib/s3";
import { User } from "@/types/user";
import { insertWallpaper } from "@/models/wallpaper";
import { getOpenAIClient } from "@/services/openai";
import { Wallpaper } from "@/types/wallpaper";
import { ImageGenerateParams } from "openai/resources/images.mjs";
import { currentUser } from "@clerk/nextjs/server";
import { saveUser } from "@/services/user";
import { getUserCredits } from "@/services/order";
import { genUuid } from "@/lib/index";


export async function POST(req: Request) {

    const { description } = await req.json();
    
    // todo check user auth
    const user = await currentUser()
    if (!user || !user.emailAddresses || user.emailAddresses.length === 0) {
        return Response.json({
          code: -2,
          message: "user not login",
        });
      }
    const user_email = user.emailAddresses[0].emailAddress;

    const credits = await getUserCredits(user_email);
    if (credits.left_credits < 1) {
      return Response.json({
        code: -1,
        message: "credits is not enough",
      });
    }

    const nickname = user.firstName;
    const avatarUrl = user.imageUrl;
    const userInfo: User = {
        email: user_email,
        nickname: nickname || "",
        avatar_url: avatarUrl,
    };

    await saveUser(userInfo);


    console.log("description", description);

    const client = getOpenAIClient();

    const img_size = "1792x1024";
    const llm_name = "dall-e-3";
    const llm_params:ImageGenerateParams = {
        prompt: `generate a desktop wallpaper about: ${description}`,
        model: llm_name,
        n: 1,
        quality: "hd",
        response_format: "url",
        size: img_size,
        style: "natural",
    }
    const result = await client.images.generate(llm_params);
    console.log("generate wallpaper result:", result)

    const raw_img_url = result.data[0].url; // openai dall-e img url
    if (!raw_img_url) {
        return Response.json({
        code: -1,
        message: "generate wallpaper failed",
        });
    }

    const img_name = encodeURIComponent(description);
    const img_uuid = genUuid();
    const s3_img = await downloadAndUploadImage(
      raw_img_url,
      process.env.AWS_BUCKET || "wallpaperdemo",
      `wallpapers/${img_uuid}.png`
    );
    const img_url = s3_img.Location;
    
    const created_at = (new Date()).toISOString();
    const wallpaper: Wallpaper = {
        user_email: user_email,
        img_description: description,
        img_size: img_size,
        img_url: img_url,
        llm_name: llm_name,
        llm_params: JSON.stringify(llm_params),
        created_at: created_at,
        uuid: img_uuid,
      };
      await insertWallpaper(wallpaper);

    return Response.json({
        code: 0,
        message: "ok",
        data: wallpaper,
    })
}