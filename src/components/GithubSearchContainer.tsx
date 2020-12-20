import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Header, Icon, Container, Card, Message, Grid } from 'semantic-ui-react'
import SearchInput from './SearchInput'
import UserLoader from './UserLoader'
import User from './User'
import ClearButton from './ClearButton'
import PaginationSection from './PaginationSection'

const GithubSearchContainer: React.FC = () => {
  const [searchString, setSearchString] = useState('')
  const [page, setPage] = useState(1)
  const [userResults, setUserResults] = useState<User[]>([])
  const [submitted, setSubmitted] = useState(false)
  const [totalResults, setTotalResults] = useState(0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    async function updateUsers() {
      await fetchUsers(page, searchString)
    }
    if (submitted) {
      updateUsers()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page])

  const handleSearchChange: InputChange = (event) => {
    setSearchString(event.target.value)
  }

  const handleKeyPress: Submit = (event) => {
    if (event.key === 'Enter') {
      handleSearchSubmit(event)
    }
  }

  const handleSearchSubmit: Submit = async (event): Promise<any> => {
    event.preventDefault()
    setPage(1)
    await fetchUsers(page, searchString)
    setSubmitted(true)
  }

  const fetchUsers = async (
    page: number,
    searchString: string
  ): Promise<any> => {
    try {
      setLoading(true)
      const { data } = await axios.get(
        `https://api.github.com/search/users?q=${searchString}&per_page=3&page=${page}`
      )
      setUserResults(data.items)
      setTotalResults(data.total_count)
      setLoading(false)
    } catch (error) {
      setLoading(false)
      setError('Sorry, there was an issue getting results...')
    }
  }

  const handlePageChange: PageChange = (event, { activePage }) => {
    setPage(activePage)
  }

  const clearResults = (): void => {
    setSearchString('')
    setSubmitted(false)
    setPage(1)
    setTotalResults(0)
    setUserResults([])
    setError('')
  }

  return (
    <>
      <Container text style={{ margin: '2em' }}>
        <Header as="h1" icon textAlign="center">
          <Icon name="github" />
          GitHub User Search
          <Header.Subheader>
            Find the GitHub user you're looking for...
          </Header.Subheader>
        </Header>

        {error !== '' && (
          <>
            <Message fluid="true" color="red" style={{ textAlign: 'center' }}>
              {error}
              <ClearButton clearResults={clearResults} />
            </Message>
          </>
        )}
        <SearchInput
          searchString={searchString}
          handleSearchChange={handleSearchChange}
          handleKeyPress={handleKeyPress}
          handleSearchSubmit={handleSearchSubmit}
        />
      </Container>

      {userResults.length > 0 && (
        <>
          <Grid padded centered>
            <Grid.Column verticalAlign="middle" textAlign="right" width="9">
              <Header as="h3">
                {totalResults} result(s) for your search...
              </Header>
            </Grid.Column>
            <Grid.Column verticalAlign="middle" textAlign="left" width="7">
              <ClearButton clearResults={clearResults} />
            </Grid.Column>
          </Grid>
          <Card.Group centered>
            {userResults.map((user: User) =>
              loading ? (
                <UserLoader key={user.id} />
              ) : (
                <User user={user} key={user.id} />
              )
            )}
          </Card.Group>
          <PaginationSection
            page={page}
            handlePageChange={handlePageChange}
            totalResults={totalResults}
          />
        </>
      )}
    </>
  )
}

export default GithubSearchContainer
