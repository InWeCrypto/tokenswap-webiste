import React, { PureComponent } from "react";
import { I18n, Trans } from "react-i18next";
import { NavLink, Link } from "react-router-dom";
import Slider from "react-slick";

import QRCode from "../../../../assets/js/qcode.js";

import { getMainMinHeight, getQuery, indexRemFun, setLocalItem, addClass, hasClass, removeClass, toPosition, getLocalItem, remFun } from "../../../../utils/util";

import bg from "../../../../assets/images/bg.png";
import back_ico from "../../../../assets/images/back_ico.png";
import close_ico from "../../../../assets/images/close_ico.png";
import jiantou from "../../../../assets/images/jiantou.png";
import no_ico from "../../../../assets/images/no_ico.png";
import tnc_logo from "../../../../assets/images/tnc_logo.png";
import xiala from "../../../../assets/images/xiala.png";
import yes_ico from "../../../../assets/images/yes_ico.png";
import yuan from "../../../../assets/images/yuan.png";
import trinitylogo from "../../../../assets/images/trinitylogo.png";

import img_1 from "../../../../assets/images/1.png";
import img_2 from "../../../../assets/images/2.png";
import img_3 from "../../../../assets/images/3.png";
import img_4 from "../../../../assets/images/4.png";
import img_5 from "../../../../assets/images/5.png";
import img_6 from "../../../../assets/images/6.png";
import img_7 from "../../../../assets/images/7.png";
import img_8 from "../../../../assets/images/m_2.png";

import img_9 from "../../../../assets/images/9.png";
import img_10 from "../../../../assets/images/10.png";
import img_11 from "../../../../assets/images/11.png";
import pc_12 from "../../../../assets/images/pc-12.jpg";
import m_12 from "../../../../assets/images/m-12.jpg";
import img_13 from "../../../../assets/images/13.png";
import img_14 from "../../../../assets/images/14.png";
import img_15 from "../../../../assets/images/15.png";
import img_16 from "../../../../assets/images/16.png";
import img_17 from "../../../../assets/images/17.png";
import img_18 from "../../../../assets/images/18.png";
import img_19 from "../../../../assets/images/19.png";
import img_21 from "../../../../assets/images/21.png";
import img_22 from "../../../../assets/images/22.png";
import img_23 from "../../../../assets/images/23.png";
import img_24 from "../../../../assets/images/24.png";
import img_20 from "../../../../assets/images/20.png";
import m_beijing from "../../../../assets/images/m_beijing.png";

import "./index.less";
import Menus from "../../../../components/menus";
import Footer from "../../../../components/footer";

// import { setInterval, clearInterval, setTimeout } from "timers";
const initialObj = {
    isNeo2Eth: true,
    step: 3,
    tncBackNum: 0,
    stateArr: [],
    sendable: false,
    isOnlyOrder: false,
    neoAmount: '',
    ethAddress: '',
    neoAddress: '',
    isAllDone: false,
    tx: '',
    limitAmount: '',
    eth2neotax: '',
    neo2ethtax: '',
    isClick: false
};
export default class Root extends PureComponent {
    constructor(props) {
        super(props);
        this.state = { ...initialObj };
    }
    componentWillReceiveProps(nextProps) {

    }
    componentWillMount() {
        const that = this;
        indexRemFun();
        window.addEventListener("resize", function () {
            indexRemFun();
        });
    }
    componentDidMount() {
        const that = this;
        // let hash = this.props.location.hash;
        let hash = window.sessionStorage.getItem("inwe_order_hash");
        if (hash) {
            //hash = hash.substring(1);
            let tx = window.sessionStorage.getItem("inwe_order_TX");
            let tncBackNum = window.sessionStorage.getItem("inwe_order_Value");
            let address = window.sessionStorage.getItem("inwe_order_Address");
            let neoAddress = window.sessionStorage.getItem("inwe_order_neoAddress");
            let ethAddress = window.sessionStorage.getItem("inwe_order_ethAddress");

            this.setState({
                tx,
                tncBackNum,
                address,
                neoAddress,
                ethAddress
            });
            if (hash === "step") {
                this.setState({
                    step: 1
                }, function () {
                    if (address) {
                        //设置初始化二维码
                        let dom = document.getElementById('qrcode');
                        if (dom) {
                            dom.innerHTML = '';
                            new QRCode(dom, address);
                        }
                        that.getOrderDetail();
                    }
                });
            } else if (hash === "step2") {
                this.setState({
                    step: 2
                }, function () {
                    //开启状态监控
                    this.getOrderState();
                })
            } else {
                this.setState({
                    step: 0
                })
            }
        }
        //滚动动画
        this.pageScrollMover();
        // setTimeout(() => {
        //     that.pageScrollFun();
        // },1000)


    }

