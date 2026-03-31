import Enquirer from "enquirer";
const { Select } = Enquirer;

export class MemoFormat {
  constructor(memoApp) {
    this.memos = memoApp.memos;
    this.memoApp = memoApp;
  }

  list() {
    for (const memo of this.memos) {
      console.log(memo.firstLine());
    }
  }

  reference() {
    const choices = this.memos.map((memo) => ({
      message: memo.firstLine(),
      value: memo,
    }));
    const prompt = new Select({
      name: "memo",
      message: "Select a memo to view.",
      choices,
    });

    prompt
      .run()
      .then((memo) => console.log(memo.content))
      .catch(console.error);
  }

  delete() {
    const choices = this.memos.map((memo) => ({
      message: memo.firstLine(),
      value: memo.id,
    }));
    const prompt = new Select({
      name: "memo",
      message: "Select a memo to delete.",
      choices,
    });

    prompt
      .run()
      .then((memoId) => this.memoApp.delete(memoId))
      .catch(console.error);
  }
}
