import enquirer from "enquirer";
import MemoStore from "./memo_store.js";
import MemoEntry from "./memo_entry.js";

const { Select } = enquirer;

export default class MemoApp {
  #store;
  #memos;

  constructor(store, memos) {
    this.#store = store;
    this.#memos = memos;
  }

  static async build(filePath) {
    const store = new MemoStore(filePath);
    const memosData = await store.load();
    const memos = memosData.map((memo) => new MemoEntry(memo));
    return new MemoApp(store, memos);
  }

  list() {
    if (!this.#hasMemos()) {
      console.log("No memos.");
      return;
    }
    for (const memo of this.#memos) {
      console.log(memo.firstLine());
    }
  }

  async reference() {
    if (!this.#hasMemos()) {
      console.log("No memos to display.");
      return;
    }
    const prompt = this.#selectMemo("Select a memo to display.");
    const selectedMemo = await prompt.run();
    console.log(selectedMemo.content);
  }

  async delete() {
    if (!this.#hasMemos()) {
      console.log("No memos to delete.");
      return;
    }
    const prompt = this.#selectMemo("Select a memo to delete.");
    const selectedMemo = await prompt.run();
    this.#memos = this.#memos.filter((memo) => memo.id !== selectedMemo.id);
    await this.#store.save(this.#memos);
  }

  async add(content) {
    const memo = MemoEntry.create(content);
    this.#memos = this.#memos.concat(memo);
    await this.#store.save(this.#memos);
  }

  #hasMemos() {
    return this.#memos.length > 0;
  }

  #selectMemo(message) {
    const choices = this.#memos.map((memo) => ({
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
