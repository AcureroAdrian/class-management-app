import React from 'react'
import { View, Text } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import styled from 'styled-components/native'
import colors from '@/theme/colors'

const EmptyContainer = styled.View`
	flex: 1;
	justify-content: center;
	align-items: center;
	padding: 60px 40px;
`

const IconContainer = styled.View`
	background-color: ${colors.variants.grey[0]};
	width: 80px;
	height: 80px;
	border-radius: 40px;
	justify-content: center;
	align-items: center;
	margin-bottom: 20px;
	elevation: 1;
	shadow-color: ${colors.variants.grey[3]};
	shadow-offset: 0px 1px;
	shadow-opacity: 0.1;
	shadow-radius: 3px;
`

const EmptyTitle = styled.Text`
	font-size: 18px;
	font-weight: 600;
	color: ${colors.variants.secondary[4]};
	text-align: center;
	margin-bottom: 8px;
`

const EmptyDescription = styled.Text`
	font-size: 14px;
	color: ${colors.variants.grey[4]};
	text-align: center;
	line-height: 20px;
	max-width: 280px;
`

const EmptyState = () => {
	return (
		<EmptyContainer>
			<IconContainer>
				<MaterialCommunityIcons 
					name='calendar-blank-outline' 
					size={36} 
					color={colors.variants.grey[3]} 
				/>
			</IconContainer>
			<EmptyTitle>No hay clases programadas</EmptyTitle>
			<EmptyDescription>
				No se encontraron clases para esta fecha. 
				Selecciona otro día para ver las clases programadas.
			</EmptyDescription>
		</EmptyContainer>
	)
}

export default EmptyState 