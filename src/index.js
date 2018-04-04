//                            _ooOoo_    
//                           o8888888o    
//                           88" . "88    
//                           (| -_- |)    
//                            O\ = /O    
//                        ____/`---'\____    
//                      .   ' \\| |// `.    
//                       / \\||| : |||// \    
//                     / _||||| -:- |||||- \    
//                       | | \\\ - /// | |    
//                     | \_| ''\---/'' | |    
//                      \ .-\__ `-` ___/-. /    
//                   ___`. .' /--.--\ `. . __    
//                ."" '< `.___\_<|>_/___.' >'"".    
//               | | : `- \`.;`\ _ /`;.`/ - ` : | |    
//                 \ \ `-. \_ __\ /__ _/ .-` / /    
//         ======`-.____`-.___\_____/___.-`____.-'======    
//                            `=---='    
//    
//         .............................................    
//                  佛祖保佑             永无BUG   
import React from "react";
import createHistory from "history/createBrowserHistory";

import { I18nextProvider } from "react-i18next";
import storeFun from "./store";
import { Provider } from "react-redux";
import { ConnectedRouter } from "react-router-redux";
import { render as domRender } from "react-dom";
import Routes from "./routes";
import registerServiceWorker from "./registerServiceWorker";
import "./assets/less/app.less";
import i18n from "./i18n";
import { changeLng, setReduxUserInfo } from "./globalactions";
import { getLocalItem, remFun, addClass,dateFormat } from "./utils/util";
import { setTimeout } from "timers";
remFun();
dateFormat();
if (IsTouchDevice) {
	let body = document.getElementsByTagName("body")[0];
    addClass(body, "mobile");
    body.style.minHeight = "13.34rem"
} else {
	let body = document.getElementsByTagName("body")[0];
    addClass(body, "pc");
    body.style.minWidth = "1280px"
}
window.addEventListener("orientationchange", function(event) {
    if (window.orientation == 180 || window.orientation == 0) {
        setTimeout(function(){
            remFun();
        },100)
        
    }
    if (window.orientation == 90 || window.orientation == -90) {
        setTimeout(function(){
            remFun();
        },100)
    }
});
// window.addEventListener("orientationchange", function(event) {
// 	if (window.orientation == 180 || window.orientation == 0) {
// 		remFun();
// 		//location.reload();
// 	}
// 	if (window.orientation == 90 || window.orientation == -90) {
// 		remFun();
// 		//location.reload();
// 		// remFun();
// 	}
// });
const history = createHistory();
const store = storeFun(history);
window.history = history;
window.i18n = i18n;
// window.onerror = function(err) {
// 	document.write(err);
// };
let userinfo = getLocalItem("userInfo");
window.store = store;
store.dispatch(changeLng(window.i18n.language));
if (userinfo && userinfo.data) {
	store.dispatch(setReduxUserInfo(JSON.parse(userinfo.data)));
}
const render = Component => {
	domRender(
		<Provider store={store}>
			<ConnectedRouter history={history}>
				<Component />
			</ConnectedRouter>
		</Provider>,
		document.getElementById("root")
	);
};

render(Routes);

registerServiceWorker();
