import { Elements as karinElements } from 'node-karin'
import { SendElements } from '@puniyu/protocol'
import axios from 'node-karin/axios'
import { FileType } from '@/types'
import fs from 'node:fs'
import { fileURLToPath } from 'node:url'
export const convertToPuniyu = async (
  data: Array<karinElements>,
): Promise<Array<SendElements>> => {
  const elements: Array<SendElements> = []
  for (const i of data) {
    switch (i.type) {
      case 'text':
        {
          const data = {
            text: i.text,
          }
          elements.push({
            type: 'Text',
            field0: data,
          })
        }
        break
      case 'at':
        {
          const data = {
            targetId: i.targetId,
          }
          elements.push({
            type: 'At',
            field0: data,
          })
        }
        break
      case 'reply': {
        const data = {
          messageId: i.messageId,
        }
        elements.push({
          type: 'Reply',
          field0: data,
        })
        break
      }
      case 'face': {
        const data = {
          id: i.id,
        }
        elements.push({
          type: 'Face',
          field0: data,
        })
        break
      }
      case 'image': {
        const imageData = await getFileData(i.file)
        const data = {
          file: imageData,
          summary: i.summary,
        }
        elements.push({
          type: 'Image',
          field0: data,
        })
        break
      }
      case 'file': {
        const fileData = await getFileData(i.file)
        const data = {
          file: fileData,
          fileName: i.name ? i.name : 'file',
        }
        elements.push({
          type: 'File',
          field0: data,
        })
        break
      }
      case 'video': {
        const videoData = await getFileData(i.file)
        const data = {
          file: videoData,
          fileName: i.name ? i.name : 'video',
        }
        elements.push({
          type: 'Video',
          field0: data,
        })
        break
      }
      case 'record': {
        const recordData = await getFileData(i.file)
        const data = {
          file: recordData,
        }
        elements.push({
          type: 'Record',
          field0: data,
        })
        break
      }
      case 'json': {
        const data = {
          data: i.data,
        }
        elements.push({
          type: 'Json',
          field0: data,
        })
        break
      }
    }
  }
  return elements
}

export const convertToKarin = async (
  data: Array<SendElements>,
): Promise<Array<karinElements>> => {
  const elements: Array<karinElements> = []
  for (const i of data) {
    switch (i.type) {
      case 'Text': {
        elements.push({
          type: 'text',
          text: i.field0.text,
        })
        break
      }
      case 'At': {
        elements.push({
          type: 'at',
          targetId: i.field0.targetId,
        })
        break
      }
      case 'Reply': {
        elements.push({
          type: 'reply',
          messageId: i.field0.messageId,
        })
        break
      }
      case 'Face': {
        elements.push({
          type: 'face',
          id: i.field0.id,
        })
        break
      }
      case 'Image': {
        const imageData = i.field0.file.toString('base64')
        elements.push({
          type: 'image',
          file: `base64://${imageData}`,
          summary: i.field0.summary,
        })
        break
      }
      case 'File': {
        const fileData = i.field0.file.toString('base64')
        elements.push({
          type: 'file',
          file: `base64://${fileData}`,
          name: i.field0.fileName,
        })
        break
      }
      case 'Video': {
        const videoData = i.field0.file.toString('base64')
        elements.push({
          type: 'video',
          file: `base64://${videoData}`,
          name: i.field0.fileName,
        })
        break
      }
      case 'Record': {
        const recordData = i.field0.file.toString('base64')
        elements.push({
          type: 'record',
          file: `base64://${recordData}`,
          magic: false,
        })
        break
      }
      case 'Json': {
        elements.push({
          type: 'json',
          data: i.field0.data,
        })
        break
      }
    }
  }
  return elements
}

const getFileType = (data: string): FileType => {
  try {
    const url = new URL(data)
    switch (url.protocol) {
      case 'http:':
      case 'https:':
        return FileType.Url
      case 'file:':
        return FileType.File
      default:
        return FileType.Base64
    }
  } catch {
    return FileType.Base64
  }
}

const getFileData = async (data: string): Promise<Buffer> => {
  const type = getFileType(data)
  switch (type) {
    case FileType.Url: {
      const res = await axios.get(data, { responseType: 'arraybuffer' })
      return res.data
    }
    case FileType.File: {
      const filePath = fileURLToPath(data)
      return await fs.promises.readFile(filePath)
    }
    case FileType.Base64: {
      return Buffer.from(data, 'base64')
    }
  }
}
