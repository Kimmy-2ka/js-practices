import Enquirer from "enquirer";
const { Select } = Enquirer;

export class MemoView {
  constructor(memoApp) {
    this.memoApp = memoApp;
  }

  list() {
    for (const memo of this.memoApp.memos) {
      console.log(memo.firstLine());
    }
  }

  reference() {
    const prompt = this.#selectMemo("Select a memo to view.");

    prompt
      .run()
      .then((memo) => console.log(memo.content))
      .catch(console.error("メモの表示に失敗しました。"));
  }

  delete() {
    const prompt = this.#selectMemo("Select a memo to delete.");

    prompt
      .run()
      .then((memo) => this.memoApp.delete(memo.id))
      .catch(console.error("メモの削除に失敗しました。"));
  }

  #selectMemo(message) {
    const choices = this.memoApp.memos.map((memo) => ({
      message: memo.firstLine(),
      value: memo,
    }));

    return new Select({
      name: "memo",
      message,
      choices,
    });
  }
}
