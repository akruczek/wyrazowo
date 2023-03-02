// TODO: implement read from file
import { slowa } from '../../assets/slowa'

export const asyncReadFile = async (filename: string, type?: string) => new Promise<string[]>((resolve, reject) => {
  resolve(slowa.split('.'))
})
