'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var Affix = React.createClass({
	displayName: 'Affix',

	getDefaultProps: function getDefaultProps() {
		return {
			offset: 0
		};
	},
	getInitialState: function getInitialState() {
		return {
			affix: false,
			affixStyle: null
		};
	},
	getOffset: function getOffset(el) {
		var rect = el.getBoundingClientRect();
		var clientTop = el.clientTop || document.clientTop || 0;
		var clientLeft = el.clientLeft || document.clientLeft || 0;
		var scrollTop = window.pageYOffset;
		var scrollLeft = window.pageXOffset;

		return {
			top: rect.top + scrollTop - clientTop,
			left: rect.left + scrollLeft - clientLeft
		};
	},
	handleScroll: function handleScroll() {
		var affix = this.state.affix;
		var winScrollTop = window.pageYOffset;
		var eleOffset = this.getOffset(this.refs.reactAffix);

		if (affix) {
			if (eleOffset.top - this.props.offset > winScrollTop) {
				this.setState({
					affix: false,
					affixStyle: null
				});
			}
		} else {
			if (eleOffset.top - this.props.offset < winScrollTop) {
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
	componentDidMount: function componentDidMount() {
		window.addEventListener('scroll', this.handleScroll);
		window.addEventListener('resize', this.handleScroll);
	},
	componentWillUnmount: function componentWillUnmount() {
		window.removeEventListener('scroll', this.handleScroll);
		window.removeEventListener('resize', this.handleScroll);
	},
	render: function render() {
		return React.createElement(
			'div',
			_extends({ className: 'react-affix' }, this.props, { ref: 'reactAffix' }),
			React.createElement(
				'div',
				{ style: this.state.affixStyle },
				this.props.children
			)
		);
	}
});
ReactDOM.render(React.createElement(
	Affix,
	null,
	React.createElement(
		'button',
		null,
		'shaw'
	)
), document.getElementById('example'));
