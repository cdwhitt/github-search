import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {
  Header,
  Icon,
  Container,
  Card,
  CardGroup,
  Button,
  Image,
} from 'semantic-ui-react'
import SearchInput from './SearchInput'
import User from './User'

const GithubSearchContainer: React.FC = () => {
  const [searchString, setSearchString] = useState('')
  const [page, setPage] = useState(1)
  const [userResults, setUserResults] = useState([])
  const [submitted, setSubmitted] = useState(false)

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

  const handleKeyPress = (event: React.KeyboardEvent<HTMLDivElement>): void => {
    if (event.key === 'Enter') {
      console.log('ENTER SUBMIT')
    }
  }

  const handleSearchSubmit = async (
    event: React.KeyboardEvent<HTMLDivElement>
  ) => {
    event.preventDefault()
    await fetchUsers(page, searchString)
    setSubmitted(true)
  }

  const fetchUsers = async (
    page: number,
    searchString: string
  ): Promise<any> => {
    const { data } = await axios.get(
      `https://api.github.com/search/users?q=${searchString}&per_page=3&page=${page}`
    )
    setUserResults(data.items)
  }

  console.log(userResults, 'RESULTS')

  const handlePageClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void => {
    if (event.currentTarget.id === 'prev') {
      setPage(page - 1)
    } else {
      setPage(page + 1)
    }
  }

  console.log(page, 'PAGE #')
  console.log(userResults, 'USERS')

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

        <SearchInput
          searchString={searchString}
          handleSearchChange={handleSearchChange}
          handleKeyPress={handleKeyPress}
          handleSearchSubmit={handleSearchSubmit}
        />
      </Container>

      {userResults.length > 0 && (
        <>
          <Button
            id="prev"
            onClick={handlePageClick}
            content="Prev Page"
            icon="left arrow"
            labelPosition="left"
            disabled={page === 1}
          />
          Page {page}
          <Button
            id="next"
            onClick={handlePageClick}
            content="Next Page"
            icon="right arrow"
            labelPosition="right"
          />
          <Card.Group centered>
            {userResults.map((user: User) => (
              <User user={user} key={user.id} />
            ))}
          </Card.Group>
        </>
      )}
    </>
  )
}

export default GithubSearchContainer
