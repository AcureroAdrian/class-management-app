import styled from 'styled-components/native';
import { View, Text, TextInput } from 'react-native';
import { StyledCustomInputlabel, StyledCustomTextInput } from '@/theme/styles';
import colors from '@/theme/colors';

export const AgeRangeContainer = styled(View)`
    width: 100%;
`;

export const InputContainer = styled(View)`
    flex-direction: row;
    width: 100%;
    gap: 20px;
    align-items: center;
`;

export const AgeInput = styled(StyledCustomTextInput)`
    width: 80px;
    padding-right: 0;
    text-align: center;
`;

export const Separator = styled(Text)`
    /* Si se necesita algún estilo para el guión */
`;

export const RangeText = styled(Text)`
    color: ${colors.variants.secondary[5]};
    font-size: 16px;
    font-weight: 500;
`; 