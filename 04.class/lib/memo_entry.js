export class MemoEntry {
  constructor(memo) {
    this.id = memo.id;
    this.content = memo.content;
  }

  title() {
    const maxLength = 50; // titleが長かった時のために、最大値を設定
    return this.content.split("\n")[0].slice(0, maxLength) || "No title";
  }
}
