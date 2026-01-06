import { FriendContact as karinFriendContact } from 'node-karin'
import { FriendContact } from '@puniyu/protocol'
import * as scene from './scene'

export const convertToPuniyu = (contact: karinFriendContact): FriendContact => {
  return {
    scene: scene.convertToPuniyu(contact.scene),
    peer: contact.peer,
    name: contact.name,
  }
}

export const convertToKarin = (contact: FriendContact): karinFriendContact => {
  return {
    scene: scene.convertToKarin(contact.scene),
    peer: contact.peer,
    name: contact.name ? contact.name : 'unknown',
  }
}
