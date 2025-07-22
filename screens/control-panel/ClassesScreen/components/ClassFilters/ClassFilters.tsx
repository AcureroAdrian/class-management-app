import React from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { TDaysOfWeek, TLocation } from '@/shared/common-types'
import { shortDaysOfWeek } from '@/shared/short-values'
import colors from '@/theme/colors'
import * as S from './ClassFilters.styles'

interface IClassFiltersProps {
	selectedDays: TDaysOfWeek[]
	selectedTimeRange: string
	selectedLocation: TLocation | 'all'
	onDayToggle: (day: TDaysOfWeek) => void
	onTimeRangeChange: (range: string) => void
	onLocationChange: (location: TLocation | 'all') => void
	onClearFilters: () => void
}

const ClassFilters = ({
	selectedDays,
	selectedTimeRange,
	selectedLocation,
	onDayToggle,
	onTimeRangeChange,
	onLocationChange,
	onClearFilters,
}: IClassFiltersProps) => {
	const weekDays: TDaysOfWeek[] = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
	const timeRanges = [
		{ value: 'all', label: 'All Day' },
		{ value: 'morning', label: 'Morning' },
		{ value: 'afternoon', label: 'Afternoon' },
		{ value: 'evening', label: 'Evening' },
	]
	const locations = [
		{ value: 'all', label: 'All Locations' },
		{ value: 'katy', label: 'Katy' },
		{ value: 'spring', label: 'Spring' },
	]

	const hasActiveFilters = selectedDays.length > 0 || selectedTimeRange !== 'all' || selectedLocation !== 'all'

	return (
		<S.FilterContainer>
			<S.FilterCard>
				<S.FilterAccent />
				{/* Header */}
				<S.FilterHeader>
					<MaterialCommunityIcons name="filter-variant" size={18} color={colors.brand} />
					<S.FilterTitle>Filter Classes</S.FilterTitle>
				</S.FilterHeader>

				{/* Days Filter */}
				<S.FilterOptionsContainer>
					{weekDays.map((day) => (
						<S.FilterChip
							key={day}
							selected={selectedDays.includes(day)}
							onPress={() => onDayToggle(day)}
						>
							<MaterialCommunityIcons
								name={selectedDays.includes(day) ? 'check-circle' : 'circle-outline'}
								size={14}
								color={selectedDays.includes(day) ? colors.primary : colors.variants.secondary[4]}
							/>
							<S.FilterChipText selected={selectedDays.includes(day)}>
								{shortDaysOfWeek[day]}
							</S.FilterChipText>
						</S.FilterChip>
					))}
				</S.FilterOptionsContainer>

				{/* Time Range Filter */}
				<S.TimeFilterContainer>
					{timeRanges.map((range) => (
						<S.TimeFilterChip
							key={range.value}
							selected={selectedTimeRange === range.value}
							onPress={() => onTimeRangeChange(range.value)}
						>
							<S.TimeFilterText selected={selectedTimeRange === range.value}>
								{range.label}
							</S.TimeFilterText>
						</S.TimeFilterChip>
					))}
				</S.TimeFilterContainer>

				{/* Location Filter */}
				<S.TimeFilterContainer style={{ marginTop: 8 }}>
					{locations.map((loc) => (
						<S.TimeFilterChip
							key={loc.value}
							selected={selectedLocation === loc.value}
							onPress={() => onLocationChange(loc.value as TLocation | 'all')}
						>
							<S.TimeFilterText selected={selectedLocation === loc.value}>
								{loc.label}
							</S.TimeFilterText>
						</S.TimeFilterChip>
					))}
				</S.TimeFilterContainer>

				{/* Clear Filters Button */}
				{hasActiveFilters && (
					<S.ClearFiltersButton onPress={onClearFilters}>
						<S.ClearFiltersText>Clear Filters</S.ClearFiltersText>
					</S.ClearFiltersButton>
				)}
			</S.FilterCard>
		</S.FilterContainer>
	)
}

export default ClassFilters 