import React, { PureComponent } from "react";
import { I18n, Trans } from "react-i18next";
import { NavLink, Link } from "react-router-dom";
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
    constructor(props) {
        super(props);
        this.state = {
            headerIsShowMenu: false
        }
    }
    componentDidMount() {

    }
    change(lng) {
        setLocalItem("language", lng);
        window.i18n.changeLanguage(lng);
        if (IsTouchDevice) {
            this.setState({
                headerIsShowMenu: false
            })
        }
    }
    openMenu() {
        this.setState({
            headerIsShowMenu: true
        })
    }
    closeMenu() {

        this.setState({
            headerIsShowMenu: false
        })
    }
    showQrcodeWx(e) {
        e.stopPropagation();
        this.setState({
            isShowQrcodeWx: true
        })
        e.nativeEvent.stopImmediatePropagation();

    }
    clickQrcode(e) {
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
    }
    clickMenuAnyWhere() {
        this.setState({
            isShowQrcodeWx: false
        })
    }
    render() {
        const { lng } = this.props;
        const { headerIsShowMenu, isShowQrcodeWx } = this.state
        return (
            <I18n>
                {(t, { i18n }) => (
                    <div className="menu" onClick={this.clickMenuAnyWhere.bind(this)}>
                        {IsTouchDevice ? (
                            <div className="touchDevHeader">
                                <div className="headerOnClose">
                                    <div className="logoBox">
                                        <div className="pic">
                                            <img src={img_9} alt="" />
                                        </div>
                                        <div className="name">Trinity</div>
                                    </div>
                                    <div className="menuIco" onClick={this.openMenu.bind(this)}>
                                        <img src={m_8} alt="" />
                                    </div>
                                </div>
                                <div className={headerIsShowMenu ? "headerOnOpen open" : "headerOnOpen"}>
                                    <div className="openLogoCont">
                                        <div className="logoBox">
                                            <div className="pic">
                                                <img src={m_7} alt="" />
                                            </div>
                                            <div className="name">Trinity</div>
                                        </div>
                                        <div className="menuIco" onClick={this.closeMenu.bind(this)}>
                                            <img src={m_6} alt="" />
                                        </div>
                                    </div>
                                    <ul className="menuList">
                                        <li>
                                            <Link to="/">{t('menus.txt1', lng)}</Link>
                                        </li>
                                        <li>
                                            <Link to="/about">{t('menus.txt2', lng)}</Link>
                                        </li>
                                        <li>
                                            <Link to="/list">{t('menus.txt5', lng)}</Link>
                                        </li>
                                        <li onClick={this.change.bind(this, "en")}><a>English</a></li>
                                        <li onClick={this.change.bind(this, "zh")}><a>中文</a></li>
                                    </ul>
                                    {
                                        isShowQrcodeWx && (
                                            <div className="qrcodeWx" onClick={this.clickQrcode.bind(this)}>
                                                <img src={wechatQrcode} alt="" />
                                            </div>
                                        )
                                    }
                                    <ul className="shareList">
                                        <li><a href="mailto:support@trinity.tech"><img src={m_4} alt="" /></a></li>
                                        <li><a href="https://t.me/TrinityStateChannels"><img src={m_3} alt="" /></a></li>
                                        <li><a href="https://twitter.com/TrinityProtocol"><img src={m_5} alt="" /></a></li>
                                        <li onClick={this.showQrcodeWx.bind(this)}><img src={m_11} alt="" /></li>
                                        <li><a href="https://www.reddit.com/r/TrinityTNC/"><img src={m_10} alt="" /></a></li>
                                        <li><a href="https://medium.com/@TrinityProtocol"><img src={m_12} alt="" /></a></li>
                                        <li><a href="https://github.com/trinity-project"><img src={m_9} alt="" /></a></li>
                                    </ul>
                                    <div className="ying">©Trinity 2018</div>
                                </div>
                            </div>
                        ) : (
                                <div className="menu-box clearfix">
                                    <div className="menu-left">
                                        <ul className="menuPcUl">
                                            <li className="p2">
                                                <Link to="/about">{t('menus.txt2', lng)}</Link>
                                            </li>
                                            <li className="p1">
                                                <Link to="/">{t('menus.txt1', lng)}</Link>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="menu-right">
                                        <ul className="menuPcUl">
                                            <li className="p4">
                                                <Link to="/list">{t('menus.txt5', lng)}</Link>
                                            </li>
                                            <li className="p5" onClick={this.change.bind(this, "en")}>
                                                <a>{t('menus.txt3', lng)}</a>
                                            </li>
                                            <li className="p6" onClick={this.change.bind(this, "zh")}>
                                                <a>{t('menus.txt4', lng)}</a>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="logo">
                                        <Link to="/">
                                            <img src={logo} alt="logo" />
                                        </Link>
                                    </div>
                                </div>
                            )
                        }
                    </div>
                )}
            </I18n>
        );
    }

}
