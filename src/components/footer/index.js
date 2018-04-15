import React, {PureComponent} from "react";
import {I18n, Trans} from "react-i18next";
import {NavLink, Link} from "react-router-dom";
import email from "../../assets/images/email.png";
import telegram from "../../assets/images/telegram.png";
import twitter from "../../assets/images/Twitter.png";
import wechat from "../../assets/images/wechat.png";
import github from "../../assets/images/GitHub.png";
import medium from "../../assets/images/Medium.png";
import reddit from "../../assets/images/Reddit.png";
import wechatQrcode from "../../assets/images/wechatQrcode.jpg";
import "./index.less";

function Footer(props){
	const { lng } = props;
	return (
      <I18n>
          {(t, {i18n}) => (
            <div className="footer clearfix">
				<span className="textInTouchDevice">©Trinity 2018</span>
                {
                    !IsTouchDevice && (
                        <ul>
                            <li className="wx">
                                <img src={wechat} alt="wechat" />
                                <img src={wechatQrcode} className="qrcode" alt="wechatQrcode" />
                            </li>
                            <li><a href="https://github.com/trinity-project"><img src={github} alt="github" /></a></li>
                            <li><a href="https://medium.com/@TrinityProtocol"><img src={medium} alt="medium" /></a></li>
                            <li><a href="https://www.reddit.com/r/TrinityTNC/"><img src={reddit} alt="reddit" /></a></li>
                            <li><a href="https://twitter.com/TrinityProtocol"><img src={twitter} alt="twitter" /></a></li>
                            <li><a href="https://t.me/TrinityStateChannels"><img src={telegram} alt="share" /></a></li>
                            <li><a href="mailto:support@trinity.tech"><img src={email} alt="email" /></a></li>
						</ul>
                    )
                }
			</div>
          )}
      </I18n>
  );
}
export default Footer;
