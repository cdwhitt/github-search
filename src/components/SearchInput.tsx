import React from 'react'
import { Icon, Form } from 'semantic-ui-react'

interface SearchInputProps {
  searchString: string
  handleSearchChange: InputChange
  handleKeyPress: Submit
  handleSearchSubmit: Submit
}

const SearchInput: React.FC<SearchInputProps> = ({
  searchString,
  handleSearchChange,
  handleKeyPress,
  handleSearchSubmit,
}) => {
  return (
    <Form>
      <Form.Input
        value={searchString}
        onChange={handleSearchChange}
        onKeyPress={handleKeyPress}
        size="huge"
        fluid
        icon={
          <Icon
            name="search"
            circular
            color="green"
            inverted
            type="submit"
            link
            onClick={handleSearchSubmit}
          />
        }
        placeholder="Type username here..."
      />
    </Form>
  )
}

export default SearchInput
