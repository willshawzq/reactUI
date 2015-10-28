const Alert = React.createClass({
	/*组件自带的关闭效果*/
	closeTextFunc() {
		let reactAlert = this.refs.reactAlert;
		reactAlert.classList.add("react-alert-close-style");
	},
	render() {
		let {type, description, closeText, closeable, message, onClose} = this.props,
			statusClass = type ? " react-alert-" + type : "",
			descriClass = description ? " react-alert-with-description": "";
		return (
			<div className={["react-alert", statusClass, descriClass].join(" ")} ref="reactAlert">
				<i className="react-alert-icon react-circle"></i>
				<span className="react-alert-message">
					{message}
				</span>
				{(()=>{
					if(descriClass) {
						return (
							<p className="react-alert-description">
								{description}
							</p>
						);
					}
				})()}
				{(()=>{
					if(closeText) {
						return (
							<span className="react-alert-close-text" onClick={this.closeTextFunc}>
								{closeText}
							</span>
						);
					}else if(closeable) {
						return (
							<a className="react-alert-close-icon" onClick={onClose}>
								<i className="">ddd</i>
							</a>
						);
					}
				})()}
			</div>
		);
	}
});

ReactDOM.render(
	<div>
		<Alert message="success" 
		   type="success"/>
		   <Alert message="success" 
		  	closeText={<a href="javascript:;">不再提醒</a>}
		   type="success"/>
		   <Alert message="success" 
		  	closeable
		  	onClose={()=>console.log("d")}
		   type="success"/>
		  <Alert message="success" 
		  	description="成功提示的辅助性文字介绍"
		  	closeText={<a href="javascript:;">不再提醒</a>}
		   type="success"/>
	</div>
  ,
  document.getElementById('example')
);