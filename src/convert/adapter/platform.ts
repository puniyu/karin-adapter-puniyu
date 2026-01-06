import { AdapterPlatform as karinAdapterPlatform } from 'node-karin'
import { AdapterPlatform } from '@puniyu/protocol'

export const convertToPuniyu = (
  adapter: karinAdapterPlatform,
): AdapterPlatform => {
  switch (adapter) {
    case 'qq':
      return AdapterPlatform.QQ
    case 'koko':
      return AdapterPlatform.Kook
    case 'wechat':
      return AdapterPlatform.Wechat
    case 'discord':
      return AdapterPlatform.Discord
    case 'telegram':
      return AdapterPlatform.Telegram
    case 'other':
      return AdapterPlatform.Other
  }
}

export const convertToKarin = (
  adapter: AdapterPlatform,
): karinAdapterPlatform => {
  switch (adapter) {
    case AdapterPlatform.QQ:
      return 'qq'
    case AdapterPlatform.Kook:
      return 'koko'
    case AdapterPlatform.Wechat:
      return 'wechat'
    case AdapterPlatform.Discord:
      return 'discord'
    case AdapterPlatform.Telegram:
      return 'telegram'
    case AdapterPlatform.Other:
      return 'other'
  }
}
