import { GroupSender as karinGroupSender } from 'node-karin'
import { GroupSender } from '@puniyu/protocol'
import * as role from './role'
import * as sex from './sex'

export const convertToPuniyu = (sender: karinGroupSender): GroupSender => {
  return {
    userId: sender.userId,
    nick: sender.nick,
    age: sender.age ?? 0,
    sex: sex.convertToPuniyu(sender.sex ?? 'unknown'),
    role: role.convertToPuniyu(sender.role),
    card: sender.card,
    level: sender.level,
    title: sender.title,
  }
}

export const convertToKarin = (sender: GroupSender): karinGroupSender => {
  const nick = sender.nick ? sender.nick : 'unknown'
  return {
    userId: sender.userId,
    nick,
    name: nick,
    age: sender.age,
    sex: sex.convertToKarin(sender.sex),
    role: role.convertToKarin(sender.role),
    card: sender.card,
    level: sender.level,
    title: sender.title,
  }
}
