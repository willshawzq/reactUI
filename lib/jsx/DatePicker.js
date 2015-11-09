let options = {
	splitStr: "-",
	months: ["1月", "2月", "3月", "4月" ,"5月", "6月", "7月", "8月", "9月", "10月" ,"11月", "12月"]
}
let DateUtil = ((options) => {
	let padWithZero = (val, len) => {
		while(val.length < len) {
			val = "0" + val;
		}
		return val;
	}
	return {
		clone(date) {
			return new Date(
				date.getFullYear(),
				date.getMonth(),
				date.getDate(),
				date.getHours(),
				date.getMinutes(),
				date.getSeconds(),
				date.getMilliseconds()
			);
		},
		toString(date) {
			return [
				date.getFullYear(),
				padWithZero((date.getMonth() + 1).toString(), 2),
				padWithZero(date.getDate().toString(), 2)
			].join(options.splitStr);
		},
		getDayOfMonthString(date) {
			return padWithZero(
				date.getDate().toString(), 2
			);
		},
		getMonthAndYearString(date) {
			return [
				options.months[date.getMonth()],
				date.getFullYear()
			].join(" ");
		},
		moveToDayOfWeek(date, dayOfWeek) {
			/*getDay:
			*SUN MON TUE WED THU FRI SAT
			*0   1   2   3   4   5   6
			**/
			while(date.getDay() !== dayOfWeek) {
				date.setDate(date.getDate() - 1);
			}
			return date;
		},
		isSameDay(first, second) {
			return first.getTime() === second.getTime();
		},
		isBefore(first, second) {
			return first.getTime() < second.getTime();
		},
		ifAfter(first, second) {
			return first.getTime() > second.getTime();
		}
	}
})(options);

let Weeks = React.createClass({
	getStartDateOfWeeks(view) {
		//set date to this month's first day
		view.setDate(1);
		//get the week that conatiners the first day
		view = DateUtil.moveToDayOfWeek(DateUtil.clone(view), 1);

		let current = DateUtil.clone(view);
		current.setDate(current.getDate() + 7);

		let starts = [view],
			month = current.getMonth();

		const ROW_LENGTH = 6;//the max length to container a month's day
		const WEEK_DAYS = 7;//a week has 7days

		while(starts.length < ROW_LENGTH) {
			starts.push(DateUtil.clone(current));
			current.setDate(current.getDate() + WEEK_DAYS);
		}
		return starts;
	},
	handleClick() {

	},
	renderWeeks(view) {
		let starts = this.getStartDateOfWeeks(view),
			month = starts[1].getMonth();

		return starts.map((start, i) => {
			return (
				<Week key={i} start={start} month={month} />
			);
		}.bind(this));
	},
	render() {
		return (
			<div className="weeks">{this.renderWeeks(this.props.start)}</div>
		);
	}
});

let Week = React.createClass({
	buildDays(start) {
		let clone = DateUtil.clone(start),
			days = [clone];
		for(let i = 1; i < 7; i++) {
			clone = DateUtil.clone(clone);
			clone.setDate(clone.getDate() + 1);
			days.push(clone);
		}
		return days;
	},
	getClassOfDays(date) {
		let clazz = ["day"];
		if(date.getMonth() !== this.props.month) {
			clazz.push("other-month");
		}else if(DateUtil.isSameDay(date, new Date()){
			clazz.push("today");
		}
		return clazz.join(" ");
	},
	handleClick(ev) {
		this.props.onClick(ev.target.value);
	},
	render() {
		let days = this.buildDays(this.props.start).map((day, i) => {
			return (
				<span key={i} className={this.getClassOfDays(day)} onClick={this.handleClick}>
					{DateUtil.getDayOfMonthString(day)}
				</span>
			);
		});
		return (
			<div className="week">{days}</div>
		);
	}
});

ReactDOM.render(
	<Weeks start={new Date("2015-12-09")} />
  ,
  document.getElementById('example')
);
