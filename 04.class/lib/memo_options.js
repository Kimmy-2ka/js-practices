import { Command, Option } from "commander";

export class MemoOptions {
  constructor() {
    this.options = this.#createOptions();
  }

  isList() {
    return this.options.list;
  }

  isReference() {
    return this.options.reference;
  }

  isDelete() {
    return this.options.delete;
  }

  #createOptions() {
    const program = new Command();
    program
      .addOption(
        new Option("-l, --list", "list memos").conflicts([
          "reference",
          "delete",
        ]),
      )
      .addOption(
        new Option("-r, --reference", "reference a memo").conflicts([
          "list",
          "delete",
        ]),
      )
      .addOption(
        new Option("-d, --delete", "delete a memo").conflicts([
          "list",
          "reference",
        ]),
      );
    program.parse();
    return program.opts();
  }
}
