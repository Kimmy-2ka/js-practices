import enquirer from "enquirer";
const { Select } = enquirer;

export class MemoView {
  constructor(memoApp) {
    this.memoApp = memoApp;
  }

  list() {
    for (const memo of this.memoApp.memos) {
      console.log(memo.title());
    }
  }

  reference() {
    const prompt = this.#selectMemo("Select a memo to display.");

    prompt
      .run()
      .then((memo) => console.log(memo.content))
      .catch(() => console.error("Failed to display the memo."));
  }

  delete() {
    const prompt = this.#selectMemo("Select a memo to delete.");

    prompt
      .run()
      .then((memo) => this.memoApp.delete(memo.id))
      .catch(() => console.error("Failed to delete the memo."));
  }

  #selectMemo(message) {
    const choices = this.memoApp.memos.map((memo) => ({
      name: memo.title(),
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
