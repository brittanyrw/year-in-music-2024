const ALBUM_GRAPHQL_FIELDS = `
name
slug
albumCover {
  url
  description
}
releaseYear
artistName
favoriteMonth
favorite
thoughts {
  json
}
`

async function fetchGraphQL(query: string, preview = false): Promise<any> {
  return fetch(
    `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${
          preview
            ? process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN
            : process.env.CONTENTFUL_ACCESS_TOKEN
        }`,
      },
      body: JSON.stringify({ query }),
      next: { tags: ['posts'] },
    }
  ).then((response) => response.json())
}

function extractAlbumPost(fetchResponse: any): any {
  return fetchResponse?.data?.albumCollection?.items?.[0]
}

function extractAlbumPostEntries(fetchResponse: any): any[] {
  return fetchResponse?.data?.albumCollection?.items
}

export async function getPreviewAlbumPostBySlug(slug: string | null): Promise<any> {
  const entry = await fetchGraphQL(
    `query {
      albumCollection(where: { slug: "${slug}" }, preview: true, limit: 1) {
        items {
          ${ALBUM_GRAPHQL_FIELDS}
        }
      }
    }`,
    true
  )
  return extractAlbumPost(entry)
}

export async function getAllAlbumPosts(isDraftMode: boolean): Promise<any[]> {
  const entries = await fetchGraphQL(
    `query {
      albumCollection(where: { slug_exists: true }, order: favoriteMonth_ASC, preview: ${
        isDraftMode ? 'true' : 'false'
      }) {
        items {
          ${ALBUM_GRAPHQL_FIELDS}
        }
      }
    }`,
    isDraftMode
  )
  return extractAlbumPostEntries(entries)
}

export async function getPostAndMoreAlbumPosts(
  slug: string,
  preview: boolean
): Promise<any> {
  const entry = await fetchGraphQL(
    `query {
      albumCollection(where: { slug: "${slug}" }, preview: ${
      preview ? 'true' : 'false'
    }, limit: 3) {
        items {
          ${ALBUM_GRAPHQL_FIELDS}
        }
      }
    }`,
    preview
  )
  const entries = await fetchGraphQL(
    `query {
      albumCollection(where: { slug_not_in: "${slug}" }, order: favoriteMonth_ASC, preview: ${
      preview ? 'true' : 'false'
    }, limit: 3) {
        items {
          ${ALBUM_GRAPHQL_FIELDS}
        }
      }
    }`,
    preview
  )
  return {
    post: extractAlbumPost(entry),
    morePosts: extractAlbumPostEntries(entries),
  }
}
