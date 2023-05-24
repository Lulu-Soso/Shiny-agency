import Footer from './index'
import {render, screen, fireEvent } from '@testing-library/react'
import {ThemeProvider} from '../../utils/context'

describe('Footer', () => {
  test('Should render without crash', async () => {
    render(
      <ThemeProvider>
        <Footer />
      </ThemeProvider>
    )
  })
  test('Change theme', async () => {
    render(
      <ThemeProvider>
        <Footer />
      </ThemeProvider>
    )
    const nightModeButton = screen.getByRole('button')
    expect(nightModeButton.textContent).toBe('Changer de mode : ☀️')
    // Pour interagir avec notre composant, on a besoin de fireEvent  qui va nous permettre de déclencher des événements du DOM, ici click
    fireEvent.click(nightModeButton)
    expect(nightModeButton.textContent).toBe('Changer de mode : 🌙')
  })
})
