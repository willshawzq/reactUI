const Tag = React.createClass ({
	getInitialState() {
		return {
			closed: false
		}
	},
	closeTag() {
		this.setState({
			closed: true
		});
		this.props.onClose && this.props.onClose();
	},
	render() {
		let {href, closable, color} = this.props;
		let clazz = [
			"react-tag",
			color ? "react-tag-" + color : "",
			this.state.closed ? "react-tag-close" : ""
		].join(" ").replace(/\s\s+/g, ' ');
		return (
			<span className={clazz}>
				<a href={href} className="react-tag-text">{this.props.children}</a>
				{(()=>{
					if(closable) {
						return <Icon type="cross" onClick={this.closeTag} />;
					}
				})()}
			</span>
		);
	}
});
