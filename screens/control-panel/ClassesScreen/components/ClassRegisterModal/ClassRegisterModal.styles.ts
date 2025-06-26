import styled from 'styled-components/native';
import { View, Modal, Text, ScrollView } from 'react-native';

export const ModalContainer = styled(Modal)``;

export const ModalView = styled(View)`
    flex: 1;
    width: 100%;
    justify-content: flex-start;
`;

export const ContentContainer = styled(View)`
    flex: 1;
    width: 100%;
`;

export const StyledScrollView = styled(ScrollView).attrs({
    contentContainerStyle: {
        gap: 40,
        padding: 20,
    }
})``;

export const ErrorText = styled(Text)`
    text-align: center;
    font-size: 13px;
    color: red;
`; 