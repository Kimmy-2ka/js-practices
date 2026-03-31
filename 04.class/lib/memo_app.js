import fs from "node:fs/promises";
import { MemoEntry } from "../lib/memo_entry.js";

export class MemoApp {
  constructor() {
    this.memos = [];
  }

  static async load() {
    const memoApp = new MemoApp();
    const text = await fs.readFile("./data/memos.json", "utf8");

    memoApp.memos = JSON.parse(text).map((memo) => new MemoEntry(memo));
    return memoApp;
  }

  async save(input) {
    const jsonText = JSON.stringify(this.#add(input));
    await fs.writeFile("./data/memos.json", jsonText);
  }

  #add(input) {
    const memo = {
      id: this.#nextId(),
      content: input.trimEnd(), // 標準入力の最後の改行を取り除く
    };
    const memoEntry = new MemoEntry(memo);
    return this.memos.concat(memoEntry);
  }

  #nextId() {
    if (this.memos.length === 0) {
      return 1;
    }

    return Math.max(...this.memos.map((memo) => memo.id)) + 1;
  }
}
