import { MessageReceiveEvent } from '@puniyu/protocol'
import { GroupMessage, FriendMessage } from 'node-karin'
import * as bot from '@/convert/bot'
import * as element from '@/convert/element'
import * as contact from '@/convert/contact'
import * as sender from '@/convert/sender'
export const convertToPuniyu = async (
  data: GroupMessage | FriendMessage,
): Promise<MessageReceiveEvent> => {
  const message = {
    bot: bot.convertToPuniyu(data.bot.adapter, data.bot.account),
    eventId: data.eventId,
    time: data.time,
    selfId: data.selfId,
    userId: data.userId,
    messageId: data.messageId,
    elements: await element.send.convertToPuniyu(data.elements),
  }

  if (data.isGroup) {
    return {
      type: 'Group',
      field0: {
        ...message,
        contact: contact.group.convertToPuniyu(data.contact),
        sender: sender.group.convertToPuniyu(data.sender),
      },
    }
  } else {
    return {
      type: 'Friend',
      field0: {
        ...message,
        contact: contact.friend.convertToPuniyu(data.contact),
        sender: sender.friend.convertToPuniyu(data.sender),
      },
    }
  }
}
