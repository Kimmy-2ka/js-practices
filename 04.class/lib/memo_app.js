import fs from "node:fs/promises";
import { MemoEntry } from "../lib/memo_entry.js";

export class MemoApp {
  memos = [];

  static async load() {
    const memoApp = new MemoApp();
    const text = await fs.readFile("./data/memos.json", "utf8");

    memoApp.memos = JSON.parse(text).map((memo) => new MemoEntry(memo));
    return memoApp;
  }

  add(input) {
    const memoEntry = new MemoEntry({
      id: this.#nextId(),
      content: input.trimEnd(), // 標準入力の最後の改行を取り除く
    });
    const newMemos = this.memos.concat(memoEntry);
    return MemoApp.#save(newMemos);
  }

  delete(memoId) {
    const newMemos = this.memos.filter((memo) => memo.id !== memoId);
    return MemoApp.#save(newMemos);
  }

  static #save(memos) {
    const jsonText = JSON.stringify(memos);
    return fs.writeFile("./data/memos.json", jsonText);
  }

  #nextId() {
    if (this.memos.length === 0) {
      return 1;
    }

    return Math.max(...this.memos.map((memo) => memo.id)) + 1;
  }
}
