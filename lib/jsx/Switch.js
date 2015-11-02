const Switch = React.createClass({
	getInitialState() {
		return {
			checked: this.props.defaultChecked || false
		}
	},
	toggle() {
		this.setState({
			checked: !this.state.checked
		});
		this.props.onChange && this.props.onChange.call(this, this.state.checked);
	},
	componentWillMount() {
		this.setState({
			checked: this.props.checked
		});
	},
	render() {
		let checked = this.state.checked;
		return (
			<span className={"react-switch " + (checked ? "react-switch-checked":"")} onClick={this.toggle}>
				<span className="react-switch-inner">
				{(() => {
					if(checked) {
						return this.props.checkedChildren;
					}else {
						return this.props.unCheckedChildren;
					}					
				})()}
				</span>
			</span>
		);
	}
});
ReactDOM.render(
	<Switch defaultChecked={true} checked={false} 
		checkedChildren={"开"} unCheckedChildren={"关"}
		onChange={()=>{console.log(111);}}/>,
	document.getElementById('example')
);
