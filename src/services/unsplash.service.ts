import fs from "fs";
import path from "path";

export class UnsplashService {
  private host = "https://api.unsplash.com";

  constructor(private accessToken: string) {}

  public getRandomImageInfo() {
    return new Promise((resolve, reject) => {
      fetch(
        `${this.host}/photos/random?client_id=${String(
          this.accessToken
        ).trim()}&query=${encodeURIComponent(
          process.env["UNSPLASH_IMAGE_SEARCH_QUERY"] || ""
        )}&orientation=${
          process.env["UNSPLASH_IMAGE_ORIENTATION"] || "landscape"
        }&count=${process.env["UNSPLASH_IMAGE_COUNT"] || "1"}`,
        {
          method: "GET",
        }
      ).then(async (res) => {
        if (res.status === 200) {
          const res_ = await res.json();
          resolve(res_);

          const firstImageUrl = res_[0]?.urls?.full;
          if (firstImageUrl) {
            console.log("firstImageUrl: ", firstImageUrl);

            this.downloadImageToLocal(firstImageUrl, "wallpaper.jpg")
              .then((savedPath) => {
                console.log("Saved wallpaper to path: ", savedPath);
              })
              .catch(console.error);
          }
        } else {
          reject(await res.json());
        }
      });
    });
  }

  downloadImageToLocal(imageUrl: any, filename: string) {
    const desDirPath = path.resolve(process.cwd(), "static", "unsplash");
    console.log({ desDirPath });

    if (!fs.existsSync(desDirPath)) {
      fs.mkdirSync(desDirPath, {
        recursive: true,
      });
    }

    const savedPath = path.join(desDirPath, filename);

    return new Promise((resolve, reject) => {
      const headers_ = {};
      fetch(imageUrl, {
        method: "GET",
      })
        .then((r) => {
          Object.assign(headers_, r.headers);
          return r.arrayBuffer();
        })
        .then((r) => {
          fs.writeFileSync(savedPath, Buffer.from(r));
          resolve({
            headers: headers_,
            savedPath,
          });
        })
        .catch(reject);
    });
  }
}
