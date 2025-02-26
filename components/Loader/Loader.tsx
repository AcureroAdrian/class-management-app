import { View, Text, ActivityIndicator } from 'react-native'
import React from 'react'
import colors from '@/theme/colors'

const Loader = ({ text }: { text: string }) => {
	return (
		<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', width: '100%' }}>
			<ActivityIndicator size={'large'} color={colors.variants.secondary[5]} />
			<Text>{text}</Text>
		</View>
	)
}

export default Loader
