export class MemoEntry {
  constructor(memo) {
    this.id = memo.id;
    this.content = memo.content;
  }

  title() {
    return this.content.split("\n")[0] || "No Title";
  }
}
