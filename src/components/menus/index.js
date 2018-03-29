import React, {PureComponent} from "react";
import {I18n, Trans} from "react-i18next";
import {NavLink, Link} from "react-router-dom";
import { indexRemFun, setLocalItem } from "../../utils/util";
import logo from "../../assets/images/21.png";
import "./index.less";
const change = (lng) => {
  setLocalItem("language",lng);
  window.i18n.changeLanguage(lng);
}

function Menus(props){
	const { lng } = props;
	return (
      <I18n>
          {(t, {i18n}) => (
            <div className="menu">
							<ul>
								<li>{t('menus.txt1',lng)}</li>
								<li>{t('menus.txt2',lng)}</li>
								<li className="logo">
									<img src={logo} alt="logo" />
								</li>
								<li className="rl end">
									{t('menus.txt3',lng)}
									<div className="sub-menu">
										<p onClick={change.bind(this,"en")}>English</p>
										<p onClick={change.bind(this,"zh")}>中文</p>
									</div>
								</li>
								<li className="rl">{t('menus.txt4',lng)}</li>
							</ul>
						</div>
          )}
      </I18n>
  );
}
export default Menus;
