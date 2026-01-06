import { GroupContact as karinGroupContact } from 'node-karin'
import { GroupContact } from '@puniyu/protocol'
import * as scene from './scene'

export const convertToPuniyu = (contact: karinGroupContact): GroupContact => {
  return {
    scene: scene.convertToPuniyu(contact.scene),
    peer: contact.peer,
    name: contact.name,
  }
}

export const convertToKarin = (contact: GroupContact): karinGroupContact => {
  return {
    scene: scene.convertToKarin(contact.scene),
    peer: contact.peer,
    name: contact.name ? contact.name : 'unknown',
  }
}
