import { AccountInfo as karinAccountInfo } from 'node-karin'
import { AccountInfo } from '@puniyu/protocol'

export const convertToPuniyu = (account: karinAccountInfo): AccountInfo => {
  return {
    uin: account.uin,
    name: account.name,
    avatar: account.avatar,
  }
}
