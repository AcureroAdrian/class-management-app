import React, { useEffect, useMemo } from 'react'
import { View, Modal, Text, ScrollView, Image } from 'react-native'
import { Link } from 'expo-router'
import ScreenHeader from '@/components/ScreenHeader/ScreenHeader'
import { useAppSelector } from '@/redux/store'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import colors from '@/theme/colors'

const InfoModal = ({ openModal, closeModal }: { openModal: boolean; closeModal: () => void }) => {
	const { userInfo } = useAppSelector((state) => state.userLogin)

	useEffect(() => {
		return () => {
			closeModal()
		}
	}, [])

	const dob = useMemo(() => {
		if (!userInfo?.dateOfBirth) return null

		const { year, month, day } = userInfo.dateOfBirth

		return new Date(year, month - 1, day, 12, 0, 0)
	}, [userInfo])

	return (
		<Modal visible={openModal} animationType='fade' onRequestClose={closeModal} statusBarTranslucent={true}>
			<View style={{ flex: 1, backgroundColor: colors.primary }}>
				<ScreenHeader label='About' showBackButton={true} handleBack={closeModal} />
				<ScrollView 
					style={{ flex: 1 }}
					contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 24, paddingBottom: 40 }}
					showsVerticalScrollIndicator={false}
				>
					{/* Header Section */}
					<View style={{ marginBottom: 32 }}>
						<View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
							<View style={{ 
								backgroundColor: colors.brand,
								borderRadius: 12,
								padding: 8,
								marginRight: 12
							}}>
								<MaterialCommunityIcons name="information" size={24} color={colors.view.primary} />
							</View>
							<Text style={{ 
								fontSize: 24, 
								fontWeight: '700', 
								color: colors.variants.secondary[5],
								flex: 1,
								letterSpacing: -0.5
							}}>
								About Us
							</Text>
						</View>
						<Text style={{ 
							fontSize: 16, 
							color: colors.variants.grey[4],
							lineHeight: 22,
							marginLeft: 52,
							letterSpacing: -0.2
						}}>
							Information about Miyagi Ken International Academy
						</Text>
					</View>

					{/* Logo Section */}
					<View style={{ 
						backgroundColor: colors.view.primary,
						borderRadius: 16,
						padding: 32,
						alignItems: 'center',
						marginBottom: 24,
						shadowColor: '#000',
						shadowOffset: { width: 0, height: 2 },
						shadowOpacity: 0.1,
						shadowRadius: 8,
						elevation: 3,
						borderWidth: 1,
						borderColor: colors.variants.secondary[1]
					}}>
						<Image 
							source={require('../../../../assets/img/logo.png')} 
							style={{ width: 120, height: 120, marginBottom: 16 }}
							resizeMode='contain'
						/>
						<Text style={{ 
							fontSize: 28, 
							fontWeight: '700', 
							color: colors.variants.secondary[5],
							textAlign: 'center',
							letterSpacing: -0.5,
							marginBottom: 8
						}}>
							MIYAGI KEN
						</Text>
						<Text style={{ 
							fontSize: 18, 
							fontWeight: '600', 
							color: colors.brand,
							textAlign: 'center',
							letterSpacing: -0.3
						}}>
							International Academy
						</Text>
					</View>

					{/* Location Cards */}
					<View style={{ gap: 20 }}>
						{/* Spring Location */}
						<View style={{ 
							backgroundColor: colors.view.primary,
							borderRadius: 16,
							padding: 20,
							shadowColor: '#000',
							shadowOffset: { width: 0, height: 2 },
							shadowOpacity: 0.1,
							shadowRadius: 8,
							elevation: 3,
							borderWidth: 1,
							borderColor: colors.variants.secondary[1]
						}}>
							<View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
								<MaterialCommunityIcons name="map-marker" size={24} color={colors.brand} />
								<Text style={{ 
									fontSize: 18, 
									fontWeight: '700', 
									color: colors.variants.secondary[5],
									marginLeft: 12,
									letterSpacing: -0.3
								}}>
									Spring Location
								</Text>
							</View>
							<View style={{ gap: 12 }}>
								<View style={{ flexDirection: 'row', alignItems: 'center' }}>
									<MaterialCommunityIcons name="home" size={16} color={colors.variants.grey[4]} />
									<Text style={{ 
										fontSize: 14, 
										color: colors.variants.secondary[4],
										marginLeft: 8,
										letterSpacing: -0.1
									}}>
										22936 Kuykendahl Rd, Suite A
									</Text>
								</View>
								<View style={{ flexDirection: 'row', alignItems: 'center' }}>
									<MaterialCommunityIcons name="city" size={16} color={colors.variants.grey[4]} />
									<Text style={{ 
										fontSize: 14, 
										color: colors.variants.secondary[4],
										marginLeft: 8,
										letterSpacing: -0.1
									}}>
										Spring TX 77389
									</Text>
								</View>
								<View style={{ flexDirection: 'row', alignItems: 'center' }}>
									<MaterialCommunityIcons name="email" size={16} color={colors.variants.grey[4]} />
									<Text style={{ 
										fontSize: 14, 
										color: colors.variants.secondary[4],
										marginLeft: 8,
										letterSpacing: -0.1
									}}>
										dojo.miyagiken@gmail.com
									</Text>
								</View>
								<View style={{ flexDirection: 'row', alignItems: 'center' }}>
									<MaterialCommunityIcons name="phone" size={16} color={colors.variants.grey[4]} />
									<Text style={{ 
										fontSize: 14, 
										color: colors.variants.secondary[4],
										marginLeft: 8,
										letterSpacing: -0.1
									}}>
										(936) 217-3081
									</Text>
								</View>
							</View>
						</View>

						{/* Katy Location */}
						<View style={{ 
							backgroundColor: colors.view.primary,
							borderRadius: 16,
							padding: 20,
							shadowColor: '#000',
							shadowOffset: { width: 0, height: 2 },
							shadowOpacity: 0.1,
							shadowRadius: 8,
							elevation: 3,
							borderWidth: 1,
							borderColor: colors.variants.secondary[1]
						}}>
							<View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
								<MaterialCommunityIcons name="map-marker" size={24} color={colors.brand} />
								<Text style={{ 
									fontSize: 18, 
									fontWeight: '700', 
									color: colors.variants.secondary[5],
									marginLeft: 12,
									letterSpacing: -0.3
								}}>
									Katy Location
								</Text>
							</View>
							<View style={{ gap: 12 }}>
								<View style={{ flexDirection: 'row', alignItems: 'center' }}>
									<MaterialCommunityIcons name="home" size={16} color={colors.variants.grey[4]} />
									<Text style={{ 
										fontSize: 14, 
										color: colors.variants.secondary[4],
										marginLeft: 8,
										letterSpacing: -0.1
									}}>
										5206 E 3rd St, Katy, TX 77493
									</Text>
								</View>
								<View style={{ flexDirection: 'row', alignItems: 'center' }}>
									<MaterialCommunityIcons name="email" size={16} color={colors.variants.grey[4]} />
									<Text style={{ 
										fontSize: 14, 
										color: colors.variants.secondary[4],
										marginLeft: 8,
										letterSpacing: -0.1
									}}>
										info@miyagikeninternational.com
									</Text>
								</View>
								<View style={{ flexDirection: 'row', alignItems: 'center' }}>
									<MaterialCommunityIcons name="phone" size={16} color={colors.variants.grey[4]} />
									<Text style={{ 
										fontSize: 14, 
										color: colors.variants.secondary[4],
										marginLeft: 8,
										letterSpacing: -0.1
									}}>
										(936) 217-3155
									</Text>
								</View>
							</View>
						</View>
					</View>

					{/* Social Media Section */}
					<View style={{ 
						backgroundColor: colors.view.primary,
						borderRadius: 16,
						padding: 20,
						marginTop: 24,
						shadowColor: '#000',
						shadowOffset: { width: 0, height: 2 },
						shadowOpacity: 0.1,
						shadowRadius: 8,
						elevation: 3,
						borderWidth: 1,
						borderColor: colors.variants.secondary[1]
					}}>
						<View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
							<MaterialCommunityIcons name="share-variant" size={24} color={colors.brand} />
							<Text style={{ 
								fontSize: 18, 
								fontWeight: '700', 
								color: colors.variants.secondary[5],
								marginLeft: 12,
								letterSpacing: -0.3
							}}>
								Connect With Us
							</Text>
						</View>
						<Text style={{ 
							fontSize: 14, 
							color: colors.variants.secondary[4],
							marginBottom: 16,
							letterSpacing: -0.1
						}}>
							Stay connected with us on social media:
						</Text>
						<View style={{ flexDirection: 'row', gap: 16, alignItems: 'center' }}>
							<Link href={'https://www.instagram.com/miyagikeninternational/'}>
								<Text style={{ 
									fontSize: 16, 
									color: colors.brand,
									fontWeight: '600',
									letterSpacing: -0.2
								}}>
									Instagram
								</Text>
							</Link>
							<Text style={{ color: colors.variants.grey[3] }}>|</Text>
							<Link href={'https://www.facebook.com/MiyagiKenInternational/'}>
								<Text style={{ 
									fontSize: 16, 
									color: colors.brand,
									fontWeight: '600',
									letterSpacing: -0.2
								}}>
									Facebook
								</Text>
							</Link>
						</View>
					</View>
				</ScrollView>
			</View>
		</Modal>
	)
}

export default InfoModal
