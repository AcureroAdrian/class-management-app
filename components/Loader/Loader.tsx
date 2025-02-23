import { View, Text, ActivityIndicator } from 'react-native'
import React from 'react'

const Loader = ({ text }: { text: string }) => {
	return (
		<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', width: '100%' }}>
			<ActivityIndicator size={'large'} />
			<Text>{text}</Text>
		</View>
	)
}

export default Loader
