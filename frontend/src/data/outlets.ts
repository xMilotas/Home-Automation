import { icons } from '../icons'
import type { Outlet } from '../types/outlet'

export const outlets: Outlet[] = [
    {
        id: 1,
        name: 'Wohnzimmer groß',
        icon: icons.light
    },
    {
        id: 2,
        name: 'Wohnzimmer klein',
        icon: icons.light
    },
    {
        id: 3,
        name: 'Schlafzimmer',
        icon: icons.bedroom
    },
    {
        id: 4,
        name: 'Schreibtisch',
        icon: icons.desk
    }
]