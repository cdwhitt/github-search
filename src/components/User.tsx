import React from 'react'
import { Card, Image, Icon, Header } from 'semantic-ui-react'

interface UserProps {
  user: User
}

const User: React.FC<UserProps> = ({ user }) => {
  const { login, avatar_url, html_url, score } = user

  return (
    <Card>
      <Image src={avatar_url} wrapped ui={false} />
      <Card.Content>
        <Card.Header>
          <Icon name="user" />
          {login}
        </Card.Header>
        <Card.Meta>
          <Header as="h5" color="green">
            Score: {score}
          </Header>
        </Card.Meta>
      </Card.Content>
      <Card.Content extra>
        <a href={html_url} target="_blank" rel="noreferrer">
          <Icon name="github square" />
          {html_url}
        </a>
      </Card.Content>
    </Card>
  )
}

export default User
