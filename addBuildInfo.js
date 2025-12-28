import fs from "fs/promises"

const dist = await fs.readFile("./builds/dist.min.js", "utf-8")

const versionHash = ""

