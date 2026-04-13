import crypto from "node:crypto";

export default class MemoEntry {
  constructor(memo) {
    this.id = memo.id;
    this.content = memo.content;
  }

  static all(memosData) {
    return memosData.map((memo) => new MemoEntry(memo));
  }

  static create(content) {
    return new MemoEntry({
      id: crypto.randomUUID(),
      content: content.trimEnd(), // 標準入力の最後の改行を取り除く
    });
  }

  firstLine() {
    const maxLength = 50; // 1行が長かった時のために、最大値を設定
    return (
      this.content.split("\n")[0].slice(0, maxLength) || "First line is blank."
    );
  }
}
