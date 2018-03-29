import React, {PureComponent} from "react";
import {I18n, Trans} from "react-i18next";
import {NavLink, Link} from "react-router-dom";
import Slider from "react-slick";
import logo from "../../../../assets/images/21.png";
import email from "../../../../assets/images/4.png";
import share from "../../../../assets/images/3.png";
import twitter from "../../../../assets/images/5.png";
import bglf from "../../../../assets/images/1.png";
import bgrt from "../../../../assets/images/6.png";
import "./index.less";
import { indexRemFun } from "../../../../utils/util";

export default class Root extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
        	
        };
    }
    componentWillMount(){
        const that = this;
        indexRemFun();
        window.addEventListener("resize",function() {
            indexRemFun();
        });
    }
    render() {
        const { lng } = this.props;

        return (
            <I18n>
                {(t, {i18n}) => (
                  <div className="page-about" id="e-aboutBox">
                    <div className="menu">
											<ul>
												<li>Home</li>
												<li>About</li>
												<li className="logo">
													<img src={logo} alt="logo" />
												</li>
												<li className="rl end">
													Language
													<div className="sub-menu">
														<p>English</p>
														<p>中文</p>
													</div>
												</li>
												<li className="rl">Contact</li>
											</ul>
										</div>
										<div className="content">
											<div className="bg-lf"><img src={bglf} alt="" /></div>
											<div className="bg-rt"><img src={bgrt} alt="" /></div>
											<div className="ct">
												<h1>Trinity is an offchain<br /> scaling scheme for Neo</h1>
												<p>As an off-chain scaling solution for blockchain using the state channels technology,</p>
												<p>Trinity aims to achieve quick off-chain transfer of contract assets, </p>
												<p>privacy preservation and high concurrency processing of DApp. </p>
												<p>According to the current roadmap, </p>
												<p>Trinity will realize high throughput and low cost transfer of NEO utxo and NEP-5 contract assets.</p>
												<p>Together with the NEO on-chain scaling solution, </p>
												<p>Trinity will provide all-round support for DApp in the NEO ecosystem. In the future, </p>
												<p>Trinity also plans to support other blockchain projects in order to become a fully autonomous decentralized performance-enhancing network for the entire community.</p>
											</div>
										</div>
										<div className="footer">
											<span>©Trinity 2018</span>
											<ul>
												<li className="end"><a><img src={twitter} alt="twitter" /></a></li>
												<li><a><img src={share} alt="share" /></a></li>
												<li><a><img src={email} alt="email" /></a></li>
											</ul>
										</div>
                  </div>
                )}
            </I18n>
        );
    }
}
