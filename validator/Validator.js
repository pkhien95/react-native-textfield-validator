/*
 * Clear Systems Asia
 * Hien Phung
 * Email: hienphung@clearsystems.asia
 */

export default class Validator {
	
	textFields = [];
	
	addTextField = (textField) => {
		this.textFields.push(textField);
	};
	
	clear = () => {
		while (this.textFields.length > 0) {
			this.textFields.pop();
		}
	};
	
	validateAll = () => {
		let result = null;
		for (let textField of this.textFields) {
			result = this.validate(textField);
			if (result) {
				textField.setError(result);
			}
		}
		if (result) {
			return false;
		}
		return true;
	};
	
	validate = (textField) => {
		console.log('Validating textfield: ');
		console.log(textField);
		let result = null;
		for (let rule of textField.props.rules) {
			rule.setData(textField.state.text);
			console.log('Validating rule: ' + JSON.stringify(rule));
			let error = rule.check();
			if (error) {
				result = error;
			}
		}
		return result;
	}
};

export class Rule {
	constructor(data = '') {
		this.data = data;
	}
	
	setData = (data) => {
		this.data = data
	};
	
	message = 'Invalid input';
	setMessage = (message) => {
		this.message = message;
	};
	
	check() {
		return null;
	}
}

export class BlankRule extends Rule {
	constructor(data) {
		super(data);
		this.message = 'This field cannot be empty'
	}
	
	check() {
		if (!this.data || this.data.length === 0) {
			return this.message;
		}
		return super.check();
	}
}

export class EmailRule extends Rule {
	constructor(data) {
		super(data);
		this.message = 'Email is not valid'
	}
	
	check() {
		const re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
		if (!re.test(this.data.toLowerCase())) {
			return this.message;
		}
		return super.check();
	}
}

export class LengthRule extends Rule {
	constructor(data, minLength = 5, maxLength = 100) {
		super(data);
		this.minLength = minLength;
		this.maxLength = maxLength;
		this.tooShortMessage = 'This field is too short';
		this.tooLongMessage = 'This field is too long'
		
	}
	
	setShortMessage(message) {
		this.tooShortMessage = message;
	}
	
	setLongMessage(message) {
		this.tooLongMessage = message;
	}
	
	check() {
		if (this.data.length < this.minLength) {
			return this.tooShortMessage;
		}
		if (this.data.length > this.maxLength) {
			return this.tooLongMessage
		}
		return super.check();
	}
}

export class PasswordRule extends LengthRule {
	constructor(data) {
		super(data, 5, 100);
		this.setShortMessage('Password must have at least 5 characters');
		this.setLongMessage('Password is too long');
	}
}

export class SameRule extends Rule {
	constructor(data, matchData, fieldName) {
		super(data);
		this.matchData = matchData;
		this.message = fieldName + " does not match"
	}
	check() {
		console.log("Data: " + this.data + ", Matchdata: " + this.matchData);
		if (this.data !== this.matchData) {
			return this.message;
		}
		return super.check();
	}
}