import React from 'react'
import { View, Text, Modal, FlatList, Image, ScrollView } from 'react-native'
import KeyboardAvoidingWrapper from '@/components/KeyboardAvoidingWrapper/KeyboardAvoidingWrapper'
import ScreenHeader from '@/components/ScreenHeader/ScreenHeader'
import { IDailyReport } from '../helpers/report-screen-interfaces'
import { format } from 'date-fns'
import { AntDesign } from '@expo/vector-icons'
import capitalizeWords from '@/shared/capitalize-words'

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
		<>
			<Modal visible={openModal} animationType='slide' onRequestClose={closeModal} statusBarTranslucent={true}>
				<KeyboardAvoidingWrapper>
					<View style={{ flex: 1 }}>
						<ScreenHeader label='Reports' showBackButton={true} handleBack={closeModal} />
						<View style={{ width: '100%', alignItems: 'center', paddingBottom: 20, flex: 1 }}>
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
												paddingHorizontal: 10,
												marginVertical: 10,
											}}
										>
											<View
												style={{
													borderColor: 'skyblue',
													borderWidth: 1,
													width: '100%',
													paddingHorizontal: 10,
													backgroundColor: 'skyblue',
												}}
											>
												<Text numberOfLines={1} style={{ fontSize: 12 }}>
													{format(new Date(item._id), 'MMMM dd, yyyy')}
												</Text>
											</View>
											<FlatList
												data={item.karateClasses}
												keyExtractor={(item) => item._id}
												style={{ width: '100%', marginTop: 5 }}
												renderItem={({ item }) => {
													const presents = item.attendance.filter((item) => item.attendanceStatus === 'present')?.length
													const absents = item.attendance.filter((item) => item.attendanceStatus === 'absent')?.length
													return (
														<>
															<View
																style={{
																	borderColor: 'skyblue',
																	borderWidth: 1,
																	width: '100%',
																	padding: 10,
																}}
															>
																<Text numberOfLines={1} style={{ fontSize: 12 }}>
																	{item.karateClassName}
																</Text>
															</View>
															<View
																style={{
																	borderColor: 'skyblue',
																	borderWidth: 1,
																	width: '100%',
																	padding: 5,
																	marginTop: 5,
																	backgroundColor: 'skyblue',
																	flexDirection: 'row',
																	justifyContent: 'space-between',
																}}
															>
																<View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
																	{Boolean(presents) && (
																		<View
																			style={{
																				backgroundColor: 'green',
																				padding: 5,
																				width: 24,
																				height: 24,
																				justifyContent: 'center',
																				alignItems: 'center',
																				borderRadius: '50%',
																			}}
																		>
																			<Text style={{ color: 'white', fontSize: 10 }}>{presents}</Text>
																		</View>
																	)}
																	{Boolean(absents) && (
																		<View
																			style={{
																				backgroundColor: 'red',
																				padding: 5,
																				width: 24,
																				height: 24,
																				justifyContent: 'center',
																				alignItems: 'center',
																				borderRadius: '50%',
																			}}
																		>
																			<Text style={{ color: 'white', fontSize: 10 }}>{absents}</Text>
																		</View>
																	)}
																</View>
																<Text numberOfLines={1} style={{ fontSize: 12 }}>
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
																					borderColor: 'skyblue',
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
																					borderColor: 'skyblue',
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
																					<AntDesign name='close' size={30} color='red' />
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
				</KeyboardAvoidingWrapper>
			</Modal>
		</>
	)
}

export default DailyReportDetailsModal
