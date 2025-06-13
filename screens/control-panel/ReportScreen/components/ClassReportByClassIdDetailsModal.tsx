import React from 'react'
import { View, Text, Modal, FlatList, Image, ScrollView } from 'react-native'
import { format } from 'date-fns'
import { AntDesign } from '@expo/vector-icons'
import ScreenHeader from '@/components/ScreenHeader/ScreenHeader'
import { IClassReport } from '../helpers/report-screen-interfaces'
import capitalizeWords from '@/shared/capitalize-words'
import colors from '@/theme/colors'

const ClassReportByClassIdDetailsModal = ({
	openModal,
	closeModal,
	classReports,
}: {
	openModal: boolean
	closeModal: () => void
	classReports: IClassReport[]
}) => {
	return (
		<Modal visible={openModal} animationType='fade' onRequestClose={closeModal} statusBarTranslucent={true}>
			<View style={{ flex: 1 }}>
				<ScreenHeader label='Reports' showBackButton={true} handleBack={closeModal} />
				<View style={{ width: '100%', flex: 1, justifyContent: 'flex-start' }}>
					<ScrollView>
						<FlatList
							nestedScrollEnabled={true}
							scrollEnabled={false}
							data={classReports}
							keyExtractor={(item) => item._id}
							style={{ width: '100%' }}
							renderItem={({ item }) => (
								<View style={{ width: '100%', paddingHorizontal: 20, paddingVertical: 20 }}>
									<View
										style={{
											width: '100%',
											paddingHorizontal: 10,
											paddingVertical: 5,
											backgroundColor: colors.variants.secondary[1],
										}}
									>
										<Text
											numberOfLines={1}
											style={{ fontSize: 14, fontWeight: 500, color: colors.variants.secondary[5] }}
										>
											{item.karateClassName}
										</Text>
									</View>
									<FlatList
										data={item.attendances}
										keyExtractor={(item) => 'id' + item.date.year + '' + item.date.month + '' + item.date.day}
										style={{ width: '100%' }}
										renderItem={({ item }) => {
											const attendanceDate = new Date(item.date.year, item.date.month - 1, item.date.day)
											const presents = item.attendance.filter((item) => item.attendanceStatus === 'present')?.length
											const absents = item.attendance.filter((item) => item.attendanceStatus === 'absent')?.length
											return (
												<>
													<View
														style={{
															borderColor: colors.variants.secondary[1],
															borderWidth: 1,
															width: '100%',
															padding: 10,
															marginTop: 5,
														}}
													>
														<Text
															numberOfLines={1}
															style={{ fontSize: 14, fontWeight: 500, color: colors.variants.secondary[5] }}
														>
															{format(attendanceDate, 'MMMM dd, yyyy')}
														</Text>
													</View>
													<View
														style={{
															width: '100%',
															padding: 5,
															marginTop: 5,
															backgroundColor: colors.variants.secondary[1],
															flexDirection: 'row',
															justifyContent: 'space-between',
															alignItems: 'center',
														}}
													>
														<View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
															{Boolean(presents) && (
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
																	<Text style={{ color: colors.view.primary, fontSize: 14 }}>{presents}</Text>
																</View>
															)}
															{Boolean(absents) && (
																<View
																	style={{
																		backgroundColor: colors.variants.primary[5],
																		padding: 5,
																		width: 30,
																		height: 30,
																		justifyContent: 'center',
																		alignItems: 'center',
																		borderRadius: '50%',
																	}}
																>
																	<Text style={{ color: colors.view.primary, fontSize: 14 }}>{absents}</Text>
																</View>
															)}
														</View>
														<Text
															numberOfLines={1}
															style={{ fontSize: 14, fontWeight: 500, color: colors.variants.secondary[5] }}
														>
															Total: {item.attendance.length}
														</Text>
													</View>
													<View>
														<FlatList
															data={item.attendance}
															keyExtractor={(item) => item.student._id}
															style={{ width: '100%', marginTop: 5 }}
															renderItem={({ item }) => (
																<View
																	style={{
																		marginVertical: 2,
																		flexDirection: 'row',
																		alignItems: 'center',
																		flex: 1,
																		gap: 5,
																	}}
																>
																	<View
																		style={{
																			borderColor: colors.variants.secondary[1],
																			borderWidth: 1,
																			width: '100%',
																			padding: 10,
																			flexDirection: 'row',
																			flex: 1,
																			alignItems: 'center',
																			gap: 10,
																		}}
																	>
																		<Image
																			source={require('@/assets/img/default-avatar.png')}
																			style={{ width: 30, height: 30, borderRadius: 30 }}
																			resizeMode='contain'
																		/>
																		<View
																			style={{
																				justifyContent: 'center',
																				alignItems: 'flex-start',
																				width: '100%',
																				flexDirection: 'column',
																			}}
																		>
																			<Text style={{ fontWeight: 400, fontSize: 12 }}>
																				{capitalizeWords(item.student.name)}
																			</Text>
																			<Text style={{ fontSize: 10, color: 'grey' }}>
																				{capitalizeWords(item?.student.lastName)}
																			</Text>
																			
																			{/* Badges Container */}
																			<View style={{ flexDirection: 'row', marginTop: 2, gap: 2 }}>
																				{item.student.isTrial && (
																					<View style={{ 
																						backgroundColor: '#FFF3CD', 
																						paddingHorizontal: 4, 
																						paddingVertical: 1, 
																						borderRadius: 4 
																					}}>
																						<Text style={{ color: '#856404', fontSize: 8, fontWeight: '600' }}>TRIAL</Text>
																					</View>
																				)}
																				{item.isDayOnly && (
																					<View style={{ 
																						backgroundColor: '#E1F5FE', 
																						paddingHorizontal: 4, 
																						paddingVertical: 1, 
																						borderRadius: 4 
																					}}>
																						<Text style={{ color: '#01579B', fontSize: 8, fontWeight: '600' }}>DAY</Text>
																					</View>
																				)}
																			</View>
																			
																			{/* Observations */}
																			{item.observations && (
																				<View style={{ 
																					marginTop: 4, 
																					padding: 6, 
																					backgroundColor: colors.variants.secondary[0], 
																					borderRadius: 4,
																					borderLeftWidth: 3,
																					borderLeftColor: colors.variants.primary[4]
																				}}>
																					<Text style={{ fontSize: 10, color: colors.variants.secondary[4], fontStyle: 'italic' }}>
																						"Nota: {item.observations}"
																					</Text>
																				</View>
																			)}
																		</View>
																	</View>
																	<View
																		style={{
																			borderColor: colors.variants.secondary[1],
																			borderWidth: 1,
																			padding: 10,
																			alignItems: 'center',
																			justifyContent: 'center',
																		}}
																	>
																		{item.attendanceStatus === 'present' && (
																			<AntDesign name='check' size={30} color='green' />
																		)}
																		{item.attendanceStatus === 'absent' && (
																			<AntDesign name='close' size={30} color={colors.variants.primary[5]} />
																		)}
																	</View>
																</View>
															)}
														/>
													</View>
												</>
											)
										}}
									/>
								</View>
							)}
						/>
					</ScrollView>
				</View>
			</View>
		</Modal>
	)
}

export default ClassReportByClassIdDetailsModal
