import React, { useState } from 'react'
import { View, Text, Modal, FlatList, Image, ScrollView } from 'react-native'
import { format } from 'date-fns'
import { AntDesign } from '@expo/vector-icons'
import ScreenHeader from '@/components/ScreenHeader/ScreenHeader'
import { IDailyReport } from '../helpers/report-screen-interfaces'
import capitalizeWords from '@/shared/capitalize-words'
import colors from '@/theme/colors'
import { isStudentPresent } from '@/shared/attendance-helpers'
import StatusIcon from '@/shared/StatusIcon'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import styled from 'styled-components/native'
import { exportDailyReportToCSV } from '@/shared/export-helpers'

// Styled Components
const ModalContainer = styled.View`
	flex: 1;
	background-color: ${colors.primary};
`

const ContentContainer = styled.ScrollView`
	flex: 1;
	padding-horizontal: 20px;
	padding-top: 24px;
`

const DateCard = styled.View`
	background-color: ${colors.view.primary};
	border-radius: 16px;
	padding: 20px;
	margin-bottom: 20px;
	shadow-color: #000;
	shadow-offset: 0px 2px;
	shadow-opacity: 0.1;
	shadow-radius: 8px;
	elevation: 3;
	border-width: 1px;
	border-color: ${colors.variants.secondary[1]};
`

const DateHeader = styled.View`
	flex-direction: row;
	align-items: center;
	margin-bottom: 16px;
`

const DateIconContainer = styled.View`
	background-color: ${colors.brand};
	border-radius: 12px;
	padding: 8px;
	margin-right: 12px;
`

const DateTitle = styled.Text`
	font-size: 20px;
	font-weight: 700;
	color: ${colors.variants.secondary[5]};
	letter-spacing: -0.3px;
`

const ClassCard = styled.View`
	background-color: ${colors.view.primary};
	border-radius: 16px;
	margin-bottom: 16px;
	shadow-color: #000;
	shadow-offset: 0px 2px;
	shadow-opacity: 0.1;
	shadow-radius: 8px;
	elevation: 3;
	border-width: 1px;
	border-color: ${colors.variants.secondary[1]};
	overflow: hidden;
`

const ClassHeader = styled.View`
	background-color: ${colors.brand};
	padding: 16px 20px;
	flex-direction: row;
	align-items: center;
`

const ClassTitle = styled.Text`
	font-size: 18px;
	font-weight: 700;
	color: ${colors.view.primary};
	flex: 1;
	letter-spacing: -0.2px;
`

const StatsRow = styled.View`
	background-color: ${colors.variants.secondary[1]};
	padding: 16px 20px;
	flex-direction: row;
	justify-content: space-around;
	align-items: center;
`

const StatContainer = styled.View`
	flex-direction: row;
	align-items: center;
	background-color: ${colors.view.primary};
	padding-horizontal: 12px;
	padding-vertical: 8px;
	border-radius: 20px;
`

const StatBadge = styled.View<{ color: string }>`
	background-color: ${(props: { color: string }) => props.color};
	border-radius: 12px;
	width: 24px;
	height: 24px;
	justify-content: center;
	align-items: center;
	margin-right: 8px;
`

const StatBadgeText = styled.Text`
	color: ${colors.view.primary};
	font-size: 12px;
	font-weight: 700;
`

const StatLabel = styled.Text`
	color: ${colors.variants.secondary[5]};
	font-size: 14px;
	font-weight: 600;
`

const TotalText = styled.Text`
	font-size: 14px;
	color: ${colors.variants.secondary[4]};
	font-weight: 500;
`

const StudentsContainer = styled.View`
	padding: 16px 20px 20px 20px;
`

const StudentItem = styled.View`
	flex-direction: row;
	align-items: center;
	padding-vertical: 12px;
	border-bottom-width: 1px;
	border-bottom-color: ${colors.variants.secondary[1]};
`

const StudentAvatar = styled.Image`
	width: 44px;
	height: 44px;
	border-radius: 22px;
	border-width: 1px;
	border-color: ${colors.variants.grey[1]};
	margin-right: 12px;
`

const StudentInfoContainer = styled.View`
	flex: 1;
`

const StudentName = styled.Text`
	font-size: 16px;
	font-weight: 600;
	color: ${colors.variants.secondary[5]};
	margin-bottom: 2px;
	letter-spacing: -0.2px;
`

const StudentLastName = styled.Text`
	font-size: 14px;
	font-weight: 500;
	color: ${colors.variants.grey[3]};
	margin-bottom: 4px;
	letter-spacing: -0.1px;
`

const BadgesRow = styled.View`
	flex-direction: row;
	gap: 4px;
	margin-bottom: 4px;
`

const StatusBadge = styled.View`
	background-color: #FFF3CD;
	padding-horizontal: 6px;
	padding-vertical: 2px;
	border-radius: 4px;
	border-width: 1px;
	border-color: #F0E68C;
`

const StatusBadgeText = styled.Text`
	color: #856404;
	font-size: 8px;
	font-weight: 700;
`

const DayBadge = styled.View`
	background-color: #E1F5FE;
	padding-horizontal: 6px;
	padding-vertical: 2px;
	border-radius: 4px;
	border-width: 1px;
	border-color: #B3E5FC;
`

