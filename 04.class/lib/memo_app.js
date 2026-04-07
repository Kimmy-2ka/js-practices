import fs from "node:fs/promises";
import crypto from "node:crypto";
import MemoEntry from "../lib/memo_entry.js";

export default class MemoApp {
  memos = [];

  static async load() {
    const app = new MemoApp();
    try {
      const jsonText = await fs.readFile("./data/memos.json", "utf8");
      app.memos = JSON.parse(jsonText).map((memo) => new MemoEntry(memo));
    } catch (err) {
      if (err.code === "ENOENT") {
        app.memos = [];
      } else {
        throw err;
      }
    }

    return app;
  }

  add(content) {
    const memoEntry = new MemoEntry({
      id: crypto.randomUUID(),
      content: content.trimEnd(), // 標準入力の最後の改行を取り除く
    });
    const newMemos = this.memos.concat(memoEntry);
    return MemoApp.#save(newMemos);
  }

  delete(id) {
    const newMemos = this.memos.filter((memo) => memo.id !== id);
    return MemoApp.#save(newMemos);
  }

  static async #save(memos) {
    await fs.mkdir("./data", { recursive: true });
    const jsonText = JSON.stringify(memos);
    return fs.writeFile("./data/memos.json", jsonText);
  }
}
