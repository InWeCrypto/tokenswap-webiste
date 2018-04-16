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
import { indexRemFun, translateStr } from "../../../../utils/util";
import { locale } from "moment";



export default class Root extends PureComponent {
    constructor(props) {
        super(props);
        this.state = this.sliceArray();
    }
    componentWillReceiveProps(nextProps, nextState) {
    }
    componentWillMount() {
        const that = this;
        indexRemFun();
        window.addEventListener("resize", function () {
            indexRemFun();
        });
    }
    sliceArray(page) {
        let newList = [];
        page = page ? page : 1;
        let list = window.localStorage.getItem('Inwe_OrderList') ? JSON.parse(window.localStorage.getItem('Inwe_OrderList')) : [];
        let result = [];
        const size = 2;
        for (var x = 0; x < Math.ceil(list.length / size); x++) {
            var start = x * size;
            var end = start + size;
            result.push(list.slice(start, end));
        }
        newList = result[page - 1] && result[page -1 ].length ? result[page - 1 ] : [];
        return {
            list: newList,
            result,
            page,
            total: list.length
        };
    }
    hashChange(orderId) {
        const { list } = this.state;
        clearInterval(this.timer);
        const { address, amount, from, to, rate } = list.find(item => item.name === orderId);
        window.sessionStorage.setItem('inwe_order_TX', orderId);
        window.sessionStorage.setItem('inwe_order_hash', 'step2');
        window.sessionStorage.setItem('inwe_order_Address', address);
        window.sessionStorage.setItem('inwe_order_Value', amount);
        window.sessionStorage.setItem("inwe_order_neoAddress", from);
        window.sessionStorage.setItem("inwe_order_ethAddress", to);
        window.sessionStorage.setItem("inwe_order_rate", rate);
        window.sessionStorage.setItem("isClick", true);
    }

    cnnn() {
        window.i18n.changeLanguage("zh");
        setLocalItem("language", "zh");
    }
    handleChange(page, size) {
        const { result } = this.state;
        this.setState({
            list: result[page-1],
            page
        });
    }
    getOrderDetail() {
        const _this = this;
        const { list, page } = this.state;
        if(list.length === 0) return;
        if (this.timer) {
            clearInterval(this.timer);
        }
        //循环使用状态
        this.timer = setInterval(() => {
            const i = window.orderList.updateStatus();
            if (i === list.length) {
                clearInterval(this.timer);
                this.setState({
                    ..._this.sliceArray(page)
                })
            }
        }, 5000);
    }
    componentDidMount() {
        this.getOrderDetail();
    }
    render() {
        let { lng } = this.props;
        const { list, total, page } = this.state;
        console.log(this.state);
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
                                            <td className="col" >{t('orderList.Txid', lng)}</td>
                                            <td className="col">{t('orderList.Amount', lng)}</td>
                                            <td className="col">{t('orderList.Date', lng)}</td>
                                        </tr>
                                        {
                                            list.length > 0 ? list.map((item, index) => {
                                                return (
                                                    <tr className='row' key={index}>
                                                        <td className="col" key={`${index}_0`}>{item.status === '进行中' ? t('orderList.pending', lng) : t('orderList.success', lng)}</td>
                                                        <td className="col link second" key={`${index}_1`}>
                                                            <Link to="/" className='line' onClick={() => this.hashChange(item.name)}>{translateStr(item.name)}</Link>
                                                        </td>
                                                        <td className="col third" key={`${index}_2`}>{`${item.amount} TNC`} <br />{`(fees:${Math.round(parseFloat(item.amount * item.rate) * 10000) / 10000} TNC)`}</td>
                                                        <td className="col last" key={`${index}_3`}>
                                                            {
                                                                item.time && item.time.split('T')[0] && item.time.split('T')[0]
                                                            }<br/>
                                                            {
                                                                item.time && item.time.split('T')[1] && item.time.split('T')[1].replace('Z', '')
                                                            }
                                                        </td>
                                                    </tr>
                                                )
                                            }) : <tr className='row' style={{ textAlign: 'center' }}>
                                                    <td colSpan={'4'}>{t('orderList.result', lng)}</td>
                                                </tr>
                                        }
                                    </tbody>
                                </table>
                                <div className="pagination">
                                    <Pagination size="small" total={total} pageSize={2} onChange={(page, size) => this.handleChange(page, size)} current={page} />
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
