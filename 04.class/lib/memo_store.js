import fs from "node:fs/promises";
import path from "node:path";

export default class MemoStore {
  #filePath;

  constructor(filePath) {
    this.#filePath = filePath;
  }

  async load() {
    try {
      const jsonText = await fs.readFile(this.#filePath, "utf8");
      return JSON.parse(jsonText);
    } catch (err) {
      if (err.code === "ENOENT") {
        return [];
      }
      throw err;
    }
  }

  async save(memos) {
    await fs.mkdir(path.dirname(this.#filePath), { recursive: true });
    const jsonText = JSON.stringify(memos.map((memo) => memo.toObject()));
    await fs.writeFile(this.#filePath, jsonText);
  }
}
