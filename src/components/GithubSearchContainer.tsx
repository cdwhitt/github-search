import React from 'react'
import { Header, Icon, Container, Input } from 'semantic-ui-react'

const GithubSearchContainer: React.FC = () => {
  return (
    <Container text style={{ margin: '2em' }}>
      <Header as="h1" icon textAlign="center">
        <Icon name="github" />
        GitHub User Search
        <Header.Subheader>
          Find the GitHub user you're looking for...
        </Header.Subheader>
      </Header>
      <Input fluid size="huge" icon="search" />
    </Container>
  )
}

export default GithubSearchContainer
