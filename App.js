import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import TextField from "./components/TextField";
import Validator, {EmailRule} from "./validator/Validator";

export default class App extends Component {
	
	constructor(props) {
		super(props);
		
		this.state = {
			email: ''
		};
		
		this.validator = new Validator();
	}
	
	emailOnChangeText = (text) => {
		this.setState((previousState) => {
			return {
				...previousState,
				email: text
			}
		})
	};
	
	render() {
		return (
			<View style={styles.container}>
				<TextField ref={(ref) => this.txtEmail = ref}
						   inputRef={(ref) => this.inputEmail = ref}
						   containerStyle={styles.emailContainer}
						   inputStyle={styles.emailInput}
						   label={'Email'}
						   showLabel={true}
						   onChangeText={(text) => this.emailOnChangeText(text)}
						   value={this.state.email}
						   rules={[new EmailRule()]}
						   validator={this.validator}
						   keyboardType={'email-address'}
						   returnKeyType={'next'}/>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'flex-start',
		alignItems: 'stretch',
		backgroundColor: 'white',
		paddingVertical: 20,
		paddingHorizontal: 15,
	},
	emailContainer: {
		marginTop: 50,
		marginBottom: 20,
	},
	emailInput: {
	
	}
});
