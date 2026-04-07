import enquirer from "enquirer";
const { Select } = enquirer;

export class MemoView {
  constructor(memoApp) {
    this.memoApp = memoApp;
  }

  list() {
    for (const memo of this.memoApp.memos) {
      console.log(memo.firstLine());
    }
  }

  async reference() {
    const prompt = this.#selectMemo("Select a memo to display.");

    try {
      const memo = await prompt.run();
      console.log(memo.content);
    } catch {
      console.error("Failed to display the memo.");
    }
  }

  async delete() {
    const prompt = this.#selectMemo("Select a memo to delete.");

    try {
      const memo = await prompt.run();
      await this.memoApp.delete(memo.id);
    } catch {
      console.error("Failed to delete the memo.");
    }
  }

  #selectMemo(message) {
    const choices = this.memoApp.memos.map((memo) => ({
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
