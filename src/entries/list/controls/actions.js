import { createAction } from "redux-actions";
import http from "../../../utils/ajax";

const PRE_FIX = "INDEX_";
export const CREATEORDER = `${PRE_FIX}CREATEORDER`;
export const GETORDER = `${PRE_FIX}GETORDER`;
export const GETSTATE = `${PRE_FIX}GETSTATE`;
export const GETINFO = `${PRE_FIX}GETINFO`
export const postOrder = createAction(CREATEORDER, params => {
	return http
		.post({
			url: `trade?from=${params.from}&to=${params.to}&value=${params.value}`
		})
		.then(res => {
			return res;
		});
});
export const getOrder = createAction(GETORDER, orderId => {
	return http
		.get({
			url: "trade/" + orderId
		})
		.then(res => {
			return res;
		});
});
export const getOrderState = createAction(GETSTATE, orderId => {
	return http
		.get({
			url: "log/" + orderId
		})
		.then(res => {
			return res;
		});
});
export const getTradeInfo = createAction(GETINFO, () => {
	return http
		.get({
			url: "tradeinfo"
		})
		.then(res => {
			return res;
		});
})
