import FileAsset from 'react-native-file-asset';

export const asyncReadFile = async (filename: string, type?: string) => new Promise<string[]>((resolve, reject) => {
  FileAsset
    .loadTextFile(filename, type ?? 'txt')
    .then((content: string) => {
      const arrayOfContent = content.split(/\r?\n/)
      resolve(arrayOfContent)
    })
    .catch((error: Error) => {
      reject(error)
    })
})
