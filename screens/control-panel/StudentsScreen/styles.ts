import styled from 'styled-components/native';
import colors from '@/theme/colors';
import { TextInput } from 'react-native';

export const ScreenContainer = styled.View`
    flex: 1;
    width: 100%;
    justify-content: flex-start;
    align-items: center;
`;

export const LoaderContainer = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    width: 100%;
    padding: 20px;
`;

export const ErrorContainer = styled.View`
    align-items: center;
    justify-content: center;
    flex: 1;
    width: 100%;
    padding: 20px;
`;

export const ErrorText = styled.Text`
    font-size: 16px;
    color: red;
`;

export const SearchContainer = styled.View`
    width: 100%;
    padding: 24px 20px 8px;
`;

export const SearchInputContainer = styled.View`
    position: relative;
    width: 100%;
`;

export const SearchInput = styled(TextInput)`
    width: 100%;
    background-color: ${colors.variants.secondary[0]};
    padding-left: 55px;
    padding-right: 20px;
    border-radius: 10px;
    font-size: 18px;
    height: 50px;
    color: ${colors.variants.secondary[5]};
`;

export const StudentItemContainer = styled.View`
    width: 100%;
    flex-direction: row;
    align-items: center;
    gap: 10px;
    justify-content: space-between;
    padding: 8px 20px;
`;

export const StudentInfoPressable = styled.Pressable`
    width: 80%;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`;

export const StudentInfoContainer = styled.View`
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    gap: 10px;
    width: 100%;
`;

export const StudentAvatar = styled.Image`
    width: 48px;
    height: 48px;
    border-radius: 50px;
`;

export const StudentNameContainer = styled.View`
    justify-content: center;
    position: relative;
`;

export const StudentName = styled.Text`
    font-size: 16px;
    color: ${colors.view.black};
`;

export const StudentLastName = styled.Text`
    font-size: 14px;
    color: ${colors.variants.grey[4]};
`;

export const BadgesContainer = styled.View`
    flex-direction: column;
    margin-top: 4px;
    gap: 4px;
`;

export const DeleteIconContainer = styled.View`
    justify-content: center;
    align-items: center;
    width: 40px;
`;

export const SeparatorContainer = styled.View`
    width: 100%;
    align-items: center;
    padding: 0 20px;
`;

export const Separator = styled.View`
    width: 100%;
    height: 1px;
    background-color: ${colors.variants.grey[0]};
`; 