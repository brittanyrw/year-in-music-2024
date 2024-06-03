import AlbumCard from './album-card'

export default function albums({ posts }: { posts: any[] } ) {
  return (
      <section className="album-container container">
        {posts.map((post) => (
          <AlbumCard
            key={post.slug}
            title={post.name}
            coverImage={post.albumCover.url}
            releaseYear={post.releaseYear}
            artistName={post.artistName}
            date={post.favoriteMonth}
            slug={post.slug}
            favorite={post.favorite}
          />
        ))}
      </section>
  )
}
