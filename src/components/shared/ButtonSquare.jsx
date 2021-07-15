import styled from 'styled-components'

import { HEX2RGBA } from 'helpers'

const ButtonSquare = styled.button`
  height: 1.75rem;
  padding: 0 1rem;
  border-radius: 0.25rem;
  font-weight: 400;
  font-size: 0.75rem;
  letter-spacing: 1px;
  color: #ffffff;
  background-color: ${({ theme }) => theme.logo};
  cursor: pointer;

  &:hover,
  &:active {
    opacity: 90%;
  }

  &:active {
    box-shadow: inset 0 0 5px ${HEX2RGBA('#000', 40)};
  }
`

export default ButtonSquare
