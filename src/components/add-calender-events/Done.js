import React, { memo } from 'react';
import { StyleSheet, Pressable, ActivityIndicator } from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

const Done = (props) => {
	return (
		<Pressable disabled={props.disabled} onPress={props.done} style={styles.doneBtn}>
			{props.loading ? <ActivityIndicator size="small" color="#d9d9d9" /> : <MaterialIcon name="done" size={30} color={props.disabled ? '#d9d9d9' : '#529aff'} />}
		</Pressable>
	);
};

export default memo(Done);

const styles = StyleSheet.create({
	doneBtn: {
		paddingRight: 26,
	},
});
