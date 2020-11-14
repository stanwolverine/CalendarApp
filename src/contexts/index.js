import React, { memo, createContext, useReducer } from 'react';

import { GlobalReducer, GLOBAL_INITIAL_STATE } from './reducers/reducer.global';

export const GlobalContext = createContext(GLOBAL_INITIAL_STATE);

const Store = (props) => {
	const globalReducer = useReducer(GlobalReducer, GLOBAL_INITIAL_STATE);

	return <GlobalContext.Provider value={globalReducer}>{props.children}</GlobalContext.Provider>;
};

export default memo(Store);
