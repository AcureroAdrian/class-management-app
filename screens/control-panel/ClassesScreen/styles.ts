import styled from 'styled-components/native';
import { View, Text, Pressable } from 'react-native';
import colors from '@/theme/colors';

export const ScreenContainer = styled(View)`
    flex: 1;
    width: 100%;
    justify-content: flex-start;
    align-items: center;
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
`;

export const ErrorContainer = styled(View)`
    align-items: center;
    justify-content: center;
    margin-top: 20px;
`;

export const ErrorText = styled(Text)`
    font-size: 16px;
    color: red;
`;

export const StudentInfoContainer = styled(View)`
    width: 100%;
    align-items: flex-start;
    margin: 10px 0;
    padding: 0 20px;
`;

export const RecoveryCreditsText = styled(Text)`
    font-size: 16px;
    font-weight: 500;
    color: ${colors.red};
`;

export const ReservedInfoContainer = styled(View)`
    flex-direction: row;
    align-items: center;
    gap: 5px;
`;

export const ReservedText = styled(Text)`
    font-size: 16px;
    font-weight: 500;
`;

export const ListContainer = styled(View)`
    width: 100%;
    flex: 1;
    align-items: center;
    padding: 1px 0;
`;

export const ClassItem = styled(Pressable)`
    width: 100%;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 20px;
`;

export const ClassInfo = styled(View)`
    width: 60%;
    align-items: flex-start;
    gap: 10px;
`;

export const ClassName = styled(Text)`
    font-size: 18px;
    color: ${colors.view.black};
`;

export const ClassDescription = styled(Text)`
    font-size: 16px;
    color: ${colors.variants.grey[4]};
`;

export const ClassDetails = styled(View)`
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    width: 40%;
`;

export const ClassDetailsInfo = styled(View)`
    align-items: flex-end;
    padding: 10px 0;
`;

export const StudentsCount = styled.Text<{hasStudents: boolean;}>`
    color: ${({ hasStudents }: { hasStudents: boolean }) => (hasStudents ? 'black' : colors.view.secondary)};
`;

export const ScheduleText = styled(Text)`
    font-size: 12px;
    margin-top: 2px;
    color: ${colors.variants.grey[5]};
`;

export const LocationText = styled.Text<{ location?: string }>`
    font-size: 12px;
    margin-top: 2px;
    color: ${({ location }: { location?: string }) =>
        location === 'spring'
            ? colors.variants.primary[4]
            : location === 'katy'
            ? colors.variants.secondary[2]
            : colors.variants.grey[5]};
    font-weight: 500;
`;

export const DeleteButtonContainer = styled(Pressable)`
    width: 40px;
    height: 50px;
    justify-content: center;
    align-items: center;
`;

export const StarContainer = styled(View)`
    width: 40px;
    justify-content: center;
    align-items: center;
`;

export const Separator = styled(View)`
    width: 90%;
    align-self: center;
    height: 1px;
    background-color: ${colors.variants.grey[1]};
`; 