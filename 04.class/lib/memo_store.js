import fs from "node:fs/promises";

const memoStore = {
  async load() {
    try {
      const jsonText = await fs.readFile("./data/memos.json", "utf8");
      return JSON.parse(jsonText);
    } catch (err) {
      if (err.code === "ENOENT") {
        return [];
      }
      throw err;
    }
  },

  async save(memos) {
    await fs.mkdir("./data", { recursive: true });
    const jsonText = JSON.stringify(memos);
    await fs.writeFile("./data/memos.json", jsonText);
  },
};

export default memoStore;
