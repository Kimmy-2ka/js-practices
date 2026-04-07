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

    const memo = await prompt.run();
    console.log(memo.content);
  }

  async delete() {
    const prompt = this.#selectMemo("Select a memo to delete.");

    const memo = await prompt.run();
    await this.memoApp.delete(memo.id);
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
