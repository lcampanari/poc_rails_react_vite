import React from 'react'
import { DashboardApp } from '@ventionco/machine-cloud-components'

interface Props {
  isAdmin: boolean
  machineCloudApiUrl: string
  machineCloudApiWebSocketUrl: string
  railsUrl: string
}

const ErbMachineCloudApp = (props: Props) => {
  return (
    <DashboardApp
      isAdmin={props.isAdmin}
      machineCloudApiUrl={props.machineCloudApiUrl}
      machineCloudApiWebSocketUrl={props.machineCloudApiWebSocketUrl}
    />
  )
}

export default ErbMachineCloudApp
