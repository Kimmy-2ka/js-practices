export default class MemoEntry {
  constructor(memo) {
    this.id = memo.id;
    this.content = memo.content;
  }

  firstLine() {
    const maxLength = 50; // 1行が長かった時のために、最大値を設定
    return (
      this.content.split("\n")[0].slice(0, maxLength) || "First line is blank."
    );
  }
}
