import { Text, View } from 'react-native'
import styled from 'styled-components'
import { Colors } from '@/components/styles'

export const BackdropContainer = styled(View)`
	background-color: rgba(0, 0, 0, 0.5);
	flex: 1;
	justify-content: center;
	gap: 20px;
`

export const BackdropLabel = styled(Text)`
	text-align: center;
	color: ${Colors.brand};
	font-size: 16px;
	font-weight: 500;
`
