import styled from 'styled-components/native';
import { View, Text, Pressable, Image, Modal } from 'react-native';
import colors from '@/theme/colors';

export const ModalContainer = styled(Modal)``;

export const ModalContent = styled(View)`
    flex: 1;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
`;

export const ContentContainer = styled(View)`
    width: 100%;
    align-items: center;
    flex: 1;
`;

export const LoaderView = styled(View)`
    flex: 1;
    justify-content: center;
    align-items: center;
    width: 100%;
`;

export const ErrorView = styled(View)`
    align-items: center;
    justify-content: center;
    margin-top: 20px;
`;

export const ErrorText = styled(Text)`
    font-size: 16px;
    color: ${colors.variants.primary[5]};
`;

export const NoStudentsView = styled(View)`
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    padding: 20px;
    gap: 20px;
`;

export const NoStudentsText = styled(Text)`
    font-size: 16px;
    color: ${colors.variants.primary[5]};
`;

export const PickStudentsButton = styled(Pressable)``;

export const PickStudentsButtonView = styled(View)`
    background-color: ${colors.variants.secondary[5]};
    padding: 10px 40px;
    border-radius: 10px;
`;

export const PickStudentsButtonText = styled(Text)`
    color: ${colors.primary};
    font-size: 16px;
    font-weight: 500;
`;

export const StudentItemView = styled(View)`
    padding-top: 12px;
`;

export const StudentItemContent = styled(View)`
    flex-direction: row;
    align-items: center;
    width: 100%;
    flex: 1;
    justify-content: space-between;
    padding: 8px 20px;
`;

export const StudentInfoView = styled(View)`
    flex-direction: row;
    align-items: center;
    gap: 10px;
    width: 100%;
    flex: 1;
`;

export const StudentAvatar = styled(Image)`
    width: 50px;
    height: 50px;
    border-radius: 50px;
`;

export const StudentNameView = styled(View)`
    justify-content: center;
    align-items: flex-start;
    width: 100%;
    flex-direction: column;
`;

export const StudentName = styled(Text)`
    font-size: 16px;
    color: ${colors.view.black};
`;

export const StudentLastName = styled(Text)`
    font-size: 14px;
    color: ${colors.variants.grey[4]};
`;

export const Separator = styled(View)`
    width: 100%;
    align-items: center;
    padding: 0 20px;
`;

export const SeparatorLine = styled(View)`
    width: 100%;
    height: 1px;
    background-color: ${colors.variants.grey[0]};
`; 