import React, {PureComponent} from "react";
import {I18n, Trans} from "react-i18next";
import {NavLink, Link} from "react-router-dom";
import Slider from "react-slick";
import Menus from "../../../../components/menus/";
import Footer from "../../../../components/footer/";
import bglf from "../../../../assets/images/1.png";
import bgrt from "../../../../assets/images/6.png";
import "./index.less";
import { indexRemFun } from "../../../../utils/util";



export default class Root extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
        	
        };
    }
    componentWillMount(){
        const that = this;
        indexRemFun();
        window.addEventListener("resize",function() {
            indexRemFun();
        });
    }
    render() {
        const { lng } = this.props;
				let lang = window.i18n.language;
				lang = "zh"
        return (
            <I18n>
                {(t, {i18n}) => {
                	console.log(lang);
                	console.log(t('about.txt3',lang));
                	return (
                  <div className="page-about" id="e-aboutBox">
                  	<Menus lng={lng}/>
										<div className="content">
											<div className="bg-lf"><img src={bglf} alt="" /></div>
											<div className="bg-rt"><img src={bgrt} alt="" /></div>
											<div className="ct">
												<h1>Trinity通过状态通道技术对NEO进行链下扩容。</h1>
												<p>{t('about.txt3',lang)}</p>
												<p>{t('about.txt4',lang)}</p>
												<p>{t('about.txt5',lang)}</p>
												<p>{t('about.txt6',lang)}</p>
												<p>{t('about.txt7',lang)}</p>
												<p>{t('about.txt8',lang)}</p>
												<p>{t('about.txt9',lang)}</p>
												<p>{t('about.txt10',lang)}</p>
												
												
												
											</div>
										</div>
										<Footer lng={lng} />
                  </div>
                )
                }}
            </I18n>
        );
    }
}
