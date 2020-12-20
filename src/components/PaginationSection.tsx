import React from 'react'
import { Container, Pagination } from 'semantic-ui-react'

interface PaginationSectionProps {
  page: number
  handlePageChange: PageChange
  totalResults: number
}

const gitHubResultsMax = 1000
const resultsPerPage = 3

const PaginationSection: React.FC<PaginationSectionProps> = ({
  page,
  handlePageChange,
  totalResults,
}) => {
  return (
    <Container textAlign="center" style={{ padding: '1rem' }}>
      <Pagination
        activePage={page}
        firstItem={false}
        lastItem={false}
        onPageChange={handlePageChange}
        size="small"
        secondary
        totalPages={
          totalResults > gitHubResultsMax
            ? Math.floor(gitHubResultsMax / resultsPerPage)
            : Math.floor(totalResults / resultsPerPage)
        }
      />
    </Container>
  )
}

export default PaginationSection
