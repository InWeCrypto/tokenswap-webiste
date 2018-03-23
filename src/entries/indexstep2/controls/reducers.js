import { handleActions } from "redux-actions";
import {
	CREATEORDER
} from "./actions";

export const stateList = handleActions(
	{
		[CREATEORDER]: (state, { payload }) => payload
	},
	[]
);

