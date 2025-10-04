import styled from 'styled-components/native';
import { View, Modal, Text, ScrollView } from 'react-native';
import colors from '@/theme/colors';

export const ModalContainer = styled(Modal)``;

export const ModalView = styled(View)`
    flex: 1;
    justify-content: flex-start;
    background-color: ${colors.variants.grey[0]};
`;

export const ContentContainer = styled(View)`
    padding-top: 20px;
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

export const FormContainer = styled(View)`
    flex: 1;
    width: 100%;
`;

export const StyledScrollView = styled(ScrollView).attrs({
    contentContainerStyle: {
        paddingBottom: 40,
    }
})``;

export const ErrorText = styled(Text)`
    text-align: center;
    font-size: 14px;
    color: ${colors.variants.primary[5]};
    background-color: ${colors.variants.primary[0]};
    padding: 12px 16px;
    margin: 0 20px 20px 20px;
    border-radius: 8px;
    border-left-width: 4px;
    border-left-color: ${colors.variants.primary[5]};
`;

// Contenedor para agrupar campos relacionados
export const FormSection = styled(View)`
    background-color: ${colors.view.primary};
    border-radius: 12px;
    padding: 20px;
    margin: 0 20px 20px 20px;
    shadow-color: ${colors.variants.grey[7]};
    shadow-offset: 0px 2px;
    shadow-opacity: 0.1;
    shadow-radius: 8px;
    elevation: 3;
`;

export const SectionTitle = styled(Text)`
    font-size: 18px;
    font-weight: 600;
    color: ${colors.variants.secondary[5]};
    margin-bottom: 20px;
`;

export const FormGroup = styled(View)`
    gap: 24px;
`;

export const InfoCard = styled(View)`
    background-color: ${colors.variants.secondary[0]};
    border-radius: 8px;
    padding: 16px;
    border-left-width: 4px;
    border-left-color: ${colors.variants.secondary[5]};
`;

export const InfoCardTitle = styled(Text)`
    font-size: 16px;
    font-weight: 600;
    color: ${colors.variants.secondary[5]};
    margin-bottom: 4px;
`;

export const InfoCardDescription = styled(Text)`
    font-size: 14px;
    color: ${colors.variants.secondary[4]};
    line-height: 20px;
`; 