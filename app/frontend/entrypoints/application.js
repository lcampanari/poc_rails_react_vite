import '../stylesheets/application.scss'

import { viteConstructorRequireContext } from '../helpers/viteHelpers'
import ReactRailsUJS from 'react_ujs'

const componentsRequireContext = import.meta.globEager(
  '~/components/**/*.{js,jsx,ts,tsx}'
)
ReactRailsUJS.getConstructor = viteConstructorRequireContext(
  componentsRequireContext
)
