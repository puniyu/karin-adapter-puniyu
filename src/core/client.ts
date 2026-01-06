import { AdapterBase, AdapterType, getBot, logger } from 'node-karin'
import WebSocket from 'node-karin/ws'
import { Config } from '@/common'
import { adapterName, adapterVersion } from '@/root'
import { Protocol, EventReceive } from '@puniyu/protocol'
import * as contact from '@/convert/contact'
import * as element from '@/convert/element'

export class AdapterPuniyu extends AdapterBase implements AdapterType {
  #ws!: WebSocket
  #reconnectAttempts = 0
  #reconnectInterval = 3000
  #protocol = new Protocol()
  constructor() {
    super()
    this.#initWebSocket()
  }

  logger() {
    return logger.chalk.rgb(232, 199, 203)('[Puniyu]')
  }

  #initWebSocket() {
    const isWss = Config.wss
    const puniyuPath = `${isWss ? 'wss' : 'ws'}://${Config.host}:${Config.port}/api/bot/karin`

    this.adapter = {
      index: 0,
      name: adapterName,
      version: adapterVersion,
      platform: 'other',
      standard: 'other',
      protocol: 'other',
      communication: 'webSocketClient',
      address: puniyuPath,
      connectTime: new Date().getTime(),
      secret: null,
    }

    this.#ws = new WebSocket(puniyuPath)

    this.#ws.on('open', () => {
      this.#reconnectAttempts = 0
      logger.info(this.logger(), '连接成功')
    })

    this.#ws.on('error', (err) => {
      logger.info(this.logger(), '连接出错')
      logger.debug(this.logger(), err)
    })

    this.#ws.on('close', (_code, reason) => {
      logger.info(this.logger(), '连接关闭')
      logger.debug(this.logger(), reason.toString())
      this.#reconnect()
    })

    this.#ws.on('message', async (data) => {
      if (Buffer.isBuffer(data)) {
        const event = this.#protocol.decode(data)
        if (event.type === 'Message') {
          const message_event = event.field0
          logger.info(
            this.logger(),
            `收到消息: message_id: ${message_event.field0.messageId}`,
          )
          const selfId = message_event.field0.selfId
          const bot = getBot(selfId)!
          switch (message_event.type) {
            case 'Group': {
              const ct = contact.group.convertToKarin(
                message_event.field0.contact,
              )
              const elements = await element.send.convertToKarin(
                message_event.field0.elements,
              )
              return await bot.sendMsg(ct, elements)
            }
            case 'Friend': {
              const ct = contact.friend.convertToKarin(
                message_event.field0.contact,
              )
              const elements = await element.send.convertToKarin(
                message_event.field0.elements,
              )
              return await bot.sendMsg(ct, elements)
            }
          }
        }
      }
      logger.warn(this.logger(), '收到未知事件数据')
    })
  }
  #reconnect() {
    this.#reconnectAttempts++
    logger.debug(this.logger(), `尝试重连 (${this.#reconnectAttempts})`)

    setTimeout(() => {
      this.#initWebSocket()
    }, this.#reconnectInterval)
  }
  send(data: EventReceive) {
    const pb = this.#protocol.encode(data)
    logger.debug(this.logger(), '发送数据', pb)
    this.#ws.send(pb)
  }
}
