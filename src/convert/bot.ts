import {
  AdapterInfo as karinAdapterInfo,
  AccountInfo as karinAccountInfo,
} from 'node-karin'
import { BotInfo } from '@puniyu/protocol'
import * as adapter from './adapter'
import * as account from './account'

export const convertToPuniyu = (
  adapterInfo: karinAdapterInfo,
  accountInfo: karinAccountInfo,
): BotInfo => {
  return {
    adapter: adapter.convertToPuniyu(adapterInfo),
    account: account.convertToPuniyu(accountInfo),
  }
}
