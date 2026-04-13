import crypto from "node:crypto";
import memoStore from "./memo_store.js";
import MemoEntry from "./memo_entry.js";

export default class MemoApp {
  memos = [];

  static async load() {
    const app = new MemoApp();
    const memosData = await memoStore.load();
    app.memos = memosData.map((memo) => new MemoEntry(memo));
    return app;
  }

  add(content) {
    const memoEntry = new MemoEntry({
      id: crypto.randomUUID(),
      content: content.trimEnd(), // 標準入力の最後の改行を取り除く
    });
    const newMemos = this.memos.concat(memoEntry);
    return memoStore.save(newMemos);
  }

  delete(id) {
    const newMemos = this.memos.filter((memo) => memo.id !== id);
    return memoStore.save(newMemos);
  }
}
