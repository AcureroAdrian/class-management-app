import React, { memo } from 'react'
import { format } from 'date-fns'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import colors from '@/theme/colors'
import {
	ItemContainer,
	TimeText,
	CardContainer,
	PressableArea,
	InnerContainer,
	TextContainer,
	NameText,
	DescriptionText,
	BadgesContainer,
	Badge,
	BadgeText,
	StudentsContainer,
	StudentsCountText,
} from './AgendaItem.styles'

interface ItemProps {
	item: any
	handleOpenAttendance: (attendance: any) => void
	disabled: boolean
}

const AgendaItem = (props: ItemProps) => {
	const { item, handleOpenAttendance, disabled } = props

	const date = new Date()
	date.setHours(item.startTime.hour)
	date.setMinutes(item.startTime.minute)
	const startTime = format(date, 'HH:mm aaaa')

	return (
		<ItemContainer>
			<TimeText>{startTime}</TimeText>
			<CardContainer>
				<PressableArea onPress={() => handleOpenAttendance(item.item)} disabled={disabled}>
					<InnerContainer>
						<TextContainer>
							<NameText>{item.name?.length > 20 ? item.name.substring(0, 20) + '...' : item.name}</NameText>
							<DescriptionText>
								{item.description
									? item?.description?.length > 20
										? item.description.substring(0, 20) + '...'
										: item.description
									: 'No description'}
							</DescriptionText>
							<BadgesContainer>
								{Boolean(item.presents) && (
									<Badge type='present'>
										<BadgeText>{item.presents}</BadgeText>
									</Badge>
								)}
								{(Boolean(item.absents) || disabled) && (
									<Badge type='absent'>
										<BadgeText>{disabled ? item?.total : item.absents}</BadgeText>
									</Badge>
								)}
							</BadgesContainer>
						</TextContainer>
						<StudentsContainer>
							<MaterialCommunityIcons name='account' size={30} color={colors.variants.secondary[5]} />
							<StudentsCountText>{item?.item?.students?.length}</StudentsCountText>
						</StudentsContainer>
					</InnerContainer>
				</PressableArea>
			</CardContainer>
		</ItemContainer>
	)
}

export default memo(AgendaItem)
