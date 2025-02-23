import styled from "styled-components/native";

export const Divider = styled.View`
	height: 1px;
	background-color: #d93b3d;
	opacity: 0.5;
`;

export const Container = styled.View`
	flex: 1;
`;

export const Content = styled.View`
	gap: 30px;
	margin-top: 20px;
	margin-bottom: 20px;
	padding: 20px;
	flex: 1;
`;

export const PressableContainer = styled.View`
	flex-direction: row;
	gap: 10px;
	display: flex;
	align-items: center;
`;

export const LogoutButton = styled.Pressable`
	justify-content: flex-end;
`;

export const TextBold = styled.Text`
	font-weight: bold;
	font-size: 17px;
`;
