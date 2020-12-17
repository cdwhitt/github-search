import React, { useState } from 'react'
import { Header, Icon, Container } from 'semantic-ui-react'
import SearchInput from './SearchInput'

const GithubSearchContainer: React.FC = () => {
  const [searchString, setSearchString] = useState('')

  const handleSearchChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setSearchString(event.currentTarget.value)
  }

  const handleKeyPress = (event: React.KeyboardEvent<HTMLDivElement>): void => {
    if (event.key === 'Enter') {
      handleSearchSubmit(event)
    }
  }

  const handleSearchSubmit = (event: React.KeyboardEvent<HTMLDivElement>) => {
    event.preventDefault()
    console.log('CLICK SUBMIT')
    console.log(searchString)
  }

  return (
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
  )
}

export default GithubSearchContainer
