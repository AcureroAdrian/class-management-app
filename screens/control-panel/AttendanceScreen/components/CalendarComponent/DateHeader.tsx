import React from 'react'
import { ActivityIndicator } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { format, addHours } from 'date-fns'
import { enUS } from 'date-fns/locale'
import styled from 'styled-components/native'
import colors from '@/theme/colors'
import { TUserRole } from '@/shared/common-types'

const DateContainer = styled.View`
	background-color: ${colors.primary};
	margin: 9px 20px;
	padding: 12px 20px;
	border-radius: 12px;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	elevation: 1;
	shadow-color: ${colors.variants.grey[4]};
	shadow-offset: 0px 1px;
	shadow-opacity: 0.1;
	shadow-radius: 3px;
	border-width: 1px;
	border-color: ${colors.variants.grey[1]};
`

const LeftContent = styled.View`
	flex-direction: row;
	align-items: center;
	flex: 1;
`

const IconContainer = styled.View`
	width: 40px;
	height: 40px;
	border-radius: 8px;
	background-color: ${colors.variants.primary[0]};
	justify-content: center;
	align-items: center;
	margin-right: 16px;
`

const DateTextContainer = styled.View`
	flex: 1;
`

const DayText = styled.Text`
	font-size: 16px;
	font-weight: 600;
	color: ${colors.variants.secondary[5]};
	text-transform: capitalize;
`

const DateText = styled.Text`
	font-size: 14px;
	color: ${colors.variants.grey[4]};
	margin-top: 2px;
`

const HolidayButton = styled.Pressable`
	flex-direction: row;
	align-items: center;
	gap: 6px;
	padding: 8px 12px;
	border-radius: 8px;
	background-color: ${colors.variants.primary[0]};
	border-width: 1px;
	border-color: ${colors.variants.primary[2]};
	elevation: 1;
	shadow-color: ${colors.variants.primary[3]};
	shadow-offset: 0px 1px;
	shadow-opacity: 0.15;
	shadow-radius: 2px;
`

const HolidayButtonText = styled.Text`
	color: ${colors.variants.primary[5]};
	font-weight: 500;
	font-size: 12px;
`

interface DateHeaderProps {
	currentDate: string
	role?: TUserRole
	handleAddHoliday?: () => void
	isHoliday?: boolean
	loadingHoliday?: boolean
	disableHoliday?: boolean
}

const DateHeader = ({ 
	currentDate, 
	role, 
	handleAddHoliday, 
	isHoliday, 
	loadingHoliday, 
	disableHoliday 
}: DateHeaderProps) => {
	const date = addHours(new Date(currentDate), 12)
	const dayName = format(date, 'EEEE', { locale: enUS })
	const fullDate = format(date, 'dd MMMM, yyyy', { locale: enUS })

	return (
		<DateContainer>
			<LeftContent>
				<IconContainer>
					<MaterialCommunityIcons 
						name='calendar' 
						size={20} 
						color={colors.variants.primary[5]} 
					/>
				</IconContainer>
				<DateTextContainer>
					<DayText>{dayName}</DayText>
					<DateText>{fullDate}</DateText>
				</DateTextContainer>
			</LeftContent>
			
			{role === 'admin' && !disableHoliday && handleAddHoliday && (
				<HolidayButton onPress={handleAddHoliday} disabled={loadingHoliday}>
					<HolidayButtonText>
						{isHoliday ? 'Remove' : 'Holiday'}
					</HolidayButtonText>
					{loadingHoliday ? (
						<ActivityIndicator size={'small'} color={colors.variants.primary[5]} />
					) : (
						<MaterialCommunityIcons 
							name={isHoliday ? 'calendar-remove' : 'calendar-plus'} 
							size={16} 
							color={colors.variants.primary[5]} 
						/>
					)}
				</HolidayButton>
			)}
		</DateContainer>
	)
}

export default DateHeader 