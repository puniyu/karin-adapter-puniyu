import { AdapterStandard } from '@puniyu/protocol'
import { AdapterStandard as karinAdapterStandard } from 'node-karin'

export const convertToPuniyu = (
  standard: karinAdapterStandard,
): AdapterStandard => {
  switch (standard) {
    case 'oicq':
      return AdapterStandard.Oicq
    case 'icqq':
      return AdapterStandard.Icqq
    case 'onebot11':
      return AdapterStandard.OneBotV11
    case 'onebot12':
      return AdapterStandard.OneBotV12
    case 'other':
      return AdapterStandard.Other
  }
}

export const convertToKarin = (
  standard: AdapterStandard,
): karinAdapterStandard => {
  switch (standard) {
    case AdapterStandard.Oicq:
      return 'oicq'
    case AdapterStandard.Icqq:
      return 'icqq'
    case AdapterStandard.OneBotV11:
      return 'onebot11'
    case AdapterStandard.OneBotV12:
      return 'onebot12'
    case AdapterStandard.Other:
      return 'other'
  }
}
