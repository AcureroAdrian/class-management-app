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
    margin: 16px 0;
    padding: 0 20px;
`;

export const StudentInfoCard = styled(View)`
    background-color: ${colors.variants.secondary[0]};
    padding: 18px 20px;
    border-radius: 16px;
    elevation: 0;
    shadow-color: ${colors.variants.secondary[2]};
    shadow-offset: 0px 4px;
    shadow-opacity: 0.06;
    shadow-radius: 8px;
    border-width: 1px;
    border-color: ${colors.variants.secondary[1]};
    position: relative;
    overflow: hidden;
`;

export const StudentInfoAccent = styled(View)`
    position: absolute;
    top: 0;
    right: 0;
    width: 60px;
    height: 60px;
    background-color: ${colors.variants.secondary[1]};
    border-bottom-left-radius: 30px;
    opacity: 0.4;
`;

export const StudentInfoHeader = styled(View)`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
    position: relative;
    z-index: 1;
`;

export const StudentInfoTitle = styled(Text)`
    font-size: 17px;
    font-weight: 700;
    color: ${colors.variants.secondary[5]};
    letter-spacing: -0.3px;
`;

export const RecoveryCreditsContainer = styled(View)`
    background-color: ${colors.variants.secondary[2]};
    padding: 10px 14px;
    border-radius: 12px;
    flex-direction: row;
    align-items: center;
    gap: 6px;
    shadow-color: ${colors.variants.secondary[3]};
    shadow-offset: 0px 2px;
    shadow-opacity: 0.1;
    shadow-radius: 3px;
    elevation: 1;
`;

export const RecoveryCreditsText = styled(Text)`
    font-size: 15px;
    font-weight: 600;
    color: ${colors.primary};
    letter-spacing: -0.2px;
`;

export const ReservedInfoContainer = styled(View)`
    flex-direction: row;
    align-items: center;
    gap: 8px;
    margin-top: 6px;
    position: relative;
    z-index: 1;
`;

export const StudentInfoDescription = styled(Text)`
    font-size: 14px;
    color: ${colors.variants.secondary[4]};
    font-weight: 400;
    letter-spacing: -0.1px;
    line-height: 20px;
    position: relative;
    z-index: 1;
`;

export const ReservedText = styled(Text)`
    font-size: 13px;
    font-weight: 500;
    color: ${colors.variants.secondary[4]};
    letter-spacing: -0.1px;
`;

export const ListContainer = styled(View)`
    width: 100%;
    flex: 1;
`;

export const ClassItemContainer = styled(View)`
    padding: 0 20px 16px 20px;
`;

export const ClassItem = styled(Pressable)<{ isSelected?: boolean }>`
    background-color: ${colors.primary};
    padding: 20px;
    border-radius: 12px;
    elevation: 1;
    shadow-color: ${colors.variants.grey[4]};
    shadow-offset: 0px 1px;
    shadow-opacity: 0.1;
    shadow-radius: 3px;
    border-top-width: 1px;
    border-right-width: 1px;
    border-bottom-width: 1px;
    border-left-width: 4px;
    border-top-color: ${colors.variants.grey[1]};
    border-right-color: ${colors.variants.grey[1]};
    border-bottom-color: ${colors.variants.grey[1]};
    border-left-color: ${({ isSelected }: { isSelected?: boolean }) => 
        isSelected ? colors.red : colors.variants.primary[3]};
`;

export const ClassHeader = styled(View)`
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 12px;
`;

export const ClassNextDate = styled(View)`
	flex-direction: row;
	align-items: center;
	gap: 6px;
	margin-bottom: 12px;
	background-color: ${colors.variants.grey[1]};
	padding: 8px 12px;
	border-radius: 8px;
`;

export const NextDateText = styled(Text)`
	font-size: 12px;
	font-weight: 500;
	color: ${colors.variants.grey[5]};
	letter-spacing: -0.1px;
