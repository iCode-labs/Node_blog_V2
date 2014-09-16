module.exports = function() {
	var size = 0;
	var entry = new Object();
	this.put = function(key, value) {
		if (!this.containsKey(key)) {
			size++;
		}
		entry[key] = value;
	}
	this.get = function(key) {
		if (this.containsKey(key)) {
			return entry[key];
		} else {
			return null;
		}
	}
	this.remove = function(key) {
		if (delete entry[key]) {
			size--;
		}
	}
	this.containsKey = function(key) {
		return (key in entry);
	}
	this.containsValue = function(value) {
		for (var prop in entry) {
			if (entry[prop] == value) {
				return true;
			}
		}
		return false;
	}
	this.addValue = function(key) {
		entry[key]++;
	}
	this.keyValues = function() {
		var list = new Array();
		for (var prop in entry) {
			var tag = new Object();
			tag.text = prop;
			tag.value = entry[prop];
			list.push(tag);
		}
		return list;
	}

}