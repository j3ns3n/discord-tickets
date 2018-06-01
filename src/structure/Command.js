class Command {
  constructor(args) {
    this.info = args.info;
		this.execute = args.execute;
  }
}

module.exports = Command;
