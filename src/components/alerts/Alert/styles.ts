import styled, { css } from 'styled-components';

interface IContainer {
  type: 'danger' | 'info' | 'success';
}

const containerTypes = {
  danger: css`
    border-color: #f64e60;
    background-color: #ffe2e5;

    > p,
    svg {
      color: #f64e60;
    }
  `,
  info: css`
    border-color: #8950fc;
    background-color: #eee5ff;

    > p,
    svg {
      color: #8950fc;
    }
  `,
  success: css`
    border-color: #408401;
    background-color: #cbffc0;

    > p,
    svg {
      color: #408401;
    }
  `,
};

export const Container = styled.div<IContainer>`
  width: 100%;

  padding: 10px 17px;
  margin: 10px 0;

  display: flex;
  align-items: center;
  gap: 15px;

  border-radius: 10px;
  border: 2px solid;

  ${props => containerTypes[props.type]}
`;
