import styled from 'styled-components';

type Props = {
    test: string;
}

export const Wrapper = styled.div<Props>`
    background: ${(props) => props.test === 'light' ? '#fff' : '#333'};
    color: ${(props) => props.test === 'light' ? '#333' : '#fff'};
`;