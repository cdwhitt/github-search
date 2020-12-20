import React, { useState, useEffect, MouseEventHandler } from 'react'
import axios from 'axios'
import {
  Header,
  Icon,
  Container,
  Card,
  Button,
  Loader,
  Dimmer,
  Message,
  Segment,
  Pagination,
} from 'semantic-ui-react'
import SearchInput from './SearchInput'
import User from './User'

const buttonStyles = { margin: '0.5rem' }
const gitHubResultsMax = 1000
const resultsPerPage = 3

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
  }, [page])

  const handleSearchChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setSearchString(event.target.value)
  }

  const handleKeyPress = async (
    event: React.KeyboardEvent<HTMLDivElement>
  ): Promise<any> => {
    if (event.key === 'Enter') {
      handleSearchSubmit(event)
    }
  }

  const handleSearchSubmit = async (
    event: React.KeyboardEvent<HTMLDivElement>
  ): Promise<any> => {
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

  const handlePageChange = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    { activePage }: any
  ): void => {
    setPage(activePage)
  }

  console.log(page, '<===page')

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
              <Button
                icon
                size="mini"
                style={buttonStyles}
                color="red"
                onClick={clearResults}
              >
                <Icon name="x" />
              </Button>
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
          {loading && (
            <Dimmer active>
              <Loader icon="github">Getting Users...</Loader>
            </Dimmer>
          )}
          <Header as="h3" textAlign="center">
            {totalResults} result(s) for your search...
            <Button
              icon
              size="mini"
              style={buttonStyles}
              color="red"
              onClick={clearResults}
            >
              <Icon name="x" />
            </Button>
          </Header>
          <Card.Group centered>
            {userResults.map((user: User) => (
              <User user={user} key={user.id} />
            ))}
          </Card.Group>
          <Container textAlign="center" style={{ padding: '1rem' }}>
            <Pagination
              activePage={page}
              onPageChange={handlePageChange}
              size="large"
              secondary
              totalPages={
                totalResults > gitHubResultsMax
                  ? Math.floor(gitHubResultsMax / resultsPerPage)
                  : Math.floor(totalResults / resultsPerPage)
              }
            />
          </Container>
        </>
      )}
    </>
  )
}

export default GithubSearchContainer
