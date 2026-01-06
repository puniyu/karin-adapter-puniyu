import { Role as karinRole } from 'node-karin'
import { Role } from '@puniyu/protocol'

export const convertToPuniyu = (role: karinRole): Role => {
  switch (role) {
    case 'owner':
      return Role.Owner
    case 'admin':
      return Role.Admin
    case 'member':
      return Role.Member
    case 'unknown':
      return Role.Unknown
  }
}

export const convertToKarin = (role: Role): karinRole => {
  switch (role) {
    case Role.Owner:
      return 'owner'
    case Role.Admin:
      return 'admin'
    case Role.Member:
      return 'member'
    case Role.Unknown:
      return 'unknown'
  }
}