`;

export const ClassTitleContainer = styled(View)`
    flex: 1;
    margin-right: 16px;
`;

export const ClassName = styled(Text)`
    font-size: 16px;
    font-weight: 600;
    color: ${colors.variants.secondary[5]};
    letter-spacing: -0.2px;
    margin-bottom: 4px;
    line-height: 20px;
`;

export const ClassDescription = styled(Text)`
    font-size: 14px;
    color: ${colors.variants.grey[4]};
    font-weight: 400;
    letter-spacing: -0.1px;
    line-height: 20px;
`;

export const ClassInfoBadge = styled(View)`
    background-color: ${colors.variants.secondary[1]};
    padding: 6px 12px;
    border-radius: 6px;
    align-items: center;
    justify-content: center;
`;

export const StudentsCount = styled.Text<{hasStudents: boolean;}>`
    font-size: 12px;
    font-weight: 600;
    letter-spacing: -0.1px;
    color: ${({ hasStudents }: { hasStudents: boolean }) => 
        (hasStudents ? colors.variants.secondary[5] : colors.variants.grey[4])};
`;

export const ClassMetadata = styled(View)`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 12px;
`;

export const ClassMetadataLeft = styled(View)`
    flex-direction: row;
    align-items: center;
    gap: 12px;
    flex: 1;
`;

export const MetadataItem = styled(View)`
    flex-direction: row;
    align-items: center;
    gap: 4px;
`;

export const ScheduleText = styled(Text)`
    font-size: 12px;
    color: ${colors.variants.grey[4]};
    font-weight: 500;
    letter-spacing: -0.1px;
`;

export const LocationBadge = styled.View<{ location?: string }>`
    background-color: ${({ location }: { location?: string }) =>
        location === 'spring'
            ? colors.variants.primary[1]
            : location === 'katy'
            ? colors.variants.secondary[1]
            : colors.variants.grey[1]};
    padding: 4px 8px;
    border-radius: 6px;
`;

export const LocationText = styled.Text<{ location?: string }>`
    font-size: 11px;
    font-weight: 600;
    letter-spacing: -0.1px;
    color: ${({ location }: { location?: string }) =>
        location === 'spring'
            ? colors.variants.primary[4]
            : location === 'katy'
            ? colors.variants.secondary[4]
            : colors.variants.grey[4]};
`;

export const ClassActions = styled(View)`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`;

export const ActionBadges = styled(View)`
    flex-direction: row;
    align-items: center;
    gap: 8px;
`;

export const ActionBadge = styled(View)<{ variant?: 'reserved' | 'delete' }>`
    background-color: ${({ variant }: { variant?: 'reserved' | 'delete' }) =>
        variant === 'reserved' 
            ? colors.variants.secondary[1]
            : variant === 'delete'
            ? colors.variants.primary[1]
            : colors.variants.grey[0]};
    padding: 8px 12px;
    border-radius: 8px;
    flex-direction: row;
    align-items: center;
    gap: 6px;
`;

export const ActionText = styled(Text)<{ variant?: 'reserved' | 'delete' }>`
    font-size: 12px;
    font-weight: 500;
    letter-spacing: -0.1px;
    color: ${({ variant }: { variant?: 'reserved' | 'delete' }) =>
        variant === 'reserved' 
            ? colors.variants.secondary[5]
            : variant === 'delete'
            ? colors.variants.primary[5]
            : colors.variants.grey[5]};
`;

export const DeleteButtonContainer = styled(Pressable)`
    padding: 8px;
    border-radius: 8px;
    background-color: ${colors.variants.primary[1]};
    justify-content: center;
    align-items: center;
`;

export const StarContainer = styled(View)`
    padding: 8px;
    border-radius: 8px;
    background-color: ${colors.variants.secondary[1]};
    justify-content: center;
    align-items: center;
`;

export const ChevronIcon = styled(View)`
    margin-left: auto;
`; 