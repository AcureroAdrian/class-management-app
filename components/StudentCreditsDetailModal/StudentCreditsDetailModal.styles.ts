import styled from 'styled-components/native'
import colors from '@/theme/colors'

export const Container = styled.View`
	flex: 1;
	background-color: ${colors.variants.grey[0]};
`

export const LoaderContainer = styled.View`
	flex: 1;
	justify-content: center;
	align-items: center;
	padding: 20px;
`

export const LoaderText = styled.Text`
	margin-top: 16px;
	font-size: 16px;
	color: ${colors.variants.grey[5]};
	font-family: 'Lato-Regular';
`

export const ErrorContainer = styled.View`
	flex: 1;
	justify-content: center;
	align-items: center;
	padding: 20px;
`

export const ErrorText = styled.Text`
	margin-top: 16px;
	font-size: 16px;
	color: ${colors.variants.error[5]};
	font-family: 'Lato-Regular';
	text-align: center;
`

export const SummaryCard = styled.View`
	background-color: ${colors.variants.primary[5]};
	margin: 16px;
	padding: 24px;
	border-radius: 16px;
	shadow-color: #000;
	shadow-offset: 0px 4px;
	shadow-opacity: 0.15;
	shadow-radius: 8px;
	elevation: 6;
`

export const SummaryTitle = styled.Text`
	font-size: 16px;
	color: ${colors.variants.primary[0]};
	font-family: 'Lato-Bold';
	margin-bottom: 16px;
	opacity: 0.9;
`

export const TotalCreditsContainer = styled.View`
	align-items: center;
	margin-bottom: 8px;
`

export const TotalCreditsLabel = styled.Text`
	font-size: 14px;
	color: ${colors.variants.primary[0]};
	font-family: 'Lato-Regular';
	margin-bottom: 8px;
	opacity: 0.85;
`

export const TotalCreditsValue = styled.Text<{ available: boolean }>`
	font-size: 56px;
	color: ${(props) => (props.available ? colors.variants.success[0] : colors.variants.error[0])};
	font-family: 'Lato-Bold';
	line-height: 64px;
`

export const FrozenBadge = styled.View`
	flex-direction: row;
	align-items: center;
	justify-content: center;
	background-color: ${colors.variants.info[5]};
	padding: 8px 16px;
	border-radius: 20px;
	margin-top: 12px;
`

export const FrozenText = styled.Text`
	font-size: 13px;
	color: ${colors.variants.info[0]};
	font-family: 'Lato-Bold';
	margin-left: 6px;
`

export const Section = styled.View`
	margin: 0 16px 16px 16px;
`

export const SectionHeader = styled.View`
	flex-direction: row;
	align-items: center;
	margin-bottom: 12px;
`

export const SectionTitle = styled.Text`
	font-size: 18px;
	color: ${colors.variants.grey[7]};
	font-family: 'Lato-Bold';
	margin-left: 8px;
`

export const Card = styled.View`
	background-color: ${colors.white};
	padding: 16px;
	border-radius: 12px;
	shadow-color: #000;
	shadow-offset: 0px 2px;
	shadow-opacity: 0.08;
	shadow-radius: 4px;
	elevation: 3;
`

export const InfoRow = styled.View`
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	padding: 8px 0;
`

export const InfoLabel = styled.Text<{ bold?: boolean }>`
	font-size: 15px;
	color: ${colors.variants.grey[6]};
	font-family: ${(props) => (props.bold ? 'Lato-Bold' : 'Lato-Regular')};
	flex: 1;
`

export const InfoValue = styled.Text<{ highlight?: boolean; bold?: boolean }>`
	font-size: 16px;
	color: ${(props) => (props.highlight ? colors.variants.primary[5] : colors.variants.grey[7])};
	font-family: ${(props) => (props.bold ? 'Lato-Bold' : 'Lato-Bold')};
	min-width: 40px;
	text-align: right;
`

export const PlanBadge = styled.View`
	background-color: ${colors.variants.secondary[1]};
	padding: 6px 14px;
	border-radius: 16px;
`

export const PlanText = styled.Text`
	font-size: 14px;
	color: ${colors.variants.secondary[6]};
	font-family: 'Lato-Bold';
`

export const BreakdownRow = styled.View`
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	padding: 10px 0;
`

export const BreakdownLabel = styled.Text`
	font-size: 14px;
	color: ${colors.variants.grey[6]};
	font-family: 'Lato-Regular';
	flex: 1;
	flex-direction: row;
	align-items: center;
`

export const BreakdownDot = styled.View<{ color: string }>`
	width: 8px;
	height: 8px;
	border-radius: 4px;
	background-color: ${(props) => props.color};
	margin-right: 8px;
`

export const BreakdownValue = styled.Text<{ highlight?: boolean }>`
	font-size: 16px;
	color: ${(props) => (props.highlight ? colors.variants.warning[6] : colors.variants.grey[7])};
	font-family: 'Lato-Bold';
	min-width: 40px;
	text-align: right;
`

export const Divider = styled.View`
	height: 1px;
	background-color: ${colors.variants.grey[2]};
	margin: 8px 0;
`

export const HintText = styled.Text`
	font-size: 12px;
	color: ${colors.variants.grey[5]};
	font-family: 'Lato-Italic';
	margin-top: 8px;
	font-style: italic;
`

export const FinalCard = styled.View`
	background-color: ${colors.variants.secondary[5]};
	margin: 16px;
	padding: 20px;
	border-radius: 16px;
	shadow-color: #000;
	shadow-offset: 0px 4px;
	shadow-opacity: 0.15;
	shadow-radius: 8px;
	elevation: 6;
`

export const FinalTitle = styled.Text`
	font-size: 16px;
	color: ${colors.variants.secondary[0]};
	font-family: 'Lato-Bold';
	margin-bottom: 16px;
	opacity: 0.9;
`

export const CalculationRow = styled.View<{ final?: boolean }>`
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	padding: ${(props) => (props.final ? '12px 0 0 0' : '8px 0')};
`

export const CalculationLabel = styled.Text<{ final?: boolean }>`
	font-size: ${(props) => (props.final ? '18px' : '15px')};
	color: ${(props) => (props.final ? colors.variants.secondary[0] : colors.variants.secondary[1])};
	font-family: ${(props) => (props.final ? 'Lato-Bold' : 'Lato-Regular')};
	flex: 1;
`

export const CalculationValue = styled.Text<{ final?: boolean; positive?: boolean; available?: boolean }>`
	font-size: ${(props) => (props.final ? '32px' : '16px')};
	color: ${(props) => {
		if (props.final) {
			return props.available ? colors.variants.success[0] : colors.variants.error[0]
		}
		if (props.positive !== undefined) {
			return props.positive ? colors.variants.success[0] : colors.variants.error[0]
		}
		return colors.variants.secondary[0]
	}};
	font-family: 'Lato-Bold';
	min-width: ${(props) => (props.final ? '60px' : '50px')};
	text-align: right;
`


