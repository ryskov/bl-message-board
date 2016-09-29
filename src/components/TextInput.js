import React, { Component } from 'react';
import './../styles/TextInput.css';

export default class TextInput extends Component {
    constructor(props) {
        super(props);

        this.state = {
            shiftIsPressed: false
        };
    }

    static propTypes() {
        return {
            placeholder: React.PropTypes.string
        }
    }

    _onFocus() {
        if (this.props.placeholder) {
            this.refs.textarea.placeholder = "";
        }
    }

    _onBlur() {
        if (this.props.placeholder) {
            this.refs.textarea.placeholder = this.props.placeholder;
        }
    }

    _onKeyDown(e) {
        switch (e.keyCode) {
            case 13: // enter
                if (!this.state.shiftIsPressed) {
                    if (this.props.onSubmit) this.props.onSubmit(this.refs.textarea.value);
                    this.refs.textarea.value = "";
                    this.refs.textarea.blur();
                    
                    e.preventDefault();
                }
                break;
            case 16: // shift-key
                this.setState({
                    shiftIsPressed: true
                });
                break;
            default:
                break;
        }
    }
    
    _onKeyUp(e) {
        switch (e.keyCode) {
            case 16: // shift-key
                this.setState({
                    shiftIsPressed: false
                });
                break;
            default:
                break;
        }
    }

    blur() {
        return this.refs.textarea.blur();
    }

    focus() {
        return this.refs.textarea.focus();
    }

    render() {
        return (
            <textarea
                ref="textarea"
                className="text-input"
                onFocus={this._onFocus.bind(this)}
                onBlur={this._onBlur.bind(this)}
                placeholder={this.props.placeholder ? this.props.placeholder : null}
                onKeyDown={this._onKeyDown.bind(this) }
                onKeyUp={this._onKeyUp.bind(this) } />
        );
    }
}