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
import { setInterval } from "timers";
export default class Root extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            isNeo2Eth: true,
            step: 0,
            tncBackNum: 0
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
            let tx = getLocalItem("inwe_order_TX");
            let tncBackNum = getLocalItem("inwe_order_Value");
            let address = getLocalItem("inwe_order_Address");
            let neoAddress = getLocalItem("inwe_order_neoAddress");
            let ethAddress = getLocalItem("inwe_order_ethAddress");
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
                    }
                });
                
                
            }else if(hash === "step2"){
                this.setState({
                    step: 2
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
        let val = e.target.value;
        this.setState({
            neoAddress: val
        })
    }
    getEthAddress(e){
        let val = e.target.value;
        this.setState({
            ethAddress: val
        })
    }
    getNeoAmount(e){
        let val = e.target.value;
        this.setState({
            neoAmount: val
        })
    }
    toNextStep(){
        let {neoAddress, ethAddress, neoAmount} = this.state;
        let param = {
            from: neoAddress,
            to: ethAddress,
            value: neoAmount
        };
        //创建订单
        this.props.postOrder(param).then(res => {
            window.location.hash = "step";
            //信息保存至本地
            setLocalItem("inwe_order_Value", res.Value);
            setLocalItem("inwe_order_TX", res.TX);
            setLocalItem("inwe_order_Address", res.Address);
            setLocalItem("inwe_order_neoAddress", neoAddress);
            setLocalItem("inwe_order_ethAddress", ethAddress);
            this.setState({
                step: 1,
                tncBackNum: res.Value,
                tx: res.TX,
                address: res.Address
            },function(){
                //设置初始化二维码
                let dom = document.getElementById('qrcode');
                if(dom)new QRCode(dom, address);
            })
        })
    }
    toSend(){
        window.location.hash = "step2"
        this.setState({
            step: 2
        });
        //开启状态监控
        this.getOrderState();
    }
    //获取订单处理状态
    getOrderState(){
        let tx = this.state.tx;
        if(!tx) return;
        let timer = setInterval(() => {
            this.props.getOrderState(tx).then(res => {
                console.log(res);
            })
        },10000) 
    }
    back2first(){
        window.location.hash = ""
        this.setState({
            step: 0
        })
    }
    render() {
        const {lng, changeLng, registerUser, userInfo, stateList} = this.props;
        const {isNeo2Eth, step, tncBackNum, fromKeyWord, toKeyWord, neoAddress, ethAddress} = this.state;
        let isEnAndTouch = ((window.i18n.language == "en") && IsTouchDevice);
        return (
            <I18n>
                {(t, {i18n}) => (
                    <div className="container m-container e-hugeBox" id="e-hugeBox">
                        <img className="bgCover" src={bg} alt=""/>
                        <div className="logoImgBox">
                            <img src={tnc_logo} alt=""/>
                        </div>
                        {
                            step == 0 && (
                                <div className="detailBox">
                                    <div className="detailBoxContainer">
                                        <div className="close">
                                            <img src={close_ico} alt=""/>
                                        </div>
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
                                    <button className="step" onClick={this.toNextStep.bind(this)}>Next Step</button>
                                </div>
                            )
                        }
                        {
                            step == 1 && (
                                <div className="depositBox">
                                    <div className="detailBoxContainer">
                                        <div className="close">
                                            <img src={close_ico} alt=""/>
                                        </div>
                                        <div className="backbtn" onClick={this.back2first.bind(this)}>
                                            <img src={back_ico} alt=""/>
                                        </div>
                                        <h1>Deposit</h1>
                                        <h2>Scan the QR Code</h2>
                                        <div className="qrcodeBox" >
                                            {/* <div className="qrcodeCover" id="qrcode">
                                                <div className="suc">
                                                    <img src={yes_ico} alt=""/>
                                                </div>
                                            </div> */}
                                            <div className="qrcode" id="qrcode"></div>
                                        </div>
                                        <div className="totleMoney">
                                            <p className="money">{tncBackNum}</p>
                                            <p className="unit">TNC</p>
                                        </div>
                                    </div>
                                    <button className="step" onClick={this.toSend.bind(this)}>Send</button>
                                </div>
                            )
                        }
                        {
                            step == 2 && (
                                <div className="doneBox">
                                    <div className="logoRoute">
                                        <div className="bgColor">
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
                                        <div className="scrollBox">
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
                                                        <div className="nuit">ETH</div>
                                                    </div>
                                                </div>
                                            </div>
                                            {
                                                stateList.map(res => {
                                                    return(
                                                        <div className="orderCreat">
                                                            <div className="titel">
                                                                {/* <div className="text">Order creation</div> */}
                                                                <div className="time">
                                                                    2018.01.29 11
                                                                </div>
                                                            </div>
                                                            <div className="orderContent">
                                                                0x8214b824927a28dc16581cd22e460fe0f7e31994
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
                                    <button className="step">Done</button>
                                </div>
                            )
                        }
                       
                    </div>
                )}
            </I18n>
        );
    }
}
