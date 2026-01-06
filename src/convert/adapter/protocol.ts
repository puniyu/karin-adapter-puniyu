import { AdapterProtocol as karinAdapterProtocol } from 'node-karin'
import { AdapterProtocol } from '@puniyu/protocol'

export const convertToPuniyu = (
  protocol: karinAdapterProtocol,
): AdapterProtocol => {
  switch (protocol) {
    case 'qqbot':
      return AdapterProtocol.QQBot
    case 'conwechat':
      return AdapterProtocol.Conwechat
    case 'oicq':
      return AdapterProtocol.Oicq
    case 'icqq':
      return AdapterProtocol.Icqq
    case 'gocq-http':
      return AdapterProtocol.GoCqHttp
    case 'llonebot':
      return AdapterProtocol.LLOneBot
    case 'lagrange':
      return AdapterProtocol.Lagrange
    case 'napcat':
      return AdapterProtocol.NapCat
    case 'console':
      return AdapterProtocol.Console
    case 'other':
      return AdapterProtocol.Other
  }
}

export const convertToKarin = (
  protocol: AdapterProtocol,
): karinAdapterProtocol => {
  switch (protocol) {
    case AdapterProtocol.QQBot:
      return 'qqbot'
    case AdapterProtocol.Conwechat:
      return 'conwechat'
    case AdapterProtocol.Oicq:
      return 'oicq'
    case AdapterProtocol.Icqq:
      return 'icqq'
    case AdapterProtocol.GoCqHttp:
      return 'gocq-http'
    case AdapterProtocol.LLOneBot:
      return 'llonebot'
    case AdapterProtocol.Lagrange:
      return 'lagrange'
    case AdapterProtocol.NapCat:
      return 'napcat'
    case AdapterProtocol.Console:
      return 'console'
    case AdapterProtocol.Other:
      return 'other'
  }
}
