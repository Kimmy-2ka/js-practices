import crypto from "node:crypto";

export default class MemoEntry {
  #id;
  #content;

  constructor({ id, content }) {
    this.#id = id;
    this.#content = content;
  }

  get id() {
    return this.#id;
  }

  get content() {
    return this.#content;
  }

  static create(content) {
    return new MemoEntry({
      id: crypto.randomUUID(),
      content: content.trimEnd(), // 標準入力の最後の改行を取り除く
    });
  }

  toObject() {
    return {
      id: this.#id,
      content: this.#content,
    };
  }

  firstLine() {
    const maxLength = 50; // 1行が長かった時のために、最大値を設定
    return (
      this.#content.split("\n")[0].slice(0, maxLength) || "First line is blank."
    );
  }
}
