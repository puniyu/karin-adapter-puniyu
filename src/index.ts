import { AdapterPuniyu } from '@/core'
import { hooks } from 'node-karin'
import * as event from '@/convert/event'

export const KARIN_PLUGIN_INIT = async () => {
  const client = new AdapterPuniyu()
  hooks.message(async (message) => {
    if (message.isDirect) return
    if (message.isGroupTemp) return
    if (message.isGuild) return
    const data = await event.message.receive.convertToPuniyu(message)
    client.send({ type: 'Message', field0: data })
  })
}
