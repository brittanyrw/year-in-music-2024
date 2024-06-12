import Link from 'next/link'
import { draftMode } from 'next/headers'

import Albums from '../../albums'
import PostHeader from '../../post-header'

import { Markdown } from '@/lib/markdown'
import { getAllAlbumPosts, getPostAndMoreAlbumPosts } from '@/lib/api'

export async function generateStaticParams() {
  const allPosts = await getAllAlbumPosts(false)

  return allPosts.map((post) => ({
    slug: post.slug,
  }))
}

export default async function PostPage({
  params,
}: {
  params: { slug: string }
}) {
  const { isEnabled } = draftMode()
  const { post, morePosts } = await getPostAndMoreAlbumPosts(params.slug, isEnabled)

  return (
    <div className="page">
      <section className="page-header">
          <h2>
            <Link href="/">
              <p className="header-link">👈🏾 Back to List</p>
            </Link>
          </h2>
        </section>
        <section className="page-content">
            <article>
              <div className="page-title-section">
                <title>
                  {post.name}
                </title>
                <meta property="og:image" content={post.albumCover.url} />
              </div>
              <PostHeader
                title={post.name}
                coverImage={post.albumCover.url}
                date={post.releaseYear}
                favoriteMonth={post.favoriteMonth}
                artist={post.artistName}
              />
              <div className="rich-text-content">
              <Markdown content={post.thoughts} />
            </div>
            </article>
            <hr />
            {morePosts && morePosts.length > 0 && (
              <Albums posts={morePosts} />
            )}
            <section />
          </section>
    </div>
  )
}
