import { AdapterInfo as karinAdapterInfo } from 'node-karin'
import { AdapterInfo } from '@puniyu/protocol'
import * as version from '@/convert/version'
import * as platform from './platform'
import * as standard from './standard'
import * as protocol from './protocol'
import * as communication from './communication'

export const convertToPuniyu = (adapter: karinAdapterInfo): AdapterInfo => {
  return {
    name: adapter.name,
    version: version.convertToPuniyu(adapter.version),
    platform: platform.convertToPuniyu(adapter.platform),
    standard: standard.convertToPuniyu(adapter.standard),
    protocol: protocol.convertToPuniyu(adapter.protocol),
    communication: communication.convertToPuniyu(adapter.communication),
    address: adapter.address,
    connectTime: new Date(adapter.connectTime),
  }
}

export { version, platform, standard, protocol, communication }
