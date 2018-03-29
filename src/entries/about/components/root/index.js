import React, {PureComponent} from "react";
import {I18n, Trans} from "react-i18next";
import {NavLink, Link} from "react-router-dom";
import Slider from "react-slick";
import Menus from "../../../../components/menus/";
import Footer from "../../../../components/footer/";
import logo from "../../../../assets/images/21.png";
import email from "../../../../assets/images/email.png";
import telegram from "../../../../assets/images/telegram.png";
import twitter from "../../../../assets/images/Twitter.png";
import wechat from "../../../../assets/images/wechat.png";
import github from "../../../../assets/images/GitHub.png";
import medium from "../../../../assets/images/Medium.png";
import reddit from "../../../../assets/images/Reddit.png";
import wechatQrcode from "../../../../assets/images/wechatQrcode.jpg";

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
                  <Menus lng={lng}/>
                    {/*<div className="menu">
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
										</div>*/}
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
										{/*<div className="footer">
											<span>©Trinity 2018</span>
											<ul>
												<li className="wx">
													<img src={wechat} alt="wechat" />
													<img src={wechatQrcode} className="qrcode" alt="wechatQrcode" />
												</li>
												<li><a href="www.baidu.com"><img src={github} alt="github" /></a></li>
												<li><a href="www.baidu.com"><img src={medium} alt="medium" /></a></li>
												<li><a href="www.baidu.com"><img src={reddit} alt="reddit" /></a></li>
												<li><a href="www.baidu.com"><img src={twitter} alt="twitter" /></a></li>
												<li><a href="www.baidu.com"><img src={telegram} alt="share" /></a></li>
												<li><a href="www.baidu.com"><img src={email} alt="email" /></a></li>
											</ul>
										</div>*/}
										<Footer lng={lng} />
                  </div>
                )}
            </I18n>
        );
    }
}
