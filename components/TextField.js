/*
 * Clear Systems Asia
 * Hien Phung
 * Email: hienphung@clearsystems.asia
 */

import React, {Component} from 'react'
import {StyleSheet, Text, TextInput, View} from 'react-native'
import PropTypes from 'prop-types'
import ViewPropTypes from 'prop-types'
import TextPropTypes from 'prop-types'
import TextInputPropTypes from 'prop-types'
import Validator from "../validator/Validator";

export default class TextField extends Component {
	static propTypes = {
		...TextInput.propTypes,
		containerStyle: ViewPropTypes.style,
		labelStyle: TextPropTypes.style,
		inputStyle: TextInputPropTypes.style,
		errorStyle: TextPropTypes.style,
		label: PropTypes.string.isRequired,
		showLabel: PropTypes.bool.isRequired,
		onChangeText: PropTypes.func,
		rules: PropTypes.array,
		validator: Validator,
	};
	
	
	renderLabel = () => {
		const {showLabel, labelStyle, label} = this.props;
		if (showLabel) {
			return (<Text style={[styles.label, labelStyle]}>{label}</Text>);
		}
	};
	
	renderError = () => {
		if (this.state.error) {
			return (<Text style={[styles.error, this.props.errorStyle]}>{this.state.error}</Text>)
		}
		return null;
	};
	onBlur = () => {
		const error = this.props.validator.validate(this);
		this.setState((previousState) => {
			return {...previousState, error: error}
		})
	};
	
	setError = (error) => {
		this.setState((previousState) => {
			return {...previousState, error: error}
		})
	};
	
	onChangeText = (text) => {
		console.log('Setting text: ' + text);
		this.setState((previousState) => {
			return {...previousState, text: text}
		});
	};
	
	constructor(props) {
		super(props);
		
		this.state = {
			error: '',
			text: ''
		};
	}
	
	focus() {
		this.props.inputRef.focus();
	};
	
	componentDidMount() {
		this.props.validator.addTextField(this);
		console.log('Added text field: ');
		console.log(this);
	}
	
	componentWillReceiveProps(nextProps) {
		// if (nextProps.value) {
		// 	this.onChangeText(nextProps.value);
		// 	setTimeout(() => {
		// 		this.onBlur();
		// 	}, 100)
		// }
	}
	
	render() {
		const {dispatch} = this.props;
		const {containerStyle, labelStyle, inputStyle, label, onChangeText} = this.props;
		let borderColor = 'lightgray';
		if (this.state.error == null) {
			borderColor = 'green';
		}
		if (this.state.error && this.state.error !== '') {
			borderColor = 'red';
		}
		
		return (
			<View style={[styles.container, containerStyle]}>
				{this.renderLabel()}
				<TextInput {...this.props}
						   underlineColorAndroid='transparent'
						   ref={this.props.inputRef}
						   style={[styles.input, inputStyle, {borderColor: borderColor}]}
						   onBlur={() => this.onBlur()}
						   onChangeText={(text) => {
							   if (onChangeText) {
								   onChangeText(text);
							   }
							   this.onChangeText(text);
						   }}
						   value={this.props.value.toString()}
						   blurOnSubmit={true}/>
				{this.renderError()}
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		alignItems: 'stretch',
		justifyContent: 'center',
	},
	label: {
		fontSize: 16,
		marginBottom: 5,
		color: 'black'
	},
	input: {
		height: 44,
		borderRadius: 3,
		borderWidth: 1,
		borderColor: 'lightgray',
		paddingLeft: 10,
		textAlign: 'justify',
		justifyContent: 'center',
		textAlignVertical: 'center',
		paddingTop: 0,
		paddingBottom: 0,
	},
	error: {
		fontSize: 14,
		color: 'red',
		marginTop: 5,
	}
});

