/* eslint-env jest */

import lngPathCorrector from '../../src/utils/lng-path-corrector'

describe('lngPathCorrector utility function', () => {
  let config
  let i18n

  beforeEach(() => {
    config = {
      defaultLanguage: 'en',
      allLanguages: ['en', 'de'],
    }

    i18n = {
      languages: ['en', 'de'],
    }
  })

  it('throws if allLanguages does not include current language', () => {
    config.allLanguages = ['de', 'fr']

    expect(() => lngPathCorrector(config, i18n, '/'))
      .toThrowError('Invalid configuration: Current language is not included in all languages array')
  })

  it('strips off the default language', () => {
    expect(lngPathCorrector(config, i18n, '/en/foo')).toEqual(['/foo', '/foo'])
  })

  it('corrects path with language, if not the default', () => {
    expect(lngPathCorrector(config, i18n, '/foo', 'de'))
      .toEqual(['/foo?lng=de', '/de/foo'])
  })
})
