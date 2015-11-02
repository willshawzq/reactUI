const Slider = React.createClass({
	getInitialState() {
		return {
			value: this.props.defaultValue || 0
		}
	},
	getPercent(ev) {
		let [mp,ep] = [
			this.getMousePos(ev), 
			this.getElementPos(this.refs.sliderContainer)
		];
		let [percent, oSliderContainer] = [
			(mp.x - ep.left) / this.refs.sliderContainer.offsetWidth * 100,
			this.refs.sliderContainer
		];
		let [oSilderTrack, oSilderHandle] = [
			oSliderContainer.querySelector(".react-slider-track"),
			oSliderContainer.querySelector(".react-slider-handle")
		];
		percent = percent > 100 ? (percent = 100 + "%") : (percent += "%");
		oSilderTrack.style.width = percent;
		oSilderHandle.style.left = percent;
		return percent;
	},
	onSliderMouseDown(ev) {
		this.getPercent(ev);

		document.addEventListener("mousemove", this.onSliderMove);

		document.addEventListener("mouseup", ()=>{
			document.removeEventListener("mousemove", this.onSliderMove);
		});
	},
	onSliderMove(ev) {
		this.getPercent(ev);
	},
	onSliderUp() {
	},
	getMousePos(event) {
        var e = event || window.event;
        var scrollX = document.documentElement.scrollLeft || document.body.scrollLeft;
        var scrollY = document.documentElement.scrollTop || document.body.scrollTop;
        var x = e.pageX || e.clientX + scrollX;
        var y = e.pageY || e.clientY + scrollY;
        return { 'x': x, 'y': y };
    },
    getElementPos(el) {
    	var pos = {left: 0, top: 0};
    	while(el) {
    		pos.left += el.offsetLeft;
    		pos.top += el.offsetTop;
    		el = el.offsetParent;
    	}
    	return pos;
    },
    componentWillMount() {
    },
	render() {
		let value = this.state.value + "%";
		return (
			<div className="react-slider" onMouseDown={this.onSliderMouseDown} ref="sliderContainer">
				<div className="react-slider-track" style={{width: value}}></div>
				<span className="react-slider-tooltip-wrap">
					<div className="react-slider-handle" style={{left: value}} onMouseUp={this.onSliderUp}></div>
				</span>
			</div>
		);
	}
});

ReactDOM.render(
	<div>
		<Slider defaultValue={50} />
	</div>
  ,
  document.getElementById('example')
);
