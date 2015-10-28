"use strict";

var Alert = React.createClass({
	displayName: "Alert",

	/*组件自带的关闭效果*/
	closeTextFunc: function closeTextFunc() {
		var reactAlert = this.refs.reactAlert;
		reactAlert.classList.add("react-alert-close-style");
	},
	render: function render() {
		var _this = this;

		var _props = this.props;
		var type = _props.type;
		var description = _props.description;
		var closeText = _props.closeText;
		var closeable = _props.closeable;
		var message = _props.message;
		var onClose = _props.onClose;
		var statusClass = type ? " react-alert-" + type : "";
		var descriClass = description ? " react-alert-with-description" : "";
		return React.createElement(
			"div",
			{ className: ["react-alert", statusClass, descriClass].join(" "), ref: "reactAlert" },
			React.createElement("i", { className: "react-alert-icon react-circle" }),
			React.createElement(
				"span",
				{ className: "react-alert-message" },
				message
			),
			(function () {
				if (descriClass) {
					return React.createElement(
						"p",
						{ className: "react-alert-description" },
						description
					);
				}
			})(),
			(function () {
				if (closeText) {
					return React.createElement(
						"span",
						{ className: "react-alert-close-text", onClick: _this.closeTextFunc },
						closeText
					);
				} else if (closeable) {
					return React.createElement(
						"a",
						{ className: "react-alert-close-icon", onClick: onClose },
						React.createElement(
							"i",
							{ className: "" },
							"ddd"
						)
					);
				}
			})()
		);
	}
});

ReactDOM.render(React.createElement(
	"div",
	null,
	React.createElement(Alert, { message: "success",
		type: "success" }),
	React.createElement(Alert, { message: "success",
		closeText: React.createElement(
			"a",
			{ href: "javascript:;" },
			"不再提醒"
		),
		type: "success" }),
	React.createElement(Alert, { message: "success",
		closeable: true,
		onClose: function () {
			return console.log("d");
		},
		type: "success" }),
	React.createElement(Alert, { message: "success",
		description: "成功提示的辅助性文字介绍",
		closeText: React.createElement(
			"a",
			{ href: "javascript:;" },
			"不再提醒"
		),
		type: "success" })
), document.getElementById('example'));