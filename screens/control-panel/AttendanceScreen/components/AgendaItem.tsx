import React, { memo } from 'react'
import { View, Text, Pressable } from 'react-native'
import { format } from 'date-fns'
import { MaterialCommunityIcons } from '@expo/vector-icons'

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
				paddingTop: 15,
				paddingHorizontal: 20,
				alignItems: 'center',
			}}
		>
			<Text style={{ color: 'blue', marginRight: 15 }}>{startTime}</Text>
			<View style={{ flex: 1, backgroundColor: '#aed4f7', padding: 10, borderRadius: 10 }}>
				<Pressable onPress={() => handleOpenAttendance(item.item)} disabled={disabled} style={{ flex: 1 }}>
					<View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
						<View style={{ flex: 1, paddingRight: 10 }}>
							<Text numberOfLines={1} style={{ fontSize: 12, fontWeight: 400 }}>
								{item.name}
							</Text>
							<Text numberOfLines={1} style={{ fontSize: 10, color: '#373535' }}>
								{item.description}
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
										<Text style={{ color: 'white' }}>{item.presents}</Text>
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
										<Text style={{ color: 'white' }}>{disabled ? item?.total : item.absents}</Text>
									</View>
								)}
							</View>
						</View>
						<View style={{ alignItems: 'center' }}>
							<MaterialCommunityIcons name='account' size={24} color='#373535' />
							<Text style={{ color: '#373535' }}>{item?.item?.students?.length}</Text>
						</View>
					</View>
				</Pressable>
			</View>
		</View>
	)
}

export default memo(AgendaItem)
