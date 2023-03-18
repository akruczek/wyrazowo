interface FetchClient {
  get: (
    onSuccess: (response: Response) => void,
    onError: () => void,
  ) => Promise<Response | Error>;
}

export const fetchClient = (
  url: string,
): FetchClient => ({
  get: (
    onSuccess: (response: Response) => void,
    onError: () => void,
  ) => {
    try {
      return fetch(url).then(onSuccess)
    } catch (error: any) {
      onError()
      return error
    }
  }
})
