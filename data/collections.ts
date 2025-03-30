import type { Collection } from "@/types/collection"
import json_collections from "./collections.json"

export const collections: Collection[] = json_collections;

// collections.json
// [
//   {
//     "id": <string>,
//     "name": "Album name",
//     "description": "Album description",
//     "items": [
//       {
//         "id": <string>,
//         "title": "Image title",
//         "description": "Image description",
//         "imageUrl": "path/to/image.jpg"
//       },
//       ...
//     ]
//   },
//   ...
