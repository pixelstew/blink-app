import '@testing-library/jest-dom'
import {render} from '@testing-library/react'
import {axe, toHaveNoViolations} from 'jest-axe'
import {ChatApp} from '../components/ChatApp'

jest.mock('../mocks/api')

expect.extend(toHaveNoViolations)

describe('Appliciation', () => {
  beforeEach(async () => {
    render(<ChatApp />)
  })
  it('the app to be free from accesibility violations', async () => {
    const results = await axe(document.body)
    expect(results).toHaveNoViolations()
  })
})
