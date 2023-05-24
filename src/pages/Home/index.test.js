import {MemoryRouter} from 'react-router-dom'
import {render, screen} from '@testing-library/react'
import Home from './index'
import {ThemeProvider} from '../../utils/context'

// le composant <MemoryRouter>, ce composant, importé de React Router, nous permet d'inclure le router dans les tests.

describe('The Home component', () => {
  it('Should render without crash', () => {
    render(
      <MemoryRouter>
        <ThemeProvider>
          <Home />
        </ThemeProvider>
      </MemoryRouter>
    )
    // Pour regarder ce qui est affiché dans le terminal, on fait screen.debug() pour récupérer le texte
    // screen.debug()
    expect(screen.getByText('Repérez vos besoins, on s’occupe du reste, avec les meilleurs talents')).toBeTruthy()
  })
  it('Should render without crash with other method', () => {
    render(
      <MemoryRouter>
        <ThemeProvider>
          <Home />
        </ThemeProvider>
      </MemoryRouter>
    )
    // level: 2 correspond à h2
    expect(screen.getByRole('heading', {level: 2, text: 'Repérez vos besoins, on s’occupe du reste, avec les meilleurs talents'})).toBeTruthy()
  })
})
