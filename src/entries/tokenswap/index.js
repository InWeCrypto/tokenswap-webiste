import { injectReducer } from "../../utils/injectReducer";
import * as reducers from "./controls/reducers";
import * as globalReducer from "../../globalreducer";
import Bundle from "../../bundle";
import React, { PureComponent } from "react";

injectReducer("globData", globalReducer);
injectReducer("index", reducers);

const Root = props => {
	return (
		<Bundle load={() => import("./containers/root")}>
			{Root => <Root {...props} />}
		</Bundle>
	);
};
export default Root;
