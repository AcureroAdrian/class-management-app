import React, { memo } from 'react'
import { View, Text } from 'react-native'
import { format } from 'date-fns'

interface ItemProps {
	item: any
}

const AgendaItem = (props: ItemProps) => {
	const { item } = props

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
			<View style={{ flex: 1, backgroundColor: 'skyblue', padding: 10, borderRadius: 10 }}>
				<Text numberOfLines={1} style={{ fontSize: 12 }}>
					{item.name}
				</Text>
				<Text numberOfLines={1} style={{ fontSize: 10, color: 'grey' }}>
					{item.description}
				</Text>
			</View>
		</View>
	)
}

export default memo(AgendaItem)
