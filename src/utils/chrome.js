export const domIsReady = async () => {
  return new Promise((resolve, reject) => {
    window.addEventListener('DOMContentLoaded', () => resolve({}))
  })
}


