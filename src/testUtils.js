import { act } from 'react-dom/test-utils';

export const waitFor = (callback, { interval = 5000, timeout = 5000 } = {}) =>
  act(
    () =>
      new Promise((resolve, reject) => {
        const startTime = Date.now()

        const nextInterval = () => {
          setTimeout(() => {
            try {
              callback()
              resolve()
            } catch (err) {
              if (Date.now() - startTime > timeout) {
                reject(new Error('Timed out.'))
              } else {
                nextInterval()
              }
            }
          }, interval)
        }

        nextInterval()
      }),
  )