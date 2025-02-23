import React, { useEffect, useMemo, useState } from 'react'
import { View, Text } from 'react-native'
import { StyledCustomInputlabel, StyledCustomTextInput } from '@/theme/styles'
import colors from '@/theme/colors'

const AgeRangeInput = ({
	minAge,
	maxAge,
	saveMinAge,
	saveMaxAge,
}: {
	minAge: number
	maxAge: number
	saveMinAge: (value: number) => void
	saveMaxAge: (value: number) => void
}) => {
	const [minValue, setMinValue] = useState<string>('')
	const [maxValue, setMaxValue] = useState<string>('')

	useEffect(() => {
		setMinValue(String(minAge || ''))
		setMaxValue(String(maxAge === 100 ? '' : maxAge))
	}, [minAge, maxAge])

	const handleMinAgeChange = (text: string) => {
		let value = text.replace(/[^0-9]/g, '')
		setMinValue(value)
		saveMinAge(Number(value || 0))
	}
	const handleMaxAgeChange = (text: string) => {
		let value = text.replace(/[^0-9]/g, '')
		setMaxValue(value)
		saveMaxAge(Number(value || 100))
	}
	const handleMinAgeBlur = () => {
		let value = minValue
		if (value === '0') value = ''
		if (value !== '' && maxValue !== '' && parseInt(value) > parseInt(maxValue)) {
			value = maxValue
		}
		setMinValue(value)
		saveMinAge(Number(value || 0))
	}
	const handleMaxAgeBlur = () => {
		let value = maxValue
		if (Number(value) > 100) value = '100'
		if (value !== '' && minValue !== '' && parseInt(value) < parseInt(minValue)) {
			value = String(minValue)
		}
		setMaxValue(value)
		saveMaxAge(Number(value || 100))
	}
	const rangeText = useMemo(() => {
		let text = ''
		if (!minValue && !maxValue) text = 'All Ages'
		else if (!minValue) text = `Under ${maxValue} years`
		else if (!maxValue) text = `Over ${minValue} years`
		else text = `Between ${minValue} - ${maxValue} years`

		return text
	}, [minValue, maxValue])

	return (
		<View style={{ width: '100%' }}>
			<StyledCustomInputlabel>Age Range</StyledCustomInputlabel>
			<View style={{ flexDirection: 'row', width: '100%', gap: 10 }}>
				<StyledCustomTextInput
					keyboardType='numeric'
					value={String(minValue || '')}
					onChangeText={handleMinAgeChange}
					style={{ width: 50, backgroundColor: 'skyblue' }}
					onBlur={handleMinAgeBlur}
				/>
				<StyledCustomTextInput
					keyboardType='numeric'
					value={String(maxValue)}
					onChangeText={handleMaxAgeChange}
					onBlur={handleMaxAgeBlur}
					style={{ width: 50, backgroundColor: 'skyblue' }}
				/>
			</View>
			<Text style={{ color: colors.brand }}>{rangeText}</Text>
		</View>
	)
}

export default AgeRangeInput
