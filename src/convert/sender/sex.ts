import { Sex as karinSex } from 'node-karin'
import { Sex } from '@puniyu/protocol'

export const convertToPuniyu = (sex: karinSex): Sex => {
  switch (sex) {
    case 'male':
      return Sex.Male
    case 'female':
      return Sex.Female
    case 'unknown':
      return Sex.Unknown
  }
}

export const convertToKarin = (sex: Sex): karinSex => {
  switch (sex) {
    case Sex.Male:
      return 'male'
    case Sex.Female:
      return 'female'
    case Sex.Unknown:
      return 'unknown'
  }
}
