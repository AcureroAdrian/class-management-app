import React, { memo } from 'react'
import { View, Text, Pressable } from 'react-native'
import { format } from 'date-fns'
import { AntDesign } from '@expo/vector-icons'

interface ItemProps {
	item: any
	handleOpenAttendance: (attendance: any) => void
}

const AgendaItem = (props: ItemProps) => {
	const { item, handleOpenAttendance } = props

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
				<Pressable onPress={() => handleOpenAttendance(item.item)}>
					<View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
						<View>
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
								{Boolean(item.absents) && (
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
										<Text style={{ color: 'white' }}>{item.absents}</Text>
									</View>
								)}
							</View>
						</View>
						<View style={{ alignItems: 'center' }}>
							<AntDesign name='user' size={24} color='#373535' />
							<Text style={{ color: '#373535' }}>{item?.item?.students?.length}</Text>
						</View>
					</View>
				</Pressable>
			</View>
		</View>
	)
}

export default memo(AgendaItem)
