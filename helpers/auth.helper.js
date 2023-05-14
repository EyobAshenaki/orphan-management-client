export function layoutGuard(context) {
  if (!context.$store.getters['auth/userRole']) {
    context.$toaster.showToast({
      content: 'You must be logged in to view this page',
      state: 'error',
    })
    context.$router.push('/')
  }
}
