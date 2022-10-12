import * as flags from "https://deno.land/std@0.158.0/flags/mod.ts";
import * as path from "https://deno.land/std@0.158.0/path/mod.ts";
import { HttpServer } from "./http_server.ts";

const args = flags.parse(Deno.args, {
  string: ["port", "password", "builtins"],
  alias: { p: "port" },
  default: {
    port: "3000",
  },
});

if (!args._.length) {
  console.error(
    "Usage: silverbullet [--port 3000] [--password mysecretpassword] <path-to-pages>",
  );
  Deno.exit(1);
}

const pagesPath = path.resolve(Deno.cwd(), args._[0] as string);
const port = +args.port;

import assetBundle from "../dist/asset_bundle.json" assert { type: "json" };
import { AssetBundle, AssetJson } from "../plugos/asset_bundle/bundle.ts";

console.log("Pages folder:", pagesPath);

const httpServer = new HttpServer({
  port: port,
  pagesPath: pagesPath,
  assetBundle: new AssetBundle(assetBundle as AssetJson),
  password: args.password,
});
httpServer.start().catch((e) => {
  console.error(e);
});
