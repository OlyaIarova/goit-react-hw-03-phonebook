import styled from 'styled-components';

export const Container = styled.div`
  width: 480px;
  margin: 0 auto;
  padding: 0 16px;
  text-align: center;
  border: 2px solid ${div => div.theme.colors.main};
  border-radius: 10px;
`;
