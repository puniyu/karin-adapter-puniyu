import { Scene } from '@puniyu/protocol'

export const convertToPuniyu = (scene: string): Scene => {
  if (scene === 'group') {
    return Scene.Group
  } else {
    return Scene.Friend
  }
}
export const convertToKarin = <T extends 'group' | 'friend'>(scene: Scene): T => {
  if (scene === Scene.Group) {
    return 'group' as T
  } else {
    return 'friend' as T
  }
}