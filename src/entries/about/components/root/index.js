import React, { PureComponent } from "react";
import { I18n, Trans } from "react-i18next";
import { NavLink, Link } from "react-router-dom";
import Slider from "react-slick";
import Menus from "../../../../components/menus/";
import Footer from "../../../../components/footer/";
import bglf from "../../../../assets/images/1.png";
import bgrt from "../../../../assets/images/6.png";

import m_1 from "../../../../assets/images/m_1.png";
import "./index.less";
import { indexRemFun, setLocalItem } from "../../../../utils/util";



export default class Root extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {

        };
    }
    componentWillMount() {
        const that = this;
        indexRemFun();
        window.addEventListener("resize", function () {
            indexRemFun();
        });
    }
    cnnn() {
        window.i18n.changeLanguage("zh");
        setLocalItem("language", "zh");
    }
    render() {
        let { lng } = this.props;
        // setLocalItem("language",lng);
        // this.props.changeLng(lng);
        return (
            <I18n>
                {(t, { i18n }) => (
                    <div className="page-about" id="e-aboutBox">
                        <Menus lng={lng} />
                        <div className="content">
                            {
                                IsTouchDevice ? (
                                    <div className="menu-bg_1">
                                        <img src={m_1} alt="" />
                                    </div>
                                ) : (
                                        <div className="menu-bg"></div>
                                    )
                            }
                            <div className="bg-lf m-hide"><img src={bglf} alt="" /></div>
                            <div className="bg-rt m-hide"><img src={bgrt} alt="" /></div>
                            <div className="ct">
                                <h1>{t('about.txt1', lng)}<br />{t('about.txt2', lng)}</h1>
                                <p>{t('about.txt3', lng)}</p>
                                <p>{t('about.txt4', lng)}</p>
                                <p>{t('about.txt5', lng)}</p>
                                <p>{t('about.txt6', lng)}</p>
                                <p>{t('about.txt7', lng)}</p>
                                <p>{t('about.txt8', lng)}</p>
                                <p>{t('about.txt9', lng)}</p>
                                <p>{t('about.txt10', lng)}</p>
                            </div>
                        </div>
                        <Footer lng={lng} />
                    </div>
                )}
            </I18n>
        );
    }
}
