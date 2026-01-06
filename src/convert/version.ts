import { Version } from "@puniyu/protocol";

export const convertToPuniyu = (version: string): Version => {
  const data = version.split(".")
  return {
    major: parseInt(data[0]),
    minor: parseInt(data[1]),
    patch: parseInt(data[2]),
  }
}

export const convertToKarin = (version: Version): string => {
  return `${version.major}.${version.minor}.${version.patch}`
}