import styled from 'styled-components/native';
import { View, Text, Pressable } from 'react-native';
import colors from '@/theme/colors';

export const ScreenContainer = styled(View)`
    flex: 1;
    width: 100%;
    justify-content: flex-start;
    align-items: center;
    background-color: ${colors.primary};
`;

export const ContentContainer = styled.View`
    width: 100%;
    align-items: center;
    flex: 1;
`;

export const LoaderContainer = styled(View)`
    flex: 1;
    justify-content: center;
    align-items: center;
    width: 100%;
    padding: 24px;
`;

export const ErrorContainer = styled(View)`
    align-items: center;
    justify-content: center;
    flex: 1;
    width: 100%;
    padding: 24px;
`;

export const ErrorText = styled(Text)`
    font-size: 16px;
    font-weight: 500;
    color: ${colors.variants.primary[5]};
    text-align: center;
    letter-spacing: -0.2px;
`;

export const StudentInfoContainer = styled(View)`
    width: 100%;
    align-items: flex-start;
    margin: 16px 0;
    padding: 20px 24px;
    background-color: ${colors.variants.primary[0]};
    border-radius: 16px;
    margin-horizontal: 24px;
    border-width: 1px;
    border-color: ${colors.variants.primary[1]};
`;

export const RecoveryCreditsText = styled(Text)`
    font-size: 16px;
    font-weight: 600;
    color: ${colors.variants.primary[5]};
    letter-spacing: -0.2px;
    margin-bottom: 8px;
`;

export const ReservedInfoContainer = styled(View)`
    flex-direction: row;
    align-items: center;
    gap: 8px;
`;

export const ReservedText = styled(Text)`
    font-size: 14px;
    font-weight: 500;
    color: ${colors.variants.grey[3]};
    letter-spacing: -0.1px;
`;

export const ListContainer = styled(View)`
    width: 100%;
    flex: 1;
    align-items: center;
`;

export const ClassItem = styled(Pressable)`
    width: 100%;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 20px 24px;
    background-color: ${colors.primary};
`;

export const ClassInfo = styled(View)`
    flex: 1;
    align-items: flex-start;
    margin-right: 16px;
`;

export const ClassName = styled(Text)`
    font-size: 18px;
    font-weight: 600;
    color: ${colors.variants.secondary[5]};
    letter-spacing: -0.3px;
    margin-bottom: 4px;
`;

export const ClassDescription = styled(Text)`
    font-size: 15px;
    color: ${colors.variants.grey[3]};
    font-weight: 400;
    letter-spacing: -0.1px;
    line-height: 20px;
`;

export const ClassDetails = styled(View)`
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    gap: 12px;
`;

export const ClassDetailsInfo = styled(View)`
    align-items: flex-end;
    gap: 4px;
`;

export const StudentsCount = styled.Text<{hasStudents: boolean;}>`
    font-size: 13px;
    font-weight: 600;
    letter-spacing: -0.1px;
    color: ${({ hasStudents }: { hasStudents: boolean }) => 
        (hasStudents ? colors.variants.secondary[5] : colors.variants.grey[3])};
`;

export const ScheduleText = styled(Text)`
    font-size: 12px;
    color: ${colors.variants.grey[4]};
    font-weight: 500;
    letter-spacing: -0.1px;
`;

export const LocationText = styled.Text<{ location?: string }>`
    font-size: 12px;
    font-weight: 600;
    letter-spacing: -0.1px;
    color: ${({ location }: { location?: string }) =>
        location === 'spring'
            ? colors.variants.primary[4]
            : location === 'katy'
            ? colors.variants.secondary[4]
            : colors.variants.grey[4]};
`;

export const DeleteButtonContainer = styled(Pressable)`
    padding: 8px;
    border-radius: 12px;
    background-color: ${colors.variants.primary[0]};
    border-width: 1px;
    border-color: ${colors.variants.primary[2]};
    justify-content: center;
    align-items: center;
`;

export const StarContainer = styled(View)`
    padding: 8px;
    border-radius: 12px;
    background-color: ${colors.variants.secondary[0]};
    border-width: 1px;
    border-color: ${colors.variants.secondary[2]};
    justify-content: center;
    align-items: center;
`;

export const Separator = styled(View)`
    width: 100%;
    align-items: center;
    padding: 0 24px;
    margin-vertical: 2px;
`;

export const SeparatorLine = styled(View)`
    width: 100%;
    height: 1px;
    background-color: ${colors.variants.grey[0]};
`; 