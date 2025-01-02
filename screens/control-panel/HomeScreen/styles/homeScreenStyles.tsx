import { Image } from 'react-native'
import styled from 'styled-components'
import { Colors } from '../../../../components/styles'

export const Avatar = styled(Image)`
	width: 100px;
	height: 100px;
	margin: auto;
	border-radius: 50px;
	border-width: 2px;
	border-color: ${Colors.secondary};
	margin-bottom: 10px;
	margin-top: 10px;
`
