import { FriendSender as karinFriendSender } from 'node-karin'
import { FriendSender } from '@puniyu/protocol'
import * as sex from './sex'

export const convertToPuniyu = (sender: karinFriendSender): FriendSender => {
  return {
    userId: sender.userId,
    nick: sender.nick,
    age: sender.age ?? 0,
    sex: sex.convertToPuniyu(sender.sex ?? 'unknown'),
  }
}

export const convertToKarin = (sender: FriendSender): karinFriendSender => {
  const nick = sender.nick ? sender.nick : 'unknown'
  return {
    userId: sender.userId,
    nick,
    name: nick,
    age: sender.age,
    sex: sex.convertToKarin(sender.sex),
  }
}
