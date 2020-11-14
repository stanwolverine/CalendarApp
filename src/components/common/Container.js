import React, { memo } from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';

const Container = (props) => <SafeAreaView style={styles.container}>{props.children}</SafeAreaView>;

const styles = StyleSheet.create({
	container: { backgroundColor: '#ffffff', flex: 1 },
});

export default memo(Container);
