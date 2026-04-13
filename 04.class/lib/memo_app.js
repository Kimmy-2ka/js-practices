import enquirer from "enquirer";
import memoStore from "./memo_store.js";
import MemoEntry from "./memo_entry.js";

const { Select } = enquirer;

export default class MemoApp {
  constructor(memos) {
    this.memos = memos;
  }

  static async build() {
    const memosData = await memoStore.load();
    const memos = MemoEntry.all(memosData);
    return new MemoApp(memos);
  }

  list() {
    if (!this.#hasMemos()) {
      console.log("No memos.");
      return;
    }
    for (const memo of this.memos) {
      console.log(memo.firstLine());
    }
  }

  async reference() {
    if (!this.#hasMemos()) {
      console.log("No memos to display.");
      return;
    }
    const prompt = this.#selectMemo("Select a memo to display.");
    const memo = await prompt.run();
    console.log(memo.content);
  }

  async delete() {
    if (!this.#hasMemos()) {
      console.log("No memos to delete.");
      return;
    }
    const prompt = this.#selectMemo("Select a memo to delete.");
    const selectedMemo = await prompt.run();
    this.memos = this.memos.filter((memo) => memo.id !== selectedMemo.id);
    await memoStore.save(this.memos);
  }

  async add(content) {
    const memo = MemoEntry.create(content);
    this.memos = this.memos.concat(memo);
    await memoStore.save(this.memos);
  }

  #hasMemos() {
    return this.memos.length > 0;
  }

  #selectMemo(message) {
    const choices = this.memos.map((memo) => ({
      name: memo.firstLine(),
      value: memo,
    }));

    return new Select({
      name: "memo",
      message,
      choices,
      result() {
        return this.focused.value;
      },
    });
  }
}
