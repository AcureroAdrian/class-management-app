import styled from 'styled-components/native';
import colors from '@/theme/colors';
import { TextInput } from 'react-native';

export const ScreenContainer = styled.View`
    flex: 1;
    width: 100%;
    justify-content: flex-start;
    align-items: center;
    background-color: ${colors.primary};
`;

export const LoaderContainer = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    width: 100%;
    padding: 24px;
`;

export const ErrorContainer = styled.View`
    align-items: center;
    justify-content: center;
    flex: 1;
    width: 100%;
    padding: 24px;
`;

export const ErrorText = styled.Text`
    font-size: 16px;
    font-weight: 500;
    color: ${colors.variants.primary[5]};
    text-align: center;
    letter-spacing: -0.2px;
`;

export const SearchContainer = styled.View`
    width: 100%;
    padding: 20px 24px 16px 24px;
`;

export const SearchInputContainer = styled.View`
    position: relative;
    width: 100%;
`;

export const SearchInput = styled(TextInput)`
    width: 100%;
    background-color: ${colors.variants.grey[0]};
    padding-left: 56px;
    padding-right: 20px;
    border-radius: 16px;
    font-size: 16px;
    height: 52px;
    color: ${colors.variants.secondary[5]};
    font-weight: 400;
    letter-spacing: -0.2px;
    border-width: 1px;
    border-color: ${colors.variants.grey[1]};
`;

export const StudentItemContainer = styled.View`
    width: 100%;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 16px 24px;
    background-color: ${colors.primary};
`;

export const StudentInfoPressable = styled.Pressable`
    flex: 1;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin-right: 12px;
`;

export const StudentInfoContainer = styled.View`
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    gap: 16px;
    flex: 1;
`;

export const StudentAvatar = styled.Image`
    width: 52px;
    height: 52px;
    border-radius: 26px;
    border-width: 2px;
    border-color: ${colors.variants.grey[0]};
`;

export const StudentNameContainer = styled.View`
    justify-content: center;
    flex: 1;
    gap: 2px;
`;

export const StudentName = styled.Text`
    font-size: 16px;
    font-weight: 600;
    color: ${colors.variants.secondary[5]};
    letter-spacing: -0.2px;
`;

export const StudentLastName = styled.Text`
    font-size: 14px;
    font-weight: 500;
    color: ${colors.variants.grey[3]};
    letter-spacing: -0.1px;
`;

export const BadgesContainer = styled.View`
    flex-direction: column;
    margin-top: 8px;
    gap: 6px;
    align-items: flex-end;
`;

export const DeleteIconContainer = styled.View`
    justify-content: center;
    align-items: center;
    padding: 8px;
    border-radius: 12px;
    background-color: ${colors.variants.primary[0]};
    border-width: 1px;
    border-color: ${colors.variants.primary[2]};
    min-width: 40px;
    min-height: 40px;
`;

export const SeparatorContainer = styled.View`
    width: 100%;
    align-items: center;
    padding: 0 24px;
    margin-vertical: 2px;
`;

export const Separator = styled.View`
    width: 100%;
    height: 1px;
    background-color: ${colors.variants.grey[0]};
`; 