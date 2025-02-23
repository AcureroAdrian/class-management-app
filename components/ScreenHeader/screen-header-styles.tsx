import styled from 'styled-components/native'
import { IHeaderContainer } from './helpers/header-screen-interfaces'

export const HeaderContainer = styled.View<IHeaderContainer>`
	background-color: #d93b3d;
	width: 100%;
	padding-top: ${(props: IHeaderContainer) => (props?.statusbarHeigth || 0) + 10}px;
	padding-bottom: 5px;
	padding-left: 15px;
	padding-right: 15px;
	flex-direction: row;
	justify-content: space-between;
	height: ${(props: IHeaderContainer) => (props?.statusbarHeigth || 0) + 47}px;
`

export const HeaderTitle = styled.Text`
	color: white;
	font-size: 24px;
`

export const ButtonContainer = styled.View`
	flex-direction: row;
	align-items: center;
	gap: 10px;
`

export const ButtonText = styled.Text`
	color: white;
	font-size: 14px;
`

export const RowContainer = styled.View`
	flex-direction: row;
	align-items: center;
	gap: 15px;
`

export const BackButton = styled.Pressable`
	height: 100%;
	margin-left: -15px;
	padding-left: 15px;
	display: flex;
	align-items: center;
	justify-content: center;
`

export const ActionButton = styled.Pressable`
	display: flex;
	align-items: center;
	justify-content: center;
`
