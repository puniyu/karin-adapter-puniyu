import { AdapterCommunication as karinAdapterCommunication } from 'node-karin'
import { AdapterCommunication } from '@puniyu/protocol'

export const convertToPuniyu = (
  communication: karinAdapterCommunication,
): AdapterCommunication => {
  switch (communication) {
    case 'http':
      return AdapterCommunication.Http
    case 'webSocketClient':
      return AdapterCommunication.WebSocketClient
    case 'webSocketServer':
      return AdapterCommunication.WebSocketServer
    case 'grpc':
      return AdapterCommunication.Grpc
    case 'other':
      return AdapterCommunication.Other
  }
}

export const convertToKarin = (
  communication: AdapterCommunication,
): karinAdapterCommunication => {
  switch (communication) {
    case AdapterCommunication.Http:
      return 'http'
    case AdapterCommunication.WebSocketClient:
      return 'webSocketClient'
    case AdapterCommunication.WebSocketServer:
      return 'webSocketServer'
    case AdapterCommunication.Grpc:
      return 'grpc'
    case AdapterCommunication.Other:
      return 'other'
  }
}
