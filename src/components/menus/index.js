import React, {PureComponent} from "react";
import {I18n, Trans} from "react-i18next";
import {NavLink, Link} from "react-router-dom";
import logo from "../../assets/images/21.png";
import "./index.less";
function Menus(props){
	const { lng } = props;
	return (
      <I18n>
          {(t, {i18n}) => (
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
          )}
      </I18n>
  );
}
export default Menus;
