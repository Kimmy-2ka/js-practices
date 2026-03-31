export class MemoEntry {
  constructor(memo) {
    this.id = memo.id;
    this.content = memo.content;
  }

  firstLine() {
    return this.content.split("\n")[0];
  }
}
