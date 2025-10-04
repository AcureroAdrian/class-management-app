import { Text, View, TextStyle } from "react-native";

interface IBadgeProps {
	text: string
	backgroundColor: string
	textColor: string
	fontSize?: number
	fontWeight?: TextStyle['fontWeight']
}

export const Badge = ({ text, backgroundColor, textColor, fontSize = 10, fontWeight = '600' }: IBadgeProps) => (
	<View
		style={{
			backgroundColor,
			paddingHorizontal: 6,
			paddingVertical: 2,
			borderRadius: 8,
		}}
	>
		<Text style={{ color: textColor, fontSize: fontSize, fontWeight: fontWeight, textAlign: 'center' }}>{text}</Text>
	</View>
)

export const BADGE_CONFIG = {
	trial: { backgroundColor: '#FFF3CD', textColor: '#856404', text: 'TRIAL' },
	dayOnly: { backgroundColor: '#E1F5FE', textColor: '#01579B', text: 'DAY' },
	recovery: { backgroundColor: '#FFF9C4', textColor: '#F57F17', text: 'MAKEUP' },
	scheduledDeletion: { backgroundColor: '#FFEBEE', textColor: '#C62828', text: 'DEL' },
}