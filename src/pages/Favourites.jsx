import { Helmet } from 'react-helmet-async'
import styled from 'styled-components/macro'

import { FavouritesContainer } from 'components/Favourites'
import { device } from 'styles/responsive'

const Container = styled.div`
  display: flex;
  min-height: calc(100vh - ${({ theme }) => theme.headerHeight});

  @media ${device.min.md} {
    margin-left: ${({ theme }) => theme.asideWidthLeft};
  }
`

const Favourites = () => {
  return (
    <Container>
      <Helmet>
        <title>Favourites - ResoBin</title>
        <meta name="description" content="Your favourite courses" />
      </Helmet>

      <FavouritesContainer />
    </Container>
  )
}

export default Favourites
