import React, {PureComponent} from "react";
import {I18n, Trans} from "react-i18next";
import {NavLink, Link} from "react-router-dom";
import { indexRemFun, setLocalItem } from "../../utils/util";
import logo from "../../assets/images/21.png";

import img_9 from "../../assets/images/9.png";
import m_7 from "../../assets/images/m_7.png";
import m_6 from "../../assets/images/m_6.png";
import m_8 from "../../assets/images/m_8.png";
import m_3 from "../../assets/images/m_3.png";
import m_4 from "../../assets/images/m_4.png";
import m_5 from "../../assets/images/m_5.png";
import m_9 from "../../assets/images/m_9.png";
import m_10 from "../../assets/images/m_10.png";
import m_11 from "../../assets/images/m_11.png";
import m_12 from "../../assets/images/m_12.png";
import wechatQrcode from "../../assets/images/wechatQrcode.jpg";



import "./index.less";


export default class Menus extends PureComponent {
    constructor(props){
        super(props);
        this.state={
            headerIsShowMenu: false
        }
    }
    change(lng){
        setLocalItem("language",lng);
        window.i18n.changeLanguage(lng);
        if(IsTouchDevice){
            this.setState({
                headerIsShowMenu: false
            })
        }
    }
    openMenu(){
        this.setState({
            headerIsShowMenu: true
        })
    }
    closeMenu(){
        this.setState({
            headerIsShowMenu: false
        })
    }
    render(){
        const { lng } = this.props;
        const {headerIsShowMenu} = this.state
        return (
          <I18n>
              {(t, {i18n}) => (
                <div className="menu">
                    {IsTouchDevice ? (
                         <div className="touchDevHeader">
                            <div className="headerOnClose">
                                <div className="logoBox">
                                    <div className="pic">
                                        <img src={img_9} alt=""/>
                                    </div>
                                    <div className="name">Trinity</div>
                                </div>
                                <div className="menuIco" onClick={this.openMenu.bind(this)}>
                                    <img src={m_8} alt=""/>
                                </div>
                            </div>
                            <div className={headerIsShowMenu ? "headerOnOpen open" : "headerOnOpen"}>
                                <div className="openLogoCont">
                                    <div className="logoBox">
                                        <div className="pic">
                                            <img src={m_7} alt=""/>
                                        </div>
                                        <div className="name">Trinity</div>
                                    </div>
                                    <div className="menuIco" onClick={this.closeMenu.bind(this)}>
                                        <img src={m_6} alt=""/>
                                    </div>
                                </div>
                                <ul className="menuList">
                                    <Link to="/">
                                        <li>{t('menus.txt1',lng)}</li>
                                    </Link>
                                    <Link to="/about">
                                        <li>{t('menus.txt2',lng)}</li>
                                    </Link>
                                    <li onClick={this.change.bind(this,"en")}>English</li>
                                    <li onClick={this.change.bind(this,"zh")}>中文</li>
                                </ul>
                                <div className="qrcodeWx">
                                    <img src={wechatQrcode} alt=""/>
                                </div>
                                <ul className="shareList">
                                    <li><a href="mailto:support@trinity.tech"><img src={m_4} alt=""/></a></li>
                                    <li><a href="https://t.me/TrinityStateChannels"><img src={m_3} alt=""/></a></li>
                                    <li><a href="https://twitter.com/TrinityProtocol"><img src={m_5} alt=""/></a></li>
                                    <li><a href="https://www.reddit.com/r/TrinityTNC/"><img src={m_10} alt=""/></a></li>
                                    <li><a href="https://medium.com/@TrinityProtocol"><img src={m_12} alt=""/></a></li>
                                    <li><a href="https://github.com/trinity-project"><img src={m_9} alt=""/></a></li>
                                    {/* <li><a href=""><img src={m_11} alt=""/></a></li> */}
                                </ul>
                                <div className="ying">©Trinity 2018</div>
                            </div>
                        </div>
                    ) : (
                        <ul className="menuPcUl">
                            <Link to="/">
                                <li>{t('menus.txt1',lng)}</li>
                            </Link>
                            <Link to="/about">
                                <li>{t('menus.txt2',lng)}</li>
                            </Link>
                            <li className="logo">
                                <img src={logo} alt="logo" />
                            </li>
                            <li className="rl end">
                                {t('menus.txt3',lng)}
                                <div className="sub-menu">
                                    <p onClick={this.change.bind(this,"en")}>English</p>
                                    <p onClick={this.change.bind(this,"zh")}>中文</p>
                                </div>
                            </li>
                            <li className="rl">{t('menus.txt4',lng)}</li>
                        </ul>
                    )}
                   
                </div>
              )}
          </I18n>
        );
    }
   
}
