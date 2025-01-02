import React, { ReactElement } from 'react'
import { Keyboard, KeyboardAvoidingView, ScrollView, TouchableWithoutFeedback } from 'react-native'

const KeyboardAvoidingWrapper = ({ children }: { children: ReactElement }) => {
	return (
		<KeyboardAvoidingView>
			<ScrollView>
				<TouchableWithoutFeedback onPress={Keyboard.dismiss}>{children}</TouchableWithoutFeedback>
			</ScrollView>
		</KeyboardAvoidingView>
	)
}

export default KeyboardAvoidingWrapper
