interface User {
  id: number, 
  login: string,
  avatar_url: string,
  html_url: string,
  score: number
}

interface InputChange {
  (event: React.ChangeEvent<HTMLInputElement>): void
}

interface Submit {
  (event: React.KeyboardEvent<HTMLDivElement>): void
}

interface PageChange {
  (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>, { activePage }: any): void 
} 