    //盒子滚动到最底部
    scrollBoxToBottom() {
        var e = document.getElementById("scroll");
        e.scrollTop = e.scrollHeight;
    }
    pageScrollMover() {
        const pageBox = document.getElementById("e-hugeBox");
        parent.addEventListener("scroll", this.pageScrollFun)
    }
    pageScrollFun() {
        var showBoxList = document.getElementsByClassName("showFlowBox");
        var winHei = document.documentElement.clientHeight;
        for (var i = 0; i < showBoxList.length; i++) {
            var boxDom = showBoxList[i];
            if (boxDom.getBoundingClientRect().top < winHei - 100) {
                addClass(boxDom, "showTogger")
            } else if (boxDom.getBoundingClientRect().top > winHei - 100) {
                removeClass(boxDom, "showTogger")
            }
        }
    }
    changeLanguage(type) {
        this.props.changeLng(type);
        window.i18n.changeLanguage(type);
        setLocalItem("language", type);
    }
    icoExchange() {
        //暂时只有NEO转ETH
        // return;
        this.setState({
            isNeo2Eth: !this.state.isNeo2Eth
        })
    }
    getNeoAddress(e) {
        const that = this;
        let val = e.target.value;
        this.setState({
            neoAddress: val
        }, function () {
            that.checkDetailsBtnDone()
        })
    }
    getEthAddress(e) {
        const that = this;
        let val = e.target.value;
        this.setState({
            ethAddress: val
        }, function () {
            that.checkDetailsBtnDone()
        })
    }
    getNeoAmount(e) {
        const that = this;
        let val = e.target.value;
        this.setState({
            neoAmount: val
        }, function () {
            that.checkDetailsBtnDone()
        })
    }
    checkDetailsBtnDone() {
        let { neoAmount, ethAddress, neoAddress } = this.state;
        if (neoAmount && ethAddress && neoAddress) {
            this.setState({
                detailsDone: true
            })
        } else {
            this.setState({
                detailsDone: false
            })
        }
    }
    toStart() {
        this.props.getTradeInfo().then( (res) => {
            const { limitAmount, eth2neotax, neo2ethtax} = res.Data;
            this.setState({
                step: 0,
                limitAmount,
                eth2neotax,
                neo2ethtax
            })
        })
    };
    toNextStep() {
        const that = this;
        let { neoAddress, ethAddress, neoAmount } = this.state;
        let param = {
            from: neoAddress,
            to: ethAddress,
            value: neoAmount
        };
        if (neoAddress && ethAddress && neoAmount) {
            this.setState({
                errMes: false
            })
            //创建订单
            this.props.postOrder(param).then(res => {
                let errMsg = null;
                if (res.Error) errMsg = res.Error;
                this.setState({
                    errMes: errMsg
                })
                res = res.Data;
                //window.location.hash = "step";
                window.sessionStorage.setItem("inwe_order_hash", "step");
                let valShort;
                let valArr = res.Value.split(".");
                if (valArr[1].substring(4) == "0000") {
                    // valShort = valArr[0] + "." + valArr[1].substring(0,4) 
                    valShort = res.Value;
                } else {
                    valShort = res.Value;
                }
                //信息保存至本地
                window.sessionStorage.setItem("inwe_order_Value", valShort);
                window.sessionStorage.setItem("inwe_order_TX", res.TX);
                window.sessionStorage.setItem("inwe_order_Address", res.Address);
                window.sessionStorage.setItem("inwe_order_neoAddress", neoAddress);
                window.sessionStorage.setItem("inwe_order_ethAddress", ethAddress);
                this.setState({
                    step: 1,
                    tncBackNum: valShort,
                    tx: res.TX,
                    address: res.Address,
                    isClick: true
                }, function () {
                    //设置初始化二维码
                    let dom = document.getElementById('qrcode');
                    if (dom) {
                        dom.innerHTML = '';
                        new QRCode(dom, res.Address);
                    }
                    that.getOrderDetail();
                });

            })
        } else {
            this.setState({
                errMes: true
            })
        }
    }
    toSend() {
        this.setState({
            step: 2,
            isClick : true 
        });
        window.sessionStorage.setItem("inwe_order_hash", "step2");
        this.getOrderState();
        this.getOrderDetail();
    }
    //获取订单详情  判断是否扫描二维码
    getOrderDetail() {
        const that = this;
        let tx = this.state.tx;
        if (!tx) return;
        if (this.timerDetail) {
            clearInterval(this.timerDetail);
        }
        //循环使用状态
        this.timerDetail = setInterval(() => {
            //获取订单详情，判断是否完成OutTx
            this.props.getOrder(tx).then(res => {
                if (res.Data.InTx) {
                    this.setState({
                        sendable: true
                    }, function () {
                        // that.toSend();
                    });
                }
                if (res.Data.OutTx) {
                    this.setState({
                        isAllDone: true
                    })
                    clearInterval(this.timerDetail);
                }
            })
        }, 3000);
    }
    //获取订单处理状态
    getOrderState() {
        const that = this;
        let tx = this.state.tx;
        if (!tx) return;
        if (this.timerState) {
            clearInterval(this.timerState);
        }
        //获取状态列表
        this.props.getOrderState(tx).then(res => {
            let stateArr = [];
            const data = res.Data;
            stateArr = [...data];
            this.setState({
                stateArr: stateArr
            }, function () {
                that.scrollBoxToBottom();
            });
        });
        //循环使用状态
        this.timerState = setInterval(() => {
            //获取状态列表
            this.props.getOrderState(tx).then(res => {
                let stateArr = [];
                const data = res.Data;
                stateArr = [...data];
                this.setState({
                    stateArr: stateArr
                }, function () {
                    that.scrollBoxToBottom();
                });
            });
            //获取订单详情，判断是否完成OutTx
            this.props.getOrder(tx).then(res => {
                if (res.Data.OutTx) {
                    this.setState({
                        isAllDone: true
                    })
                    clearInterval(this.timerState);
                }
            })
        }, 5000);
    }
    back2first() {
        //window.location.hash = ""
        const { sendable, isClick } = this.state;
        // if(!sendable && !isClick) {
        window.sessionStorage.setItem("inwe_order_hash", "");
        this.setState({
            step: 0
        })
        // }
    }
    back2Second() {
        // window.location.hash = "step"
        window.sessionStorage.setItem("inwe_order_hash", "step");
        let address = window.sessionStorage.getItem("inwe_order_Address");
        if (address) {
            //设置初始化二维码
            let dom = document.getElementById('qrcode');
            if (dom) {
                dom.innerHTML = '';
                new QRCode(dom, address);
            }
        }
        this.setState({
            step: 1
        });

        this.getOrderState();
        this.getOrderDetail();
    }
    allDone() {
        const { stateArr } = this.state;
        if(stateArr.length === 2) {
            window.sessionStorage.setItem("inwe_order_hash", "");
            this.setState({
                ...Object.assign({ isOnlyOrder: true }, { ...initialObj })
            });
            window.location.reload();
        }
        // this.props.getOrder(tx).then(res => {
        //     if(res.Data.InTx && res.Data.OutTx){
        //         window.sessionStorage.setItem("inwe_order_hash", "");
        //         this.setState({
        //            ...Object.assign({ isOnlyOrder: true }, { ...initialObj })
        //         });
        //         //开启状态监控
        //         // this.getOrderState();
        //     }
        // });
    }
    sendAddFoucs() {
        this.setState({
            isSendAddFoucsed: true,
            isSendAddFoucsedLine: true
        })
    }
    sendAddBlur() {
        this.setState({
            isSendAddFoucsedLine: false
        })
    }
    amountFoucs() {
        this.setState({
            isAmountFoucs: true,
            isAmountFoucsLine: true
        })
    }
    amountBlur() {
        this.setState({
            isAmountFoucsLine: false
        })
    }
    receiveAddFoucs() {
        this.setState({
            isReceiveAddFoucs: true,
            isReceiveAddFoucsLine: true
        })
    }
    receiveAddBlur() {
        this.setState({
            isReceiveAddFoucsLine: false
        })
    }

