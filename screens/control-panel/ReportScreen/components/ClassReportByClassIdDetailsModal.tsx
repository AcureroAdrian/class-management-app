import React, { useState } from 'react'
import { View, Text, Modal, FlatList, Image, ScrollView } from 'react-native'
import { format } from 'date-fns'
import { AntDesign } from '@expo/vector-icons'
import ScreenHeader from '@/components/ScreenHeader/ScreenHeader'
import { IClassReport } from '../helpers/report-screen-interfaces'
import capitalizeWords from '@/shared/capitalize-words'
import colors from '@/theme/colors'
import { isStudentPresent } from '@/shared/attendance-helpers'
import StatusIcon from '@/shared/StatusIcon'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { exportClassReportToCSV } from '@/shared/export-helpers'

const ClassReportByClassIdDetailsModal = ({
	openModal,
	closeModal,
	classReports,
}: {
	openModal: boolean
	closeModal: () => void
	classReports: IClassReport[]
}) => {
	const [isExporting, setIsExporting] = useState(false)

	const handleExport = async () => {
		setIsExporting(true)
		await exportClassReportToCSV(classReports)
		setIsExporting(false)
	}

	return (
		<Modal visible={openModal} animationType='fade' onRequestClose={closeModal} statusBarTranslucent={true}>
			<View style={{ flex: 1, backgroundColor: colors.primary }}>
				<ScreenHeader 
					label='Report Details' 
					showBackButton={true} 
					handleBack={closeModal}
					handleOnPress={handleExport}
					labelButton={isExporting ? 'Exporting...' : 'Download'}
					iconName='download'
				/>
				
				<ScrollView 
					style={{ flex: 1 }}
					contentContainerStyle={{ paddingBottom: 40 }}
					showsVerticalScrollIndicator={false}
				>
					<FlatList
						nestedScrollEnabled={true}
						scrollEnabled={false}
						data={classReports}
						keyExtractor={(item) => item._id}
						style={{ flex: 1 }}
						renderItem={({ item }) => (
							<View style={{ paddingHorizontal: 20, paddingTop: 20 }}>
								{/* Class Header */}
								<View style={{ 
									backgroundColor: colors.brand,
									borderRadius: 12,
									padding: 16,
									marginBottom: 16,
									shadowColor: '#000',
									shadowOffset: { width: 0, height: 2 },
									shadowOpacity: 0.1,
									shadowRadius: 4,
									elevation: 3
								}}>
									<View style={{ flexDirection: 'row', alignItems: 'center' }}>
										<MaterialCommunityIcons 
											name="google-classroom" 
											size={24} 
											color={colors.view.primary} 
											style={{ marginRight: 12 }}
										/>
										<Text style={{ 
											fontSize: 18, 
											fontWeight: '700', 
											color: colors.view.primary,
											flex: 1
										}}>
											{item.karateClassName}
										</Text>
									</View>
								</View>

								{/* Attendance Sessions */}
								<FlatList
									data={item.attendances}
									keyExtractor={(item, index) =>
										'id' + item.date.year + '' + item.date.month + '' + item.date.day + '-' + index
									}
									style={{ marginBottom: 20 }}
									renderItem={({ item: attendance }) => {
										const attendanceDate = new Date(attendance.date.year, attendance.date.month - 1, attendance.date.day)
										const presents = attendance.attendance.filter((item) => isStudentPresent(item.attendanceStatus))?.length
										const absents = attendance.attendance.filter((item) => !isStudentPresent(item.attendanceStatus))?.length
										
										return (
											<View style={{ marginBottom: 16 }}>
												{/* Date Header */}
												<View style={{ 
													backgroundColor: colors.view.primary,
													borderRadius: 12,
													padding: 16,
													marginBottom: 8,
													shadowColor: '#000',
													shadowOffset: { width: 0, height: 1 },
													shadowOpacity: 0.1,
													shadowRadius: 4,
													elevation: 2,
													borderWidth: 1,
													borderColor: colors.variants.secondary[1]
												}}>
													<View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
														<View style={{ flexDirection: 'row', alignItems: 'center' }}>
															<MaterialCommunityIcons 
																name="calendar" 
																size={20} 
																color={colors.brand} 
																style={{ marginRight: 8 }}
															/>
																													<Text style={{ 
															fontSize: 16, 
															fontWeight: '600', 
															color: colors.variants.secondary[5]
														}}>
															{format(attendanceDate, 'MM/dd/yyyy')}
														</Text>
														</View>
														<Text style={{ 
															fontSize: 14, 
															color: colors.variants.secondary[4],
															fontWeight: '500'
														}}>
															Total: {attendance.attendance.length}
														</Text>
													</View>
												</View>

												{/* Statistics */}
												<View style={{ 
													backgroundColor: colors.variants.secondary[1],
													borderRadius: 10,
													padding: 12,
													marginBottom: 12,
													flexDirection: 'row',
													justifyContent: 'space-around',
													alignItems: 'center'
												}}>
													{Boolean(presents) && (
														<View style={{ 
															flexDirection: 'row', 
															alignItems: 'center',
															backgroundColor: '#E8F5E8',
															paddingHorizontal: 12,
															paddingVertical: 6,
															borderRadius: 20
														}}>
															<View style={{ 
																backgroundColor: '#4CAF50',
																borderRadius: 12,
																width: 24,
																height: 24,
																justifyContent: 'center',
																alignItems: 'center',
																marginRight: 8
															}}>
																<Text style={{ color: colors.view.primary, fontSize: 12, fontWeight: '700' }}>
																	{presents}
																</Text>
															</View>
															<Text style={{ color: '#2E7D32', fontSize: 14, fontWeight: '600' }}>
																Present
															</Text>
														</View>
													)}
													{Boolean(absents) && (
														<View style={{ 
															flexDirection: 'row', 
															alignItems: 'center',
															backgroundColor: '#FFEBEE',
															paddingHorizontal: 12,
															paddingVertical: 6,
															borderRadius: 20
														}}>
															<View style={{ 
																backgroundColor: '#F44336',
																borderRadius: 12,
																width: 24,
																height: 24,
																justifyContent: 'center',
																alignItems: 'center',
																marginRight: 8
															}}>
																<Text style={{ color: colors.view.primary, fontSize: 12, fontWeight: '700' }}>
																	{absents}
																</Text>
															</View>
															<Text style={{ color: '#C62828', fontSize: 14, fontWeight: '600' }}>
																Absent
															</Text>
														</View>
													)}
												</View>

												{/* Students List */}
												<View style={{ 
													backgroundColor: colors.view.primary,
													borderRadius: 12,
													padding: 12,
													shadowColor: '#000',
													shadowOffset: { width: 0, height: 1 },
													shadowOpacity: 0.1,
													shadowRadius: 4,
													elevation: 2,
													borderWidth: 1,
													borderColor: colors.variants.secondary[1]
												}}>
													<FlatList
														data={attendance.attendance}
														keyExtractor={(item) => item.student._id}
														renderItem={({ item }) => (
															<View style={{ 
																flexDirection: 'row', 
																alignItems: 'center', 
																paddingVertical: 8,
																borderBottomWidth: 1,
																borderBottomColor: colors.variants.secondary[1]
															}}>
																<Image
																	source={require('@/assets/img/default-avatar.png')}
																	style={{ width: 36, height: 36, borderRadius: 18, marginRight: 12 }}
																	resizeMode='contain'
																/>
																<View style={{ flex: 1 }}>
																	<Text style={{ 
																		fontWeight: '600', 
																		fontSize: 14, 
																		color: colors.variants.secondary[5],
																		marginBottom: 2
																	}}>
																		{capitalizeWords(item.student.name)}
																	</Text>
																	<Text style={{ 
																		fontSize: 12, 
																		color: colors.variants.secondary[3],
																		marginBottom: 4
																	}}>
																		{capitalizeWords(item?.student.lastName)}
																	</Text>
																	
																	{/* Student Badges */}
																	<View style={{ flexDirection: 'row', gap: 4 }}>
																																			{item.student.isTrial && (
																		<View style={{
																			backgroundColor: '#FFF3CD',
																			paddingHorizontal: 6,
																			paddingVertical: 2,
																			borderRadius: 6,
																			borderWidth: 1,
																			borderColor: '#F0E68C'
																		}}>
																			<Text style={{
																				color: '#856404',
																				fontSize: 8,
																				fontWeight: '700'
																			}}>
																				TRIAL
																			</Text>
																		</View>
																	)}
																	{item.isDayOnly && (
																		<View style={{
																			backgroundColor: '#E1F5FE',
																			paddingHorizontal: 6,
																			paddingVertical: 2,
																			borderRadius: 6,
																			borderWidth: 1,
																			borderColor: '#B3E5FC'
																		}}>
																			<Text style={{
																				color: '#01579B',
																				fontSize: 8,
																				fontWeight: '700'
																			}}>
																				DAY
																			</Text>
																		</View>
																	)}
																	{item.isRecovery && (
																		<View style={{
																			backgroundColor: '#fff3cd',
																			paddingHorizontal: 6,
																			paddingVertical: 2,
																			borderRadius: 4,
																			borderWidth: 1,
																			borderColor: '#f0e68c'
																		}}>
																			<Text style={{
																				color: '#856404',
																				fontSize: 8,
																				fontWeight: '700'
																			}}>
																				RECOVERY
																			</Text>
																		</View>
																	)}
																	</View>
																	
																	{/* Student Notes */}
																	{item.observations && (
																		<View style={{ 
																			marginTop: 6, 
																			padding: 8, 
																			backgroundColor: colors.variants.secondary[0], 
																			borderRadius: 8,
																			borderLeftWidth: 3,
																			borderLeftColor: colors.brand
																		}}>
																			<Text style={{ 
																				fontSize: 10, 
																				color: colors.variants.secondary[4], 
																				fontStyle: 'italic',
																				lineHeight: 14
																			}}>
																				"Note: {item.observations}"
																			</Text>
																		</View>
																	)}
																</View>
																<View style={{ 
																	backgroundColor: colors.variants.secondary[1],
																	borderRadius: 8,
																	padding: 8,
																	marginLeft: 8
																}}>
																	<StatusIcon 
																		status={item.attendanceStatus} 
																		size={24} 
																	/>
																</View>
															</View>
														)}
													/>
												</View>
											</View>
										)
									}}
								/>
							</View>
						)}
					/>
				</ScrollView>
			</View>
		</Modal>
	)
}

export default ClassReportByClassIdDetailsModal
