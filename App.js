import React from 'react';

import Store from './src/contexts';
import RootNavigator from './src/navigation';

function App() {
	return (
		<Store>
			<RootNavigator />
		</Store>
	);
}

export default App;
