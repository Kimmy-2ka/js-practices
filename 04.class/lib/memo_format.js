export class MemoFormat {
  constructor(memoApp) {
    this.memos = memoApp.memos;
  }

  list() {
    for (const memo of this.memos) {
      const firstLine = memo.content.split("\n")[0];
      console.log(firstLine);
    }
  }
}
