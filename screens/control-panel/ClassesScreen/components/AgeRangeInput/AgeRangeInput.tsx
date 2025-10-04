import React, { useEffect, useMemo, useState } from 'react'
import { View, Text } from 'react-native'
import { StyledCustomInputlabel } from '@/theme/styles'
import * as S from './AgeRangeInput.styles'

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
		<S.AgeRangeContainer>
			<StyledCustomInputlabel>Age Range</StyledCustomInputlabel>
			<S.InputContainer>
				<S.AgeInput
					keyboardType='numeric'
					placeholder='min age'
					value={String(minValue || '')}
					onChangeText={handleMinAgeChange}
					onBlur={handleMinAgeBlur}
				/>
				<S.Separator>-</S.Separator>
				<S.AgeInput
					keyboardType='numeric'
					value={String(maxValue)}
					placeholder='max age'
					onChangeText={handleMaxAgeChange}
					onBlur={handleMaxAgeBlur}
				/>
				<S.RangeText>{rangeText}</S.RangeText>
			</S.InputContainer>
		</S.AgeRangeContainer>
	)
}

export default AgeRangeInput
