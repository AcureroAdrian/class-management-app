import React, { useEffect } from 'react'
import { Modal, ScrollView, ActivityIndicator } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import ScreenHeader from '@/components/ScreenHeader/ScreenHeader'
import { useAppDispatch, useAppSelector } from '@/redux/store'
import { getStudentCredits } from '@/redux/actions/userActions'
import colors from '@/theme/colors'
import * as S from './StudentCreditsDetailModal.styles'

interface StudentCreditsDetailModalProps {
	visible: boolean
	onClose: () => void
	studentId: string
	studentName: string
}

const StudentCreditsDetailModal: React.FC<StudentCreditsDetailModalProps> = ({
	visible,
	onClose,
	studentId,
	studentName,
}) => {
	const dispatch = useAppDispatch()
	const { loadingGetStudentCredits, studentCredits, errorGetStudentCredits } = useAppSelector(
		(state) => state.getStudentCredits,
	)

	useEffect(() => {
		if (visible && studentId) {
			dispatch(getStudentCredits(studentId))
		}
	}, [visible, studentId, dispatch])

	const credits = studentCredits

	return (
		<Modal visible={visible} animationType='slide' onRequestClose={onClose} statusBarTranslucent={true}>
			<S.Container>
				<ScreenHeader
					label={`Credits of ${studentName}`}
					showBackButton={true}
					handleBack={onClose}
					iconName='close'
				/>

				{loadingGetStudentCredits ? (
					<S.LoaderContainer>
						<ActivityIndicator size='large' color={colors.variants.primary[5]} />
						<S.LoaderText>Loading details...</S.LoaderText>
					</S.LoaderContainer>
				) : errorGetStudentCredits ? (
					<S.ErrorContainer>
						<MaterialCommunityIcons name='alert-circle' size={48} color={colors.variants.error[5]} />
						<S.ErrorText>{errorGetStudentCredits}</S.ErrorText>
					</S.ErrorContainer>
				) : credits ? (
					<ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
						{/* Summary Card */}
						<S.SummaryCard>
							<S.SummaryTitle>Credit Summary</S.SummaryTitle>
							<S.TotalCreditsContainer>
								<S.TotalCreditsLabel>Available Credits</S.TotalCreditsLabel>
								<S.TotalCreditsValue available={credits.totalCredits > 0}>
									{credits.totalCredits}
								</S.TotalCreditsValue>
							</S.TotalCreditsContainer>
							{credits.isFrozen && (
								<S.FrozenBadge>
									<MaterialCommunityIcons name='snowflake' size={16} color={colors.variants.info[0]} />
									<S.FrozenText>Frozen Account</S.FrozenText>
								</S.FrozenBadge>
							)}
						</S.SummaryCard>

						{/* Plan Information */}
						<S.Section>
							<S.SectionHeader>
								<MaterialCommunityIcons name='card-account-details' size={24} color={colors.variants.primary[5]} />
								<S.SectionTitle>Enrollment Plan</S.SectionTitle>
							</S.SectionHeader>
							<S.Card>
								<S.InfoRow>
									<S.InfoLabel>Current Plan:</S.InfoLabel>
									<S.PlanBadge>
										<S.PlanText>{credits.plan}</S.PlanText>
									</S.PlanBadge>
								</S.InfoRow>
								<S.InfoRow>
									<S.InfoLabel>Max Countable Absences:</S.InfoLabel>
									<S.InfoValue>{credits.maxPending}</S.InfoValue>
								</S.InfoRow>
							</S.Card>
						</S.Section>

						{/* Absences Breakdown */}
						<S.Section>
							<S.SectionHeader>
								<MaterialCommunityIcons name='calendar-remove' size={24} color={colors.variants.error[5]} />
								<S.SectionTitle>Absences This Year</S.SectionTitle>
							</S.SectionHeader>
							<S.Card>
								<S.BreakdownRow>
									<S.BreakdownLabel>
										<S.BreakdownDot color={colors.variants.error[5]} />
										Total Countable Absences:
									</S.BreakdownLabel>
									<S.BreakdownValue>{credits.absencesCount || 0}</S.BreakdownValue>
								</S.BreakdownRow>
								<S.Divider />
								<S.BreakdownRow>
									<S.BreakdownLabel>
										<S.BreakdownDot color={colors.variants.warning[5]} />
										Pending Absences:
									</S.BreakdownLabel>
									<S.BreakdownValue highlight>{credits.pendingAbsences || 0}</S.BreakdownValue>
								</S.BreakdownRow>
								<S.BreakdownRow>
									<S.BreakdownLabel>
										<S.BreakdownDot color={colors.variants.success[5]} />
										Recovered Absences:
									</S.BreakdownLabel>
									<S.BreakdownValue>{credits.consumedAbsences || 0}</S.BreakdownValue>
								</S.BreakdownRow>
							</S.Card>
						</S.Section>

						{/* Credits from Absences */}
						<S.Section>
							<S.SectionHeader>
								<MaterialCommunityIcons name='ticket-account' size={24} color={colors.variants.secondary[5]} />
								<S.SectionTitle>Credits from Absences</S.SectionTitle>
							</S.SectionHeader>
							<S.Card>
								<S.InfoRow>
									<S.InfoLabel>Credits Generated from Absences:</S.InfoLabel>
									<S.InfoValue highlight>{credits.creditsFromAbsences}</S.InfoValue>
								</S.InfoRow>
								<S.HintText>
									Generated only up to plan limit ({credits.maxPending})
								</S.HintText>
							</S.Card>
						</S.Section>

						{/* Bookings Information */}
						<S.Section>
							<S.SectionHeader>
								<MaterialCommunityIcons name='calendar-check' size={24} color={colors.variants.success[5]} />
								<S.SectionTitle>Makeup Classes</S.SectionTitle>
							</S.SectionHeader>
							<S.Card>
								<S.BreakdownRow>
									<S.BreakdownLabel>
										<S.BreakdownDot color={colors.variants.success[5]} />
										Total Active Makeups:
									</S.BreakdownLabel>
									<S.BreakdownValue>{credits.bookedCount}</S.BreakdownValue>
								</S.BreakdownRow>
								<S.Divider />
								<S.BreakdownRow>
									<S.BreakdownLabel>
										<S.BreakdownDot color={colors.variants.secondary[5]} />
										With Absence Credits:
									</S.BreakdownLabel>
									<S.BreakdownValue>
										{(credits.bookedCount || 0) - (credits.adjustmentBookedCount || 0)}
									</S.BreakdownValue>
								</S.BreakdownRow>
								<S.BreakdownRow>
									<S.BreakdownLabel>
										<S.BreakdownDot color={colors.variants.primary[5]} />
										With Manual Credits:
									</S.BreakdownLabel>
									<S.BreakdownValue>{credits.adjustmentBookedCount || 0}</S.BreakdownValue>
								</S.BreakdownRow>
							</S.Card>
						</S.Section>

						{/* Manual Adjustments */}
						<S.Section>
							<S.SectionHeader>
								<MaterialCommunityIcons name='pencil-box-multiple' size={24} color={colors.variants.primary[5]} />
								<S.SectionTitle>Manual Adjustments</S.SectionTitle>
							</S.SectionHeader>
							<S.Card>
								<S.InfoRow>
									<S.InfoLabel>Total Adjusted:</S.InfoLabel>
									<S.InfoValue>{credits.adjustmentTotal || 0}</S.InfoValue>
								</S.InfoRow>
								<S.InfoRow>
									<S.InfoLabel>Manual Credits Used:</S.InfoLabel>
									<S.InfoValue highlight>{credits.adjustmentUsed || 0}</S.InfoValue>
								</S.InfoRow>
								<S.Divider />
								<S.InfoRow>
									<S.InfoLabel bold>Manual Credits Available:</S.InfoLabel>
									<S.InfoValue bold highlight>
										{credits.adjustment}
									</S.InfoValue>
								</S.InfoRow>
								<S.HintText>
									Manual adjustments do not count toward the plan limit
								</S.HintText>
							</S.Card>
						</S.Section>

						{/* Final Calculation */}
						<S.FinalCard>
							<S.FinalTitle>Final Calculation</S.FinalTitle>
							<S.CalculationRow>
								<S.CalculationLabel>Credits from Absences</S.CalculationLabel>
								<S.CalculationValue>+{credits.creditsFromAbsences}</S.CalculationValue>
							</S.CalculationRow>
							<S.CalculationRow>
								<S.CalculationLabel>Manual Adjustments Available</S.CalculationLabel>
								<S.CalculationValue positive={credits.adjustment >= 0}>
									{credits.adjustment >= 0 ? '+' : ''}{credits.adjustment}
								</S.CalculationValue>
							</S.CalculationRow>
							<S.Divider />
							<S.CalculationRow final>
								<S.CalculationLabel final>Total Available</S.CalculationLabel>
								<S.CalculationValue final available={credits.totalCredits > 0}>
									{credits.totalCredits}
								</S.CalculationValue>
							</S.CalculationRow>
						</S.FinalCard>
					</ScrollView>
				) : null}
			</S.Container>
		</Modal>
	)
}

export default StudentCreditsDetailModal