    render() {
        console.log(this.state, '-------')
        const { lng, changeLng, registerUser, userInfo } = this.props;
        const { 
            isSendAddFoucsedLine, 
            isAmountFoucsLine, 
            isReceiveAddFoucsLine, 
            isReceiveAddFoucs, 
            isAmountFoucs, 
            isSendAddFoucsed, 
            isNeo2Eth, 
            step, 
            tncBackNum, 
            fromKeyWord, 
            toKeyWord, 
            neoAddress, 
            ethAddress, 
            errMes, 
            stateArr, 
            isAllDone, 
            detailsDone, 
            depositDone, 
            address, 
            isOnlyOrder, 
            sendable,
            limitAmount,
            eth2neotax,
            neo2ethtax,
            isClick
        } = this.state;
        let isEnAndTouch = ((window.i18n.language == "en") && IsTouchDevice);
        let isCnAndTouch = ((window.i18n.language == "zh") && IsTouchDevice);
        return (
            <I18n>
                {(t, { i18n }) => (
                    <div className="container m-container e-hugeBox" id="e-indexBox">
                        <Menus lng={lng} changeLng={this.props.changeLng.bind(this)} />
                        {
                            !IsTouchDevice ? (
                                <div>
                                    <div className="bg_1">
                                        <img src={img_20} alt="" />
                                    </div>
                                    <div className="bg_2">
                                        <img src={img_24} alt="" />
                                    </div>
                                    <div className="bg_3">
                                        <img src={img_23} alt="" />
                                    </div>
                                    <div className="bg_4">
                                        <img src={img_18} alt="" />
                                    </div>
                                    <div className="bg_5">
                                        <img src={img_19} alt="" />
                                    </div>
                                    <div className="bg_6">
                                        <img src={img_17} alt="" />
                                    </div>
                                </div>
                            ) : (
                                    <div className="m_bg">
                                        <img src={m_beijing} alt="" />
                                    </div>
                                )
                        }

                        <div className="contentAndBg">
                            {/* 背景联动 trinity text */}
                            {
                                !IsTouchDevice && (
                                    <div className="bg_7">
                                        <img src={img_22} alt="" />
                                    </div>
                                )
                            }
                            <div className={isCnAndTouch ? "bg_8 cn" : "bg_8"}>
                                {t('home.txt1', lng)}
                            </div>
                            {/* content */}
                            <div className={
                                "contentBox boxStyle" + step
                            }>
                                <div className={step == 3 ? "startBox " : "startBox Hide"}>
                                    <div className="detailBoxContainer">
                                        {/* <div className="close">
                                            <img src={close_ico} alt=""/>
                                        </div> */}
                                        <h1>{t('home.txt2', lng)}</h1>
                                        {
                                            isNeo2Eth ? (
                                                <div className="transferBox">
                                                    <div className="transferCell">
                                                        <div className="name">{t('home.txt3', lng)}</div>
                                                        <div className="pic">
                                                            <img src={img_11} alt="" />
                                                        </div>
                                                        <div className="icoName">NEO</div>
                                                    </div>
                                                    <div className="transferIco" onClick={this.icoExchange.bind(this)}>
                                                        <img src={img_16} alt="" />
                                                    </div>
                                                    <div className="transferCell">
                                                        <div className="name">{t('home.txt4', lng)}</div>
                                                        <div className="pic">
                                                            {
                                                                IsTouchDevice ? <img src={pc_12} alt="" /> : <img src={m_12} alt="" />
                                                            }
                                                        </div>
                                                        <div className="icoName">ETH</div>
                                                    </div>
                                                </div>
                                            ) : (
                                                    <div className="transferBox">
                                                        <div className="transferCell">
                                                            <div className="name">{t('home.txt3', lng)}</div>
                                                            <div className="pic">
                                                                {
                                                                    IsTouchDevice ? <img src={pc_12} alt="" /> : <img src={m_12} alt="" />
                                                                }
                                                            </div>
                                                            <div className="icoName">ETH</div>
                                                        </div>
                                                        <div className="transferIco" onClick={this.icoExchange.bind(this)}>
                                                            <img src={img_16} alt="" />
                                                        </div>
                                                        <div className="transferCell">
                                                            <div className="name">{t('home.txt4', lng)}</div>
                                                            <div className="pic">
                                                                <img src={img_11} alt="" />
                                                            </div>
                                                            <div className="icoName">NEO</div>
                                                        </div>
                                                    </div>
                                                )
                                        }

                                    </div>
                                    {
                                        errMes && <div className="errMess"></div>
                                    }
                                    <button className="step" onClick={this.toStart.bind(this)}>{t('home.txt5', lng)}</button>
                                </div>
                                {/* 生成订单 */}
                                <div className={step == 0 ? "detailBox " : "detailBox Hide"}>
                                    <div className="detailBoxContainer">
                                        {/* <div className="close">
                                            <img src={close_ico} alt=""/>
                                        </div> */}
                                        <h1>{t('home.txt6', lng)}</h1>
                                        <div className="selectBox">
                                            <div className="text">{t('home.txt2', lng)}：</div>
                                            {
                                                isNeo2Eth ? (
                                                    <div className="selectContent" onClick={this.icoExchange.bind(this)}>
                                                        <div className="ico1">TNC(NEO)</div>
                                                        <div className="toImg">
                                                            <img src={img_8} alt="" />
                                                        </div>
                                                        <div className="ico2">TNC(ETH)</div>
                                                        {/*<div className="downicon">
                                                            <img src={xiala} alt=""/>
                                                        </div>
                                                        <div className="selectorContainer">
                                                            <div className="selector">
                                                                <p>ETH</p>
                                                                <p>BTC</p>
                                                                <p>ETH</p>
                                                            </div>
                                                        </div> */}
                                                    </div>
                                                ) : (
                                                        <div className="selectContent" onClick={this.icoExchange.bind(this)}>
                                                            <div className="ico1">TNC(ETH)</div>
                                                            <div className="toImg">
                                                                <img src={img_8} alt="" />
                                                            </div>
                                                            <div className="ico2">TNC(NEO)</div>
                                                        </div>
                                                    )
                                            }
                                        </div >
                                        <div className={isSendAddFoucsedLine ? "inputCellBox foc" : "inputCellBox"}>
                                            <div className={isSendAddFoucsed ? "mess1 hei" : "mess1"}>{isNeo2Eth ? "NEO" : "ETH"}{t('home.txt7', lng)}</div>
                                            <input type="text" onBlur={this.sendAddBlur.bind(this)} onFocus={this.sendAddFoucs.bind(this)} onChange={this.getNeoAddress.bind(this)} />
                                            <span className="line"></span>
                                        </div>
                                        <div className={isAmountFoucsLine ? "inputCellBox foc amount" : "inputCellBox amount"}>
                                            <div className={isAmountFoucs ? "mess1 hei" : "mess1"}>{t('home.txt8', lng)}</div>
                                            <input type="text" onBlur={this.amountBlur.bind(this)} onFocus={this.amountFoucs.bind(this)} onChange={this.getNeoAmount.bind(this)} />
                                            <span className="line"></span>
                                            <div className={isAmountFoucs ? "unit focus" : "unit"}>
                                                TNC
                                            </div>
                                        </div>
                                        <div className = "inputCellBox limit">
                                            <div className="limit-tip">{ t('home.txt20', lng) + limitAmount }</div>
                                        </div>
                                        <div className={isReceiveAddFoucsLine ? "inputCellBox foc" : "inputCellBox"}>
                                            
                                            <div className={isReceiveAddFoucs ? "mess1 hei" : "mess1"}>{isNeo2Eth ? "ETH" : "NEO"}{t('home.txt9', lng)}</div>
                                            <input type="text" onBlur={this.receiveAddBlur.bind(this)} onFocus={this.receiveAddFoucs.bind(this)} onChange={this.getEthAddress.bind(this)} />
                                            <span className="line"></span>
                                        </div>
                                        {/* {`${t('home.txt21', lng)}${}TNC${t('home.txt23', lng)}${isNeo2Eth ? neo2ethtax : eth2neotax}`} */}
                                        <div className={isReceiveAddFoucsLine ? 'rate blue' : 'rate'}>
                                            <span className={isReceiveAddFoucsLine ? 'black' : ''}>{t('home.txt21', lng)}</span>
                                            {`${isNeo2Eth ? (Number(neo2ethtax) * 100) : (Number(eth2neotax) * 100)}%`}
                                        </div>
                                        {
                                            errMes && <div className="errMess">{ `${errMes}` === 'true' ? t('home.txt22', lng) :  errMes }</div>
                                        }
                                    </div>
                                    <button className={detailsDone ? "step" : "step"} onClick={this.toNextStep.bind(this)}>{t('home.txt10', lng)}</button>
                                </div>
                                {/* 扫描二维码 */}
                                <div className={step == 1 ? "depositBox " : "depositBox Hide"}>
                                    {/* <div className="backbtn" onClick={this.back2first.bind(this)}>
                                        <img src={img_10} alt=""/>
                                    </div> */}
                                    <div className="detailBoxContainer">
                                        {/* <div className="close">
                                            <img src={close_ico} alt=""/>
                                        </div> */}
                                        {
                                            isClick ? '' : <div className="backbtn" onClick={this.back2first.bind(this)}>
                                                <img src={img_10} alt="" />
                                            </div>
                                        }
                                        <h1>{t('home.txt11', lng)}</h1>
                                        <h2>{t('home.txt12', lng)}</h2>
                                        <h2 className="address">{address}</h2>
                                        <div className="qrcodeBox" >
                                            {
                                                sendable && (
                                                    <div className="qrcodeCover">
                                                        <div className="suc">
                                                            <img src={yes_ico} alt="" />
                                                        </div>
                                                    </div>
                                                )
                                            }
                                            <div className="qrcode" id="qrcode"></div>
                                        </div>
                                        <div className="totleMoney">
                                            <p className="money">{t('home.txt13', lng)}</p>
                                        </div>
                                        <div className="totleMoney">
                                            <p className="unit">{tncBackNum}</p>
                                            <p className="unit">TNC</p>
                                        </div>
                                    </div>
                                    <button className="step" onClick={this.toSend.bind(this)}>{t('home.txt14', lng)}</button>
                                </div>
                                {/* 付款状态 */}
                                <div className={step == 2 ? "doneBox " : "doneBox Hide"}>
                                    <div className="backbtn" onClick={this.back2Second.bind(this)}>
                                        <img src={img_10} alt="" />
                                    </div>
                                    <div className="logoRoute">
                                        <div className={isAllDone ? "bgColor " : "bgColor noMove"}>
                                            <img src={img_7} alt="" />
                                        </div>
                                        <div className="logo">
                                            <div className={isAllDone ? "centerImg " : "centerImg filter"}>
                                                <img src={trinitylogo} alt="" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="detailBoxContainer">
                                        <div className="holder"></div>
                                        <div className="scrollBox" id="scroll">
                                            {
                                                !isOnlyOrder && (
                                                    <div className="fromTo">
                                                        <div className="box">
                                                            <div className="title1">{t('home.txt15', lng)}:</div>
                                                            <div className="keyword">
                                                                {neoAddress}
                                                            </div>
                                                            <div className="title2">{t('home.txt17', lng)}</div>
                                                            <div className="money">
                                                                <div className="num">{tncBackNum}</div>
                                                                <div className="nuit">TNC</div>
                                                            </div>
                                                        </div>
                                                        <div className="box">
                                                            <div className="title1">{t('home.txt16', lng)}:</div>
                                                            <div className="keyword">
                                                                {ethAddress}
                                                            </div>
                                                            <div className="title2">{t('home.txt18', lng)}</div>
                                                            <div className="money">
                                                                <div className="num">{tncBackNum}</div>
                                                                <div className="nuit">TNC</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            }
                                            {
                                                stateArr.map((item, index) => {
                                                    return (
                                                        <div className="orderCreat" key={index}>
                                                            <div className="titel">
                                                                {/* <div className="text">Order creation</div> */}
                                                                <div className="time">
                                                                    {new Date(item.CreateTime).format("yyyy-MM-dd hh:mm:ss")}
                                                                </div>
                                                            </div>
                                                            <div className="orderContent">
                                                                {item.Content}
                                                            </div>
                                                        </div>
                                                    )
                                                })
                                            }
                                            {/* <div className="transfer">
                                                <div className="text">Transfer process</div>
                                                <div className="time">2018.01.29 11</div>
                                            </div> */}
                                        </div>
                                    </div>
                                    {
                                        !isOnlyOrder && <button className={isAllDone ? "step" : "step"}  onClick={this.allDone.bind(this)}>{t('home.txt19', lng)}</button>
                                    }
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
