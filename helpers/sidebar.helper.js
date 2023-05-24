export function sideBarItems(userRole = undefined) {
  const commonItems = [
    {
      title: 'Dashboard',
      icon: ['fas', 'gauge'],
      to: '/dashboard',
    },
  ]

  if (userRole === 'admin') {
    const adminItems = [
      {
        title: 'Users',
        icon: ['fas', 'user-group'],
        to: '/users',
      },
    ]

    return [...commonItems, ...adminItems]
  }

  if (userRole === 'head') {
    const headItems = [
      {
        icon: ['fas', 'hand-holding-dollar'],
        title: 'Donors',
        to: '/donors',
      },
      {
        icon: ['fas', 'map'],
        title: 'Locations',
        to: '/locations',
      },
      {
        icon: ['fas', 'diagram-project'],
        title: 'Projects',
        to: '/projects',
      },
      {
        icon: ['fas', 'people-roof'],
        title: 'Coordinators',
        to: '/coordinators',
      },
      {
        icon: ['fas', 'people-group'],
        title: 'Social Workers',
        to: '/social-workers',
      },
    ]

    return [...commonItems, ...headItems]
  }

  if (userRole === 'coordinator') {
    const coordinatorItems = [
      {
        icon: ['fas', 'diagram-project'],
        title: 'Projects',
        to: '/projects',
      },
      {
        icon: ['fas', 'people-group'],
        title: 'Social Workers',
        to: '/social-workers',
      },
      {
        icon: ['fas', 'hand-holding-dollar'],
        title: 'Donors',
        to: '/donors',
      },
      {
        icon: ['fas', 'city'],
        title: 'Districts',
        to: '/districts',
      },
    ]

    return [...commonItems, ...coordinatorItems]
  }

  return commonItems
}
