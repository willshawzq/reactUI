const Radio = React.createClass({
    getInitialState() {
        return {
            checked: this.props.checked || this.props.defaultChecked || false,
            disabled: this.props.disabled || false,
            click: !this.props.noClick
        };
    },
    click() {
        this.setState({checked: true});
    },
    render() {
        var boxChecked = (this.state.click ? this.state.checked : this.props.checked) ? "react-radio-checked " : "",
            boxDisabled = this.state.disabled ? "react-radio-disabled " : "";
        return (
            <label>
                <span className={"radio " + boxChecked + boxDisabled} onClick={this.state.click ? this.click : null}>
                    <span className="react-radio-inner"></span>
                    <input type="radio" className="react-radio-input" value={this.props.value}
                        checked={boxChecked ? true : false} disabled={this.state.disabled}/>
                </span>
                <span>{this.props.children}</span>
            </label>
        );
    }
});
const RadioGroup = React.createClass({
    getInitialState() {
        return {
            value: this.props.value || this.props.defaultValue || "",
            disabled: this.props.disabled || false
        };
    },
    change(ev) {
        this.setState({value: ev.target.value});
        this.props.onChange && this.props.onChange();
    },
    render() {
        let value = this.state.value;
        let children = this.props.children.map(function(el) {
            let type = el.type.displayName,
                props = el.props;
            return <Radio checked={value == props.value} value={props.value} noClick={true}>{props.children}</Radio>
        });
        return (
            <div className={"react-radio-group"} onChange={this.change} disabled={this.state.disabled} >
                {children}
            </div>
        );
    }
});
//when given a defaultValue, the default radio can not toggle state.
ReactDOM.render(
    <RadioGroup defaultValue={3}>
        <Radio value={2}>vvv2</Radio>
        <Radio value={3}>vvv3</Radio>
        <Radio value={4}>vvv4</Radio>
    </RadioGroup>
    , document.querySelector("#example"));
ReactDOM.render(
    <Radio defaultChecked={false} value={2}>vvv1</Radio>
    , document.querySelector("#example1"));
