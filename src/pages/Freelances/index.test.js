import { rest } from 'msw'
import '@testing-library/jest-dom/extend-expect'
import { setupServer } from 'msw/node'
import { waitForElementToBeRemoved, screen } from '@testing-library/react'
import { render } from '../../utils/test'
import Freelances from './'

const freelancersMockedData = [
  {
    name: 'Harry Potter',
    job: 'Magicien frontend',
    picture: '',
  },
  {
    name: 'Hermione Granger',
    job: 'Magicienne fullstack',
    picture: '',
  },
]

const server = setupServer(
  // On précise ici l'url qu'il faudra "intercepter"
  rest.get('http://localhost:8000/freelances', (req, res, ctx) => {
    // Là on va pouvoir passer les datas mockées dans ce qui est retourné en json
    return res(ctx.json({ freelancersList: freelancersMockedData }))
  })
)

// Active la simulation d'API avant les tests depuis server
beforeAll(() => server.listen())
// Réinitialise tout ce qu'on aurait pu ajouter en termes de durée pour nos tests avant chaque test
afterEach(() => server.resetHandlers())
// Ferme la simulation d'API une fois que les tests sont finis
afterAll(() => server.close())


test('Should render without crash', async () => {
  render(
    // <ThemeProvider>
      <Freelances />
    // </ThemeProvider>
  )
  expect(screen.getByTestId('loader')).toBeTruthy()
})

it('Should display freelancers names', async () => {
  render(
    // <ThemeProvider>
      <Freelances />
    // </ThemeProvider>
  )

  // Attend que l'élément loader soit retiré du DOM
  await waitForElementToBeRemoved(() => screen.getByTestId('loader'))

  // On va maintenant tester avec nos datas. Pour cela, on va avoir besoin de waitFor
  // Cette méthode permet de gérer du code asynchrone, comme pour un call API, par exemple.
  //   On n'oublie d'ailleurs pas d'ajouter un async devant le callback de notre test
  expect(screen.getByText('Harry Potter')).toBeInTheDocument()
  expect(screen.getByText('Hermione Granger')).toBeInTheDocument()
  expect(screen.queryByTestId('loader')).not.toBeInTheDocument()
})
