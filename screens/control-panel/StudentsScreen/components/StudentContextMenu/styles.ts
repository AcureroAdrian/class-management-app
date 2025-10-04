import styled from 'styled-components/native'
import colors from '@/theme/colors'

export const Overlay = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  justify-content: flex-end;
  z-index: 1000;
`

export const MenuContainer = styled.View`
  margin: 20px;
  margin-bottom: 40px;
`

export const MenuContent = styled.View`
  background-color: ${colors.primary};
  border-radius: 20px;
  padding: 0;
  shadow-color: #000;
  shadow-offset: 0px 8px;
  shadow-opacity: 0.25;
  shadow-radius: 20px;
  elevation: 20;
`

export const MenuTitle = styled.Text`
  font-size: 18px;
  font-weight: 600;
  text-align: center;
  color: ${colors.variants.secondary[5]};
  padding: 24px 20px 16px 20px;
  letter-spacing: -0.3px;
`

export const MenuButton = styled.Pressable`
  padding: 0;
  margin: 0 16px;
  border-radius: 16px;
  background-color: ${colors.view.secondary};
  margin-bottom: 16px;
`

export const MenuButtonContent = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 18px 24px;
`

export const MenuButtonText = styled.Text`
  font-size: 16px;
  font-weight: 600;
  color: ${colors.primary};
  letter-spacing: -0.2px;
`

export const CancelButton = styled.Pressable`
  padding: 18px 24px;
  margin: 8px 16px 16px 16px;
  border-radius: 16px;
  background-color: ${colors.variants.grey[0]};
  border-width: 1px;
  border-color: ${colors.variants.grey[1]};
`

export const CancelButtonText = styled.Text`
  font-size: 16px;
  font-weight: 600;
  text-align: center;
  color: ${colors.variants.secondary[4]};
  letter-spacing: -0.2px;
` 