"use strict";

var Slider = React.createClass({
	displayName: "Slider",

	getInitialState: function getInitialState() {
		return {
			value: this.props.defaultValue || 0
		};
	},
	getPercent: function getPercent(ev) {
		var mp = this.getMousePos(ev);
		var ep = this.getElementPos(this.refs.sliderContainer);
		var percent = (mp.x - ep.left) / this.refs.sliderContainer.offsetWidth * 100;
		var oSliderContainer = this.refs.sliderContainer;
		var oSilderTrack = oSliderContainer.querySelector(".react-slider-track");
		var oSilderHandle = oSliderContainer.querySelector(".react-slider-handle");

		percent = percent > 100 ? percent = 100 + "%" : percent += "%";
		oSilderTrack.style.width = percent;
		oSilderHandle.style.left = percent;
		return percent;
	},
	onSliderMouseDown: function onSliderMouseDown(ev) {
		var _this = this;

		this.getPercent(ev);

		document.addEventListener("mousemove", this.onSliderMove);

		document.addEventListener("mouseup", function () {
			document.removeEventListener("mousemove", _this.onSliderMove);
		});
	},
	onSliderMove: function onSliderMove(ev) {
		this.getPercent(ev);
	},
	onSliderUp: function onSliderUp() {},
	getMousePos: function getMousePos(event) {
		var e = event || window.event;
		var scrollX = document.documentElement.scrollLeft || document.body.scrollLeft;
		var scrollY = document.documentElement.scrollTop || document.body.scrollTop;
		var x = e.pageX || e.clientX + scrollX;
		var y = e.pageY || e.clientY + scrollY;
		return { 'x': x, 'y': y };
	},
	getElementPos: function getElementPos(el) {
		var pos = { left: 0, top: 0 };
		while (el) {
			pos.left += el.offsetLeft;
			pos.top += el.offsetTop;
			el = el.offsetParent;
		}
		return pos;
	},
	componentWillMount: function componentWillMount() {},
	render: function render() {
		var value = this.state.value + "%";
		return React.createElement(
			"div",
			{ className: "react-slider", onMouseDown: this.onSliderMouseDown, ref: "sliderContainer" },
			React.createElement("div", { className: "react-slider-track", style: { width: value } }),
			React.createElement(
				"span",
				{ className: "react-slider-tooltip-wrap" },
				React.createElement("div", { className: "react-slider-handle", style: { left: value }, onMouseUp: this.onSliderUp })
			)
		);
	}
});

ReactDOM.render(React.createElement(
	"div",
	null,
	React.createElement(Slider, { defaultValue: 50 })
), document.getElementById('example'));
