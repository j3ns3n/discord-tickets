class Collection extends Map {
	constructor(args) {
		super(args);
	}

	find(key, value) {
		const values = Array.from(this.values());
		for (let i = 0; i < values.length; i++) {
			if (values[i] instanceof Object) {
				if (values[i][key] === value) return values[i];
			}
		}
	}

	findAll(key, value) {
		const values = Array.from(this.values());
		let result = [];
		for (let i = 0; i < values.length; i++) {
			if (values[i] instanceof Object) {
				if (values[i][key] === value) result.push(values[i]);
			}
		}
		return result;
	}

	filter(func) {
		let result = [];
		const all = Array.from(this.values());
		for (let i = 0; i < all.length; i++) {
			if (func(all[i])) result.push(all[i]);
		}
		return result;
	}

	map(func) {
		const values = Array.from(this.values());
		let result = [];
		for (let i = 0; i < values.length; i++) {
			result.push(func(values[i]));
		}
		return result;
	}

	getIndex(index) {
		const values = Array.from(this.values());
		if (values[index]) return values[index][1];
		return null;
	}
}

module.exports = Collection;
