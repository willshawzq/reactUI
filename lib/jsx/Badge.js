const Badge = React.createClass({
	render() {
		if(this.props.dot) {
			return (
				<span className="react-badge">
					{this.props.children}
					<sup className="react-badge-dot"></sup>
				</span>
			);
		}else {
			let count = this.props.count || 0;
			count = count > 100 ? "99+" : count;
			return (
				<span className="react-badge" title={count}>
					{this.props.children}
					<sup className="react-badge-count">
						{count}
					</sup>
				</span>
			);
		}
	}
});

ReactDOM.render(
	<div>
		<a href="#">
		    <Badge count="101">
		      <span className="head-example"></span>
		    </Badge>
		</a>
		<Badge dot={true}>
		    <a href="#">一个链接</a>
		</Badge>
	</div>
  ,
  document.getElementById('example')
);
