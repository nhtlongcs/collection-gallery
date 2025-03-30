export interface CollectionItem {
  id?: string
  title: string
  description: string
  imageUrl?: string
}

export interface Collection {
  id?: string
  name: string
  description: string
  items: CollectionItem[]
}

