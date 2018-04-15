import React from "react";
import { Route, Switch, withRouter } from "react-router-dom";

import Indexp from "./entries/index";
import Step from "./entries/indexstep";
import Step2 from "./entries/indexstep2";
import Tokenswap from "./entries/tokenswap";
import About from "./entries/about";
import List from './entries/list';

export default () => {
	return (
		<Switch>
			<Route path="/" exact component={Tokenswap} />
			<Route path="/index" exact component={Indexp} />
			<Route path="/about" exact component={About} />
			<Route path="/step" exact component={Step} />
			<Route path="/step2" exact component={Step2} />
			<Route path="/list" exact component={List} />
		</Switch>
	);
};
