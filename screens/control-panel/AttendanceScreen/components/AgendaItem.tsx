import React, { memo } from 'react'
import { View, Text, Pressable } from 'react-native'
import { format } from 'date-fns'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import colors from '@/theme/colors'

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
		<View
			style={{
				flexDirection: 'row',
				justifyContent: 'space-between',
				flex: 1,
				paddingVertical: 10,
				paddingHorizontal: 20,
				alignItems: 'center',
			}}
		>
			<Text style={{ color: colors.variants.secondary[4], marginRight: 15, fontSize: 14, fontWeight: 600 }}>
				{startTime}
			</Text>
			<View style={{ flex: 1, backgroundColor: colors.variants.secondary[1], padding: 20, borderRadius: 10 }}>
				<Pressable onPress={() => handleOpenAttendance(item.item)} disabled={disabled} style={{ flex: 1 }}>
					<View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
						<View style={{ flex: 1, paddingRight: 10 }}>
							<Text style={{ fontSize: 14, fontWeight: 400 }}>
								{item.name?.length > 20 ? item.name.substring(0, 20) + '...' : item.name}
							</Text>
							<Text style={{ fontSize: 12, color: colors.variants.grey[4] }}>
								{item.description
									? item?.description?.length > 20
										? item.description.substring(0, 20) + '...'
										: item.description
									: 'No description'}
							</Text>
							<View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, marginTop: 5 }}>
								{Boolean(item.presents) && (
									<View
										style={{
											backgroundColor: 'green',
											padding: 5,
											width: 30,
											height: 30,
											justifyContent: 'center',
											alignItems: 'center',
											borderRadius: '50%',
										}}
									>
										<Text style={{ color: colors.primary }}>{item.presents}</Text>
									</View>
								)}
								{(Boolean(item.absents) || disabled) && (
									<View
										style={{
											backgroundColor: 'red',
											padding: 5,
											width: 30,
											height: 30,
											justifyContent: 'center',
											alignItems: 'center',
											borderRadius: '50%',
										}}
									>
										<Text style={{ color: colors.primary }}>{disabled ? item?.total : item.absents}</Text>
									</View>
								)}
							</View>
						</View>
						<View style={{ alignItems: 'center' }}>
							<MaterialCommunityIcons name='account' size={30} color={colors.variants.secondary[5]} />
							<Text style={{ color: colors.variants.secondary[5] }}>{item?.item?.students?.length}</Text>
						</View>
					</View>
				</Pressable>
			</View>
		</View>
	)
}

export default memo(AgendaItem)
