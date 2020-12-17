import React from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'

import GithubSearchContainer from './components/GithubSearchContainer'

const queryCache = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryCache}>
      <GithubSearchContainer />
    </QueryClientProvider>
  )
}

export default App
