import React, { PureComponent } from "react";
import { I18n, Trans } from "react-i18next";
import "./index.less";
class TopText extends PureComponent {
	constructor() {
		super();
		this.state = {
			text:
				"is the fastest, the most neutral, the clearest blockchain Information media.",
			txtArr: null,
			txtLength: 0,
			textIndex: 0,
			type: "up"
		};
	}
	componentDidMount() {
		this.splitText();
		this.animateText();
	}
	animateText() {
		if (this.state.textIndex >= this.state.txtLength) {
			this.setState({
				type: "down"
			});
		}
		if (this.state.textIndex <= 0) {
			this.setState({
				type: "up"
			});
		}
		if (this.state.type === "up") {
			this.setState({
				textIndex: this.state.textIndex + 1
			});
		} else {
			this.setState({
				textIndex: this.state.textIndex - 1
			});
		}

		setTimeout(() => {
			this.animateText();
		}, 300);
	}

	splitText() {
		let arr = this.state.text.split("");
		this.setState({
			txtArr: arr,
			txtLength: arr.length
		});
	}
	render() {
		const { txtArr, txtLength, textIndex } = this.state;
		return (
			<I18n>
				{(t, { i18n }) => (
					<div className="toptext-box">
						<span className="t1">InWeCrypto </span>
						{txtArr &&
							txtArr.length > 0 &&
							txtArr.map((item, index) => {
								if (index >= textIndex) {
									return null;
								}
								return (
									<i key={index} className="t2">
										{item}
									</i>
								);
							})}
						<span className="text-end">|</span>
					</div>
				)}
			</I18n>
		);
	}
}
export default TopText;
