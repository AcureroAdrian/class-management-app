import React, { memo } from 'react'
import { format } from 'date-fns'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import colors from '@/theme/colors'
import {
	ItemContainer,
	CardContainer,
	PressableArea,
	TopRow,
	TimeContainer,
	TimeText,
	StudentsContainer,
	StudentsIcon,
	StudentsCountText,
	ContentContainer,
	NameText,
	DescriptionText,
	BottomRow,
	AttendanceButton,
	AttendanceText,
	AttendanceCount,
	ArrowIcon,
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
	const startTime = format(date, 'HH:mm')

	// Calcular el color del borde basado en el porcentaje de asistencia
	const totalStudents = item?.item?.students?.length || 0
	const presentStudents = disabled ? 0 : (item.presents || 0)
	const absentStudents = disabled ? totalStudents : (item.absents || 0)
	
	const attendancePercentage = totalStudents > 0 ? (presentStudents / totalStudents) : 0
	const borderColor = attendancePercentage >= 0.5 ? colors.green : colors.variants.primary[3]

	return (
		<ItemContainer>
			<CardContainer borderColor={borderColor}>
				<PressableArea onPress={() => handleOpenAttendance(item.item)} disabled={disabled}>
					<TopRow>
						<TimeContainer>
							<TimeText>{startTime}</TimeText>
						</TimeContainer>
						<StudentsContainer>
							<StudentsIcon>
								<MaterialCommunityIcons 
									name='account-group' 
									size={16} 
									color={colors.variants.grey[4]} 
								/>
							</StudentsIcon>
							<StudentsCountText>{totalStudents}</StudentsCountText>
						</StudentsContainer>
					</TopRow>

					<ContentContainer>
						<NameText numberOfLines={1}>
							{item.name}
						</NameText>
						<DescriptionText numberOfLines={2}>
							{item.description || 'Sin descripción'}
						</DescriptionText>
					</ContentContainer>

					<BottomRow>
						{!disabled && presentStudents > 0 && (
							<AttendanceButton>
								<MaterialCommunityIcons 
									name='circle' 
									size={8} 
									color={colors.green} 
								/>
								<AttendanceCount>{presentStudents}</AttendanceCount>
								<AttendanceText>presentes</AttendanceText>
							</AttendanceButton>
						)}

						{(absentStudents > 0 || disabled) && (
							<AttendanceButton>
								<MaterialCommunityIcons 
									name='circle' 
									size={8} 
									color={colors.red} 
								/>
								<AttendanceCount>{absentStudents}</AttendanceCount>
								<AttendanceText>ausentes</AttendanceText>
							</AttendanceButton>
						)}
						
						<ArrowIcon>
							<MaterialCommunityIcons 
								name='chevron-right' 
								size={20} 
								color={colors.variants.grey[3]} 
							/>
						</ArrowIcon>
					</BottomRow>
				</PressableArea>
			</CardContainer>
		</ItemContainer>
	)
}

export default memo(AgendaItem)
