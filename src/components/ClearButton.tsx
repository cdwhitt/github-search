import React from 'react'
import { Button, Icon } from 'semantic-ui-react'

interface ClearButtonProps {
  clearResults: () => void
}

const buttonStyles = { margin: '0.5rem' }

const ClearButton: React.FC<ClearButtonProps> = ({ clearResults }) => {
  return (
    <Button
      compact
      size="mini"
      icon
      style={buttonStyles}
      circular
      color="red"
      onClick={clearResults}
    >
      <Icon name="x" />
    </Button>
  )
}

export default ClearButton
