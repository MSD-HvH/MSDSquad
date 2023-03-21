const build: "Dev" | "Release" = (["Mased"].join(" ")).match(Cheat.GetUsername()) ? "Dev" : "Release";
const screen = Render.GetScreenSize();
const version: string = "1.0.0";