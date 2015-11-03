const Affix = React.createClass({
	getDefaultProps() {
		return {
			offset: 0
		};
	},
	getInitialState() {
		return {
			affix: false,
			affixStyle: null
		}
	},
    getOffset(el) {
    	let [rect, clientTop, clientLeft, scrollTop, scrollLeft] = [
    		el.getBoundingClientRect(),
    		el.clientTop || document.clientTop || 0,
    		el.clientLeft || document.clientLeft || 0,
    		window.pageYOffset,
    		window.pageXOffset
    	];
    	return {
    		top: rect.top + scrollTop - clientTop,
    		left: rect.left + scrollLeft -clientLeft
    	}
    },
	handleScroll() {
		let [affix, winScrollTop, eleOffset] = [
			this.state.affix,
			window.pageYOffset,
			this.getOffset(this.refs.reactAffix)
		];
		if(affix) {
			if(eleOffset.top - this.props.offset > winScrollTop) {
				this.setState({
					affix: false,
					affixStyle: null
				});
			}
		}else {
			if(eleOffset.top - this.props.offset < winScrollTop) {
				this.setState({
					affix: true,
					affixStyle: {
						position: "fixed",
						top: this.props.offset,
						left: eleOffset.left,
						width: this.refs.reactAffix.offsetWidth
					}
				});
			}
		}
	},
	componentDidMount(){
		window.addEventListener('scroll', this.handleScroll);
		window.addEventListener('resize', this.handleScroll);
	},
	componentWillUnmount() {
		window.removeEventListener('scroll', this.handleScroll);
		window.removeEventListener('resize', this.handleScroll);
	},
	render() {
		return (
			<div className="react-affix" {...this.props} ref="reactAffix">
				<div style={this.state.affixStyle}>
					{this.props.children}
				</div>
			</div>
		);
	}
});
ReactDOM.render(
		<Affix>
			<button>shaw</button>
		</Affix>
  ,
  document.getElementById('example')
);
