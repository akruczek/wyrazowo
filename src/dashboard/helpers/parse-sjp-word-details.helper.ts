export const parseSjpWordDetails = (text: string): string[] => text
  ?.split('znaczenie')?.[1]
  ?.split('KOMENTARZE')?.[0]
  ?.split('max-width: 34em; ">')?.[1]
  ?.split('</p>')?.[0]
  ?.split('<br />')
  ?.map((definition: string) => definition?.split('. ')?.[1]?.trim?.())
  ?.filter((definition: string | null) => !!definition)
