import { CourseItemMain, CourseItemSub } from 'components/courses/item'
import { device } from 'helpers/mediaQueries'
import styled from 'styled-components'

const Container = styled.li`
  width: 100%;
  padding: 1.5rem 1rem;
  margin: 1rem 0;
  border-radius: 8px;
  background: ${({ theme }) => theme.darksecondary};
  box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.4);

  /* @media ${device.lg} {
    display: flex;
  } */
`

const CourseItem = ({ ...props }) => {
  return (
    <Container>
      <CourseItemMain {...props} />
      <CourseItemSub {...props} />
    </Container>
  )
}

export default CourseItem
