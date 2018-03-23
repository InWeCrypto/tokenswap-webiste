import React from "react";
import { Route, Switch, withRouter } from "react-router-dom";

import Indexp from "./entries/index";
import Step from "./entries/indexstep";
import Step2 from "./entries/indexstep2";


export default () => {
	return (
		<Switch>
			<Route path="/" exact component={Indexp} />
			<Route path="/step" exact component={Step} />
			<Route path="/step2" exact component={Step2} />
		</Switch>
	);
};
