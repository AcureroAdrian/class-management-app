import styled from 'styled-components/native';
import { View, Text, Pressable } from 'react-native';
import colors from '@/theme/colors';

export const FilterContainer = styled(View)`
    width: 100%;
    padding: 0 20px;
    margin-bottom: 16px;
`;

export const FilterCard = styled(View)`
    background-color: ${colors.variants.secondary[0]};
    padding: 16px;
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

export const FilterAccent = styled(View)`
    position: absolute;
    top: 0;
    right: 0;
    width: 50px;
    height: 50px;
    background-color: ${colors.variants.secondary[1]};
    border-bottom-left-radius: 25px;
    opacity: 0.4;
`;

export const FilterHeader = styled(View)`
    flex-direction: row;
    align-items: center;
    margin-bottom: 12px;
    position: relative;
    z-index: 1;
`;

export const FilterTitle = styled(Text)`
    font-size: 15px;
    font-weight: 600;
    color: ${colors.variants.secondary[5]};
    letter-spacing: -0.2px;
    margin-left: 8px;
`;

export const FilterOptionsContainer = styled(View)`
    flex-direction: row;
    flex-wrap: wrap;
    gap: 8px;
    position: relative;
    z-index: 1;
`;

export const FilterChip = styled(Pressable)<{ selected: boolean }>`
    background-color: ${({ selected }: { selected: boolean }) => 
        selected ? colors.variants.secondary[2] : colors.variants.secondary[1]};
    padding: 8px 12px;
    border-radius: 20px;
    border-width: 1px;
    border-color: ${({ selected }: { selected: boolean }) => 
        selected ? colors.variants.secondary[3] : colors.variants.secondary[2]};
    flex-direction: row;
    align-items: center;
    gap: 6px;
`;

export const FilterChipText = styled(Text)<{ selected: boolean }>`
    font-size: 12px;
    font-weight: 500;
    color: ${({ selected }: { selected: boolean }) => 
        selected ? colors.primary : colors.variants.secondary[5]};
    letter-spacing: -0.1px;
`;

export const ClearFiltersButton = styled(Pressable)`
    align-self: flex-end;
    margin-top: 8px;
    padding: 6px 12px;
    background-color: ${colors.variants.primary[1]};
    border-radius: 12px;
    position: relative;
    z-index: 1;
`;

export const ClearFiltersText = styled(Text)`
    font-size: 11px;
    font-weight: 500;
    color: ${colors.variants.primary[5]};
    letter-spacing: -0.1px;
`;

export const TimeFilterContainer = styled(View)`
    flex-direction: row;
    align-items: center;
    gap: 8px;
    margin-top: 8px;
    position: relative;
    z-index: 1;
`;

export const TimeFilterChip = styled(Pressable)<{ selected: boolean }>`
    background-color: ${({ selected }: { selected: boolean }) => 
        selected ? colors.variants.primary[2] : colors.variants.primary[1]};
    padding: 6px 10px;
    border-radius: 16px;
    border-width: 1px;
    border-color: ${({ selected }: { selected: boolean }) => 
        selected ? colors.variants.primary[3] : colors.variants.primary[2]};
`;

export const TimeFilterText = styled(Text)<{ selected: boolean }>`
    font-size: 11px;
    font-weight: 500;
    color: ${({ selected }: { selected: boolean }) => 
        selected ? colors.primary : colors.variants.primary[5]};
    letter-spacing: -0.1px;
`; 