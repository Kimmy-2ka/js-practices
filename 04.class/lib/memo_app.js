import memoStore from "./memo_store.js";
import MemoEntry from "./memo_entry.js";

export default class MemoApp {
  memos = [];

  static async load() {
    const app = new MemoApp();
    const memosData = await memoStore.load();
    app.memos = MemoEntry.all(memosData);
    return app;
  }

  add(content) {
    const memo = MemoEntry.create(content);
    const newMemos = this.memos.concat(memo);
    return memoStore.save(newMemos);
  }

  delete(id) {
    const newMemos = this.memos.filter((memo) => memo.id !== id);
    return memoStore.save(newMemos);
  }
}
