import React, {PureComponent} from "react";
import {I18n, Trans} from "react-i18next";
import {NavLink, Link} from "react-router-dom";
import Slider from "react-slick";

import QRCode from "../../../../assets/js/qcode.js";

import {getMainMinHeight, getQuery,indexRemFun,setLocalItem, addClass, hasClass, removeClass, toPosition,getLocalItem,remFun} from "../../../../utils/util";

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

import "./index.less";
// import { setInterval, clearInterval, setTimeout } from "timers";
export default class Root extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            isNeo2Eth: true,
            step: 0,
            tncBackNum: 0,
            stateArr: []
        };
    }
    componentWillReceiveProps(nextProps) {}
    componentWillMount(){
        const that = this;
        indexRemFun();
        window.addEventListener("resize",function() {
            indexRemFun();
        });
    }
    componentDidMount() {
        const that = this;
        let hash = this.props.location.hash;
        if(hash){
            hash = hash.substring(1);
            let tx = window.localStorage.getItem("inwe_order_TX");
            let tncBackNum = window.localStorage.getItem("inwe_order_Value");
            let address = window.localStorage.getItem("inwe_order_Address");
            let neoAddress = window.localStorage.getItem("inwe_order_neoAddress");
            let ethAddress = window.localStorage.getItem("inwe_order_ethAddress");
            this.setState({
                tx,
                tncBackNum,
                address,
                neoAddress,
                ethAddress
            });
            if(hash === "step"){
                this.setState({
                    step: 1
                },function(){
                    if(address){
                        //设置初始化二维码
                        let dom = document.getElementById('qrcode');
                        if(dom)new QRCode(dom, address);
                        that.getOrderDetail();
                    }
                });
            }else if(hash === "step2"){
                this.setState({
                    step: 2
                },function(){
                    //开启状态监控
                    this.getOrderState();
                })
            }else{
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
    scrollBoxToBottom(){
        var e=document.getElementById("scroll");  
        e.scrollTop=e.scrollHeight;
    }
    pageScrollMover(){
        const pageBox = document.getElementById("e-hugeBox");
        parent.addEventListener("scroll", this.pageScrollFun)
    }
    pageScrollFun(){
        var showBoxList = document.getElementsByClassName("showFlowBox");
        var winHei = document.documentElement.clientHeight;
        for(var i = 0; i < showBoxList.length; i++){
            var boxDom = showBoxList[i];
            if(boxDom.getBoundingClientRect().top < winHei - 100){
                addClass(boxDom, "showTogger")
            }else if(boxDom.getBoundingClientRect().top > winHei - 100){
                removeClass(boxDom, "showTogger")
            }
        }
    }
    changeLanguage(type) {
		this.props.changeLng(type);
		window.i18n.changeLanguage(type);
		setLocalItem("language", type);
    }
    icoExchange(){
        //暂时只有NEO转ETH
        return;
        this.setState({
            isNeo2Eth: !this.state.isNeo2Eth
        })
    }
    getNeoAddress(e){
        const that = this;
        let val = e.target.value;
        this.setState({
            neoAddress: val
        },function(){
            that.checkDetailsBtnDone()
        })
    }
    getEthAddress(e){
        const that = this;
        let val = e.target.value;
        this.setState({
            ethAddress: val
        },function(){
            that.checkDetailsBtnDone()
        })
    }
    getNeoAmount(e){
        const that = this;
        let val = e.target.value;
        this.setState({
            neoAmount: val
        },function(){
            that.checkDetailsBtnDone()
        })
    }
    checkDetailsBtnDone(){
        let {neoAmount, ethAddress, neoAddress} = this.state;
        if(neoAmount && ethAddress && neoAddress){
            this.setState({
                detailsDone: true
            })
        }else{
            this.setState({
                detailsDone: false
            })
        }
    }
    toNextStep(){
        const that = this;
        let {neoAddress, ethAddress, neoAmount} = this.state;
        let param = {
            from: neoAddress,
            to: ethAddress,
            value: neoAmount
        };
        if(neoAddress && ethAddress && neoAmount){
            this.setState({
                errMes: false
            })
            //创建订单
            this.props.postOrder(param).then(res => {
                window.location.hash = "step";
                let valShort;
                let valArr = res.Value.split(".");
                if(valArr[1].substring(4) == "0000"){
                   // valShort = valArr[0] + "." + valArr[1].substring(0,4) 
                    valShort = res.Value;
                }else{
                    valShort = res.Value;
                }
                //信息保存至本地
                window.localStorage.setItem("inwe_order_Value", valShort);
                window.localStorage.setItem("inwe_order_TX", res.TX);
                window.localStorage.setItem("inwe_order_Address", res.Address);
                window.localStorage.setItem("inwe_order_neoAddress", neoAddress);
                window.localStorage.setItem("inwe_order_ethAddress", ethAddress);
                this.setState({
                    step: 1,
                    tncBackNum: valShort,
                    tx: res.TX,
                    address: res.Address
                },function(){
                    //设置初始化二维码
                    let dom = document.getElementById('qrcode');
                    if(dom)new QRCode(dom, address);
                    that.getOrderDetail();
                });
                
            })
        }else{
            this.setState({
                errMes: true
            })
        }
    }
    toSend(){
        // if(!this.state.sendable){
        //     return;
        // }
        let tx = this.state.tx;
        if(!tx) return;
        //判断是否扫描过二维码
        // this.props.getOrder(tx).then(res => {
        //     if(res.InTx){
                //直接跳转
                window.location.hash = "step2"
                this.setState({
                    step: 2
                });
                //开启状态监控
                this.getOrderState();
        //     }
        // });
    }
    //获取订单详情  判断是否扫描二维码
    getOrderDetail(){
        const that = this;
        let tx = this.state.tx;
        if(!tx) return;
        if(this.timerDetail){
            clearInterval(this.timerDetail);
        }
        //循环使用状态
        this.timerDetail = setInterval(() => {
            //获取订单详情，判断是否完成OutTx
            this.props.getOrder(tx).then(res => {
                if(res.InTx){
                    this.setState({
                        sendable: true
                    },function(){
                        //that.toSend();
                    });
                }
                if(res.OutTx){
                    this.setState({
                        isAllDone: true
                    })
                    clearInterval(this.timerDetail);
                }
            })
        },3000);
    }
    //获取订单处理状态
    getOrderState(){
        const that = this;
        let tx = this.state.tx;
        if(!tx) return;
        if(this.timerState){
            clearInterval(this.timerState);
        }
        //获取状态列表
        this.props.getOrderState(tx).then(res => {
            //console.log(res);
            this.setState({
                stateArr: res.reverse()
            },function(){
                that.scrollBoxToBottom();
            });
        });
        //循环使用状态
        this.timerState = setInterval(() => {
            //获取状态列表
            this.props.getOrderState(tx).then(res => {
                //console.log(res);
                this.setState({
                    stateArr: res.reverse()
                },function(){
                    that.scrollBoxToBottom();
                });
            });
            //获取订单详情，判断是否完成OutTx
            this.props.getOrder(tx).then(res => {
                if(res.OutTx){
                    this.setState({
                        isAllDone: true
                    })
                    clearInterval(this.timerState);
                }
            })
        },5000);
    }
    back2first(){
        window.location.hash = ""
        this.setState({
            step: 0
        })
    }
    back2Second(){
        window.location.hash = "step"
        this.setState({
            step: 1
        })
        this.getOrderState();
        this.getOrderDetail();
    }
    allDone(){
        // this.setState({
        //     isOnlyOrder: true
        // })
        window.location.hash = ""
        this.setState({
            step: 0
        })
    }
    render() {
        const {lng, changeLng, registerUser, userInfo} = this.props;
        const {isNeo2Eth, step, tncBackNum, fromKeyWord, toKeyWord, neoAddress, ethAddress, errMes, stateArr, isAllDone, detailsDone, depositDone, address, isOnlyOrder, sendable} = this.state;
        let isEnAndTouch = ((window.i18n.language == "en") && IsTouchDevice);

        return (
            <I18n>
                {(t, {i18n}) => (
                    <div className="container m-container e-hugeBox" id="e-hugeBox">
                        <img className="bgCover" src={bg} alt=""/>
                        <div className="logoImgBox">
                            <img src={tnc_logo} alt=""/>
                        </div>
                        {/* 生成订单 */}
                        <div className={step == 0 ? "detailBox" : "detailBox Hide"}>
                            <div className="detailBoxContainer">
                                {/* <div className="close">
                                    <img src={close_ico} alt=""/>
                                </div> */}
                                <h1>Fill the details</h1>
                                <div className="selectBox">
                                    <div className="text">Select transfer type：</div>
                                    {
                                        isNeo2Eth ? (
                                            <div className="selectContent" onClick={this.icoExchange.bind(this)}>
                                                <div className="ico1">TNC(NEO)</div>
                                                <div className="toImg">
                                                    <img src={jiantou} alt=""/>
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
                                                    <img src={jiantou} alt=""/>
                                                </div>
                                                <div className="ico2">TNC(NEO)</div>
                                            </div>
                                        )
                                    }
                                </div>
                                <div className="inputBox">
                                    <div className="inputCellBox">
                                        <div className="mess1">NEO Wallet Address（sent）：</div>
                                        <input type="text" onChange={this.getNeoAddress.bind(this)}/>
                                    </div>
                                    <div className="inputCellBox2">
                                        <div className="mess1">Amount</div>
                                        <input type="text" onChange={this.getNeoAmount.bind(this)}/>
                                        <div className="unit">
                                            TNC
                                        </div>
                                    </div>
                                </div>
                            <div className="inputBox2">
                                <div className="mess1">ETH Wallet Address（receive）：</div>
                                <input type="text" onChange={this.getEthAddress.bind(this)} />
                            </div>
                            </div>
                            {
                                errMes && <div className="errMess"></div>
                            }
                            <button className={detailsDone ? "step" : "noDoneBtn" } onClick={this.toNextStep.bind(this)}>Next Step</button>
                        </div>
                        {/* 扫描二维码 */}
                        <div className={step == 1 ? "depositBox" : "depositBox Hide"}>
                            <div className="detailBoxContainer">
                                {/* <div className="close">
                                    <img src={close_ico} alt=""/>
                                </div> */}
                                {/* <div className="backbtn" onClick={this.back2first.bind(this)}>
                                    <img src={back_ico} alt=""/>
                                </div> */}
                                <h1>Deposit</h1>
                                <h2>Scan the QR Code</h2>
                                <h2>{address}</h2>
                                <div className="qrcodeBox" >
                                    { 
                                        sendable && (
                                            <div className="qrcodeCover" id="qrcode">
                                                <div className="suc">
                                                    <img src={yes_ico} alt=""/>
                                                </div>
                                            </div>
                                        )
                                    }
                                    <div className="qrcode" id="qrcode"></div>
                                </div>
                                <div className="totleMoney">
                                    <p className="money">Insert the amount you want to transfer</p>
                                </div>
                                <div className="totleMoney">
                                    <p className="money">{tncBackNum}</p>
                                    <p className="unit">TNC</p>
                                </div>
                            </div>
                            <button className="step"  onClick={this.toSend.bind(this)}>Transfer complete, next</button>
                        </div>
                        {/* 付款状态 */}
                        <div className={ step == 2 ? "doneBox" : "doneBox Hide"}>
                            <div className="backbtn" onClick={this.back2Second.bind(this)}>
                                <img src={back_ico} alt=""/>
                            </div>
                            <div className="logoRoute">
                                <div className={isAllDone ? "bgColor " : "bgColor noMove"}>
                                    <img src={yuan} alt=""/>
                                </div>
                                <div className="logo">
                                    <div className="centerImg">
                                        <img src={trinitylogo} alt=""/>
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
                                                    <div className="title1">From:</div>
                                                    <div className="keyword">
                                                        {neoAddress}
                                                    </div>
                                                    <div className="title2">Sent Amount:</div>
                                                    <div className="money">
                                                        <div className="num">{tncBackNum}</div>
                                                        <div className="nuit">TNC</div>
                                                    </div>
                                                </div>
                                                <div className="box">
                                                    <div className="title1">to:</div>
                                                    <div className="keyword">
                                                        {ethAddress}
                                                    </div>
                                                    <div className="title2">Recive Amount:</div>
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
                                            return(
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
                                !isOnlyOrder && <button className={isAllDone ? "step" : "noDoneBtn"} onClick={this.allDone.bind(this)}>Done</button>
                            }
                            
                        </div>
                    </div>
                )}
            </I18n>
        );
    }
}
