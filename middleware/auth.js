export default function ({
  store,
  redirect,
  route,
}) {
  if (process?.server) return
  const loggedOut = !store.getters['auth/userRole']
  if (loggedOut && route.fullPath !== '/') {
    return redirect('/')
  }
}
