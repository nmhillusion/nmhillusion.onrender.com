import * as fs from "fs";
import * as path from "path";

export class Adb2cService {
  public getResetEmailTemplate(username: string) {
    return fs
      .readFileSync(
        path.join(
          process.cwd(),
          "/resources/reset_emailtemplate_vietnamese.html"
        ),
        "utf8"
      )
      .toString()
      .replace("${username}", username);
  }
}
