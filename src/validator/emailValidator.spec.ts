import { validate } from './emailValidator'

describe('Email Validator', () => {

  it('validates email address with valid input', async () => {
    expect(validate('mdrijwan@gmail.com')).toBe(true)
    expect(validate('mdrijwangmailcom')).toBe(false)
    expect(validate('mdrijwan@gmailcom')).toBe(false)
    expect(validate('mdrijwangmail.com')).toBe(false)
    expect(validate('mdrijwan.gmail.com')).toBe(false)
    expect(validate('mdrijwan@gmail@com')).toBe(false)
  })
})
