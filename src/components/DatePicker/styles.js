import { Platform } from "react-native";
import styled from "styled-components";

const plataform = Platform.OS === 'ios' ? '#00000066' : 'transparent';

export const Container = styled.TouchableOpacity`
background-color: ${plataform};
position: absolute;
justify-content: flex-end;
width: 100%;
height: 100%;
`;

export const Header = styled.View`
width: 100%;
padding: 16px;
justify-content: flex-end;
align-items: flex-end;
background-color: #FFF;
border-bottom-width: 1px;
border-color: #ccc;
`;