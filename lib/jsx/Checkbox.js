const CheckBox = React.createClass({
        getInitialState() {
            return {
                checked: this.props.defaultChecked || false,
                disabled: this.props.disabled || false
            };
        },
        change() {
            this.setState({checked: !this.state.checked});
            this.props.onChange();
        },
        render() {
            let [boxChecked, boxDisabled]  = [
                this.state.checked ? "react-checkbox-checked " : "",
                this.state.disabled ? "react-checkbox-disabled " : ""
            ];
            return (
                <span className={"react-checkbox " + boxChecked + boxDisabled} onChange={this.change}>
                    <span className="react-checkbox-inner"></span>
                    <input ref="checkbox" checked={boxChecked ? true : false} type="checkbox" className="react-checkbox-input" disabled={this.state.disabled} />
                </span>
            );
        }
    });
    ReactDOM.render(
        <CheckBox defaultChecked={true} onChange={() => {console.log("vvv");}} disabled={false} />, 
        document.querySelector("#example")
    );
