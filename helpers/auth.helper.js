export function layoutGuard(context, layout = 'default') {
  console.log('layout? : ', layout)
  if (!context.$store.getters['auth/userRole']) {
    context.$toaster.showToast({
      content: 'You must be logged in to view this page',
      state: 'error',
    })
    context.$router.push('/')
    return
  }
  if (['default', 'dashboard'].includes(layout)) return
  if (context.$store.getters['auth/userRole'] !== layout) {
    context.$toaster.showToast({
      content: `Your account must be "${layout}" to view this page`,
      state: 'error',
    })
    context.$router.push('/dashboard')
  }
}
