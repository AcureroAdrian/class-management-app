import styled from 'styled-components/native'
import { IHeaderContainer } from './helpers/header-screen-interfaces'
import colors from '@/theme/colors'

export const HeaderContainer = styled.View<IHeaderContainer>`
	background-color: ${colors.variants.primary[5]};
	width: 100%;
	padding-horizontal: 20px;
	padding-bottom: 20px;
	justify-content: flex-end;
	align-items: flex-start;
	gap: 10px;
	height: ${(props: IHeaderContainer) => (props?.statusbarHeigth || 0) + 130}px;
	shadow-color: #000000;
	shadow-offset: 0px 5px;
	shadow-opacity: 0.25;
	shadow-radius: 5px;
	elevation: 15;
`

export const HeaderTitle = styled.Text`
	color: white;
	font-size: 35px;
	font-weight: 500;
`

export const ButtonText = styled.Text`
	color: ${colors.variants.primary[5]};
	font-size: 18px;
	font-weight: 600;
`

export const RowContainer = styled.View`
	width: 100%;
	flex-direction: row;
	align-items: flex-end;
	justify-content: space-between;
	gap: 15px;
`

export const BackButton = styled.Pressable`
	height: 100%;
	align-items: center;
	justify-content: center;
`

export const ActionButton = styled.View`
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: row;
	align-items: center;
	gap: 10px;
	background-color: ${colors.variants.primary[0]};
	padding-vertical: 10px;
	padding-horizontal: 20px;
	border-radius: 30px;
`

export const BackButtonContainer = styled.View`
	height: 40px;
`

export const TitleContainer = styled.View`
	flex-direction: row;
	align-items: center;
	gap: 20px;
`

export const AdditionalButton = styled.View`
	width: 40px;
	height: 40px;
	justify-content: center;
	align-items: center;
`
