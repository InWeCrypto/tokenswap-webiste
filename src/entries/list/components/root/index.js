import React, { PureComponent } from "react";
import { I18n, Trans } from "react-i18next";
import { NavLink, Link } from "react-router-dom";
import { Pagination } from 'antd';
import Slider from "react-slick";
import Menus from "../../../../components/menus/";
import Footer from "../../../../components/footer/";
import bglf from "../../../../assets/images/1.png";
import bgrt from "../../../../assets/images/6.png";
import m_1 from "../../../../assets/images/m_1.png";
import "./index.less";
import { indexRemFun, setLocalItem } from "../../../../utils/util";
import { locale } from "moment";



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
                            <div className="order-list">
                                <div className="title">{t('menus.txt5', lng)}</div>
                                <table className="list">
                                    <tbody>
                                        <tr className='row-head'>
                                            <td className="col">{t('orderList.status', lng)}</td>
                                            <td className="col">{t('orderList.Txid', lng)}</td>
                                            <td className="col">{t('orderList.Amount', lng)}</td>
                                            <td className="col">{t('orderList.Date', lng)}</td>
                                        </tr>
                                        <tr className='row'>
                                            <td className="col">{t('orderList.process', lng)}</td>
                                            <td className="col link second"><a className="line">123123123123</a></td>
                                            <td className="col third">2343.00000000 TNC<br/>(fees:2343 TNC)</td>
                                            <td className="col last">2018-03-20<br/>00:00:00</td>
                                        </tr>
                                        <tr className='row'>
                                            <td className="col">{t('orderList.process', lng)}</td>
                                            <td className="col link second"><a className="line">123123123123</a></td>
                                            <td className="col third">2343.00000000 TNC<br/>(fees:2343 TNC)</td>
                                            <td className="col last">2018-03-20<br/>00:00:00</td>
                                        </tr>
                                        <tr className='row'>
                                            <td className="col">{t('orderList.process', lng)}</td>
                                            <td className="col link second"><a className="line">123123123123</a></td>
                                            <td className="col third">2343.00000000 TNC<br/>(fees:2343 TNC)</td>
                                            <td className="col last">2018-03-20<br/>00:00:00</td>
                                        </tr>
                                        <tr className='row'>
                                            <td className="col">{t('orderList.process', lng)}</td>
                                            <td className="col link second"><a className="line">123123123123</a></td>
                                            <td className="col third">2343.00000000 TNC<br/>(fees:2343 TNC)</td>
                                            <td className="col last">2018-03-20<br/>00:00:00</td>
                                        </tr>
                                        <tr className='row'>
                                            <td className="col">{t('orderList.process', lng)}</td>
                                            <td className="col link second"><a className="line">123123123123</a></td>
                                            <td className="col third">2343.00000000 TNC<br/>(fees:2343 TNC)</td>
                                            <td className="col last">2018-03-20<br/>00:00:00</td>
                                        </tr>
                                        <tr className='row'>
                                            <td className="col">{t('orderList.process', lng)}</td>
                                            <td className="col link second"><a className="line">123123123123</a></td>
                                            <td className="col third">2343.00000000 TNC<br/>(fees:2343 TNC)</td>
                                            <td className="col last">2018-03-20<br/>00:00:00</td>
                                        </tr>
                                        <tr className='row'>
                                            <td className="col">{t('orderList.process', lng)}</td>
                                            <td className="col link second"><a className="line">123123123123</a></td>
                                            <td className="col third">2343.00000000 TNC<br/>(fees:2343 TNC)</td>
                                            <td className="col last">2018-03-20<br/>00:00:00</td>
                                        </tr>
                                    </tbody>
                                </table>
                                <div className="pagination">
                                   <Pagination size="small" total={16} pageSize={8}/>
                                </div>
                            </div>
                        </div>
                        <Footer lng={lng} />
                    </div>
                )}
            </I18n>
        );
    }
}
