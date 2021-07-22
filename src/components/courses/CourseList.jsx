import { Pagination } from 'antd'
import { useState } from 'react'
import styled from 'styled-components'

import { CourseItem, CourseItemLoading } from 'components/courses'
import { PageHeading, PageTitle, NotFoundSearch } from 'components/shared'
import { device } from 'styles/responsive'

const Container = styled.div`
  width: 100%;
  @media ${device.min.lg} {
    padding-right: ${({ theme }) => theme.asideWidthRight};
    transition: padding-right 200ms ease-in;
  }
`

const Results = styled.span`
  opacity: 80%;
  font-size: 1rem;
  font-weight: 600;
  color: ${({ theme }) => theme.darksecondary};
`

const List = styled.ul`
  margin: 0 0.75rem;
`

const CourseList = ({ courses, loading }) => {
  const count = courses ? courses.length : 0

  // pagination
  const [pageInfo, setPageInfo] = useState({
    page: 1,
    perPage: 10,
  })

  const handlePageChange = (page) => setPageInfo({ ...pageInfo, page })
  const { page, perPage } = pageInfo
  const paginate = (data) => data.slice((page - 1) * perPage, page * perPage)

  return (
    <Container>
      <PageHeading>
        <PageTitle>Courses</PageTitle>
        <Results>{count}&nbsp;results found</Results>
      </PageHeading>

      <List>
        <CourseItemLoading active={loading} />
        <NotFoundSearch active={!loading && !count} />
        {count > 0 &&
          !loading &&
          paginate(courses).map((data) => (
            <CourseItem data={data} key={data.id} />
          ))}
      </List>

      {!loading && (
        <Pagination
          defaultPageSize={perPage}
          responsive
          hideOnSinglePage
          onChange={handlePageChange}
          showSizeChanger={false}
          total={count}
        />
      )}
    </Container>
  )
}

export default CourseList
