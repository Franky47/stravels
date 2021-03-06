export const getPhase = (state) => state.phase
export const isFetching = (state) => state.fetching
export const getToken = (state) => state.token
export const getError = (state) => state.error

export default (stateMapper = (s) => s) => ({
  getPhase: (parentState) => getPhase(stateMapper(parentState)),
  isFetching: (parentState) => isFetching(stateMapper(parentState)),
  getToken: (parentState) => getToken(stateMapper(parentState)),
  getError: (parentState) => getError(stateMapper(parentState)),

  // Computed
  isLoggedIn: (parentState) => {
    const phase = getPhase(stateMapper(parentState))
    const token = getToken(stateMapper(parentState))
    return phase === 'LOGGED_IN' && token !== null
  }
})