const DayBadgeText = styled.Text`
	color: #01579B;
	font-size: 8px;
	font-weight: 700;
`

const ObservationCard = styled.View`
	margin-top: 6px;
	padding: 8px;
	background-color: ${colors.variants.secondary[0]};
	border-radius: 8px;
	border-left-width: 3px;
	border-left-color: ${colors.brand};
`

const ObservationText = styled.Text`
	font-size: 10px;
	color: ${colors.variants.secondary[4]};
	font-style: italic;
	line-height: 14px;
`

const StatusContainer = styled.View`
	background-color: ${colors.variants.secondary[1]};
	border-radius: 8px;
	padding: 8px;
	margin-left: 8px;
`

const DailyReportDetailsModal = ({
	openModal,
	closeModal,
	reports,
}: {
	openModal: boolean
	closeModal: () => void
	reports: IDailyReport[]
}) => {
	const [isExporting, setIsExporting] = useState(false)

	const handleExport = async () => {
		setIsExporting(true)
		await exportDailyReportToCSV(reports)
		setIsExporting(false)
	}

	return (
		<Modal visible={openModal} animationType='fade' onRequestClose={closeModal} statusBarTranslucent={true}>
			<ModalContainer>
				<ScreenHeader 
					label='Daily Reports' 
					showBackButton={true} 
					handleBack={closeModal}
					handleOnPress={handleExport}
					labelButton={isExporting ? 'Exporting...' : 'Download'}
					iconName='download'
				/>
				<ContentContainer
					showsVerticalScrollIndicator={false}
					contentContainerStyle={{ paddingBottom: 40 }}
				>
					<FlatList
						nestedScrollEnabled={true}
						scrollEnabled={false}
						data={reports}
						keyExtractor={(item) => item._id}
						renderItem={({ item }) => (
							<DateCard>
								<DateHeader>
									<DateIconContainer>
										<MaterialCommunityIcons name='calendar' size={20} color={colors.view.primary} />
									</DateIconContainer>
									<DateTitle>
										{format(new Date(item._id), 'MMMM dd, yyyy')}
									</DateTitle>
								</DateHeader>
								
								<FlatList
									data={item.karateClasses}
									keyExtractor={(classItem) => classItem._id}
									renderItem={({ item: classItem }) => {
										const presents = classItem.attendance.filter((student) => isStudentPresent(student.attendanceStatus))?.length
										const absents = classItem.attendance.filter((student) => !isStudentPresent(student.attendanceStatus))?.length
										return (
											<ClassCard>
												<ClassHeader>
													<ClassTitle numberOfLines={1}>
														{classItem.karateClassName}
													</ClassTitle>
												</ClassHeader>
												
												<StatsRow>
													{Boolean(presents) && (
														<StatContainer>
															<StatBadge color='#4CAF50'>
																<StatBadgeText>{presents}</StatBadgeText>
															</StatBadge>
															<StatLabel>Present</StatLabel>
														</StatContainer>
													)}
													{Boolean(absents) && (
														<StatContainer>
															<StatBadge color='#F44336'>
																<StatBadgeText>{absents}</StatBadgeText>
															</StatBadge>
															<StatLabel>Absent</StatLabel>
														</StatContainer>
													)}
													<TotalText>Total: {classItem.attendance.length}</TotalText>
												</StatsRow>
												
												<StudentsContainer>
													<FlatList
														data={classItem.attendance}
														keyExtractor={(student) => student.student._id}
														scrollEnabled={false}
														nestedScrollEnabled={true}
														renderItem={({ item: student, index }) => (
															<>
																<StudentItem>
																	<StudentAvatar
																		source={require('@/assets/img/default-avatar.png')}
																		resizeMode='contain'
																	/>
																	<StudentInfoContainer>
																		<StudentName>
																			{capitalizeWords(student.student.name)}
																		</StudentName>
																		<StudentLastName>
																			{capitalizeWords(student.student.lastName)}
																		</StudentLastName>
																		
																		{/* Badges */}
																		{(student.student.isTrial || student.isDayOnly) && (
																			<BadgesRow>
																				{student.student.isTrial && (
																					<StatusBadge>
																						<StatusBadgeText>TRIAL</StatusBadgeText>
																					</StatusBadge>
																				)}
																				{student.isDayOnly && (
																					<DayBadge>
																						<DayBadgeText>DAY</DayBadgeText>
																					</DayBadge>
																				)}
																			</BadgesRow>
																		)}
																		
																		{/* Observations */}
																		{student.observations && (
																			<ObservationCard>
																				<ObservationText>
																					"Note: {student.observations}"
																				</ObservationText>
																			</ObservationCard>
																		)}
																	</StudentInfoContainer>
																	<StatusContainer>
																		<StatusIcon 
																			status={student.attendanceStatus} 
																			size={24} 
																		/>
																	</StatusContainer>
																</StudentItem>
																{/* Only show separator if not the last item */}
																{index < classItem.attendance.length - 1 && (
																	<View style={{ height: 1, backgroundColor: colors.variants.secondary[1], marginHorizontal: 20 }} />
																)}
															</>
														)}
													/>
												</StudentsContainer>
											</ClassCard>
										)
									}}
								/>
							</DateCard>
						)}
					/>
				</ContentContainer>
			</ModalContainer>
		</Modal>
	)
}

export default DailyReportDetailsModal
