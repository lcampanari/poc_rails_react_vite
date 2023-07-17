import '../stylesheets/application.scss'

import { viteConstructorRequireContext } from '../helpers/viteHelpers'
import ReactRailsUJS from 'react_ujs'

const componentsRequireContext = import.meta.globEager(
  '~/components/**/*.{js,jsx}'
)
ReactRailsUJS.getConstructor = viteConstructorRequireContext(
  componentsRequireContext
)
