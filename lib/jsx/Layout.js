class Row extends React.Component {
	render() {
		let {type, justify, align, order} = this.props;
		let clazz = [
			type ? "row row-flex" : "row",
			justify ? "row-flex-" + justify : "",
			align ? "row-flex-" + align : ""
		].join(" ").replace(/\s\s+/g, ' ');//replace spaces with single
		return (
			<div className={clazz}>
				{this.props.children}
			</div>
		);
	}
}
class Col extends React.Component {
	render() {
		let {span, offset, push, pull, order} = this.props;
		let clazz = [
			span ? "col-" + span : "",
			offset ? "col-offset-" + offset : "",
			push ? "col-push-" + push : "",
			pull ? "col-pull-" + pull : "",
			order ? "col-order-" + order : ""
		].join(" ").replace(/\s\s+/g, ' ');//replace spaces with single
		return (
			<div className={clazz}>
			{this.props.children}
			</div>
		);
	}
}
