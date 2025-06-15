import React from 'react'
import { View, Text, Modal, FlatList, Image, ScrollView } from 'react-native'
import { format } from 'date-fns'
import { AntDesign } from '@expo/vector-icons'
import ScreenHeader from '@/components/ScreenHeader/ScreenHeader'
import { IDailyReport } from '../helpers/report-screen-interfaces'
import capitalizeWords from '@/shared/capitalize-words'
import colors from '@/theme/colors'
import { isStudentPresent } from '@/shared/attendance-helpers'
import StatusIcon from '@/shared/StatusIcon'

const DailyReportDetailsModal = ({
	openModal,
	closeModal,
	reports,
}: {
	openModal: boolean
	closeModal: () => void
	reports: IDailyReport[]
}) => {
	return (
		<Modal visible={openModal} animationType='fade' onRequestClose={closeModal} statusBarTranslucent={true}>
			<View style={{ flex: 1 }}>
				<ScreenHeader label='Reports' showBackButton={true} handleBack={closeModal} />
				<View style={{ width: '100%', flex: 1 }}>
					<ScrollView>
						<FlatList
							nestedScrollEnabled={true}
							scrollEnabled={false}
							data={reports}
							keyExtractor={(item) => item._id}
							style={{ width: '100%' }}
							renderItem={({ item }) => (
								<View
									style={{
										paddingHorizontal: 20,
										paddingVertical: 20,
									}}
								>
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
											{format(new Date(item._id), 'MMMM dd, yyyy')}
										</Text>
									</View>
									<FlatList
										data={item.karateClasses}
										keyExtractor={(item) => item._id}
										style={{ width: '100%', marginTop: 5 }}
										renderItem={({ item }) => {
											const presents = item.attendance.filter((item) => isStudentPresent(item.attendanceStatus))?.length
											const absents = item.attendance.filter((item) => !isStudentPresent(item.attendanceStatus))?.length
											return (
												<>
													<View
														style={{
															borderColor: colors.variants.secondary[1],
															borderWidth: 1,
															width: '100%',
															padding: 10,
														}}
													>
														<Text
															numberOfLines={1}
															style={{ fontSize: 14, fontWeight: 500, color: colors.variants.secondary[5] }}
														>
															{item.karateClassName}
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
																		backgroundColor: 'red',
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
																		<StatusIcon 
																			status={item.attendanceStatus} 
																			size={30} 
																		/>
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

export default DailyReportDetailsModal
