import Link from 'next/link'
import CoverImage from './cover-image'
import ContentfulImage from "../lib/contentful-image"
import FavoriteImage from "../assets/favorite.svg"

const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

export default function AlbumCard({
  title,
  coverImage,
  date,
  slug,
  releaseYear,
  artistName,
  favorite
}: {
  title: string
  coverImage: any
  date: string
  slug: string
  releaseYear: number
  artistName: string
  favorite: boolean
}) {
  return (
    <div className="album">
      <h2 className="album-month">{monthNames[new Date(date).getUTCMonth()]}</h2>
      <div className="album-content">
        {favorite && <div className="favorite">
          <ContentfulImage
            src={FavoriteImage}
            height="100"
            className="rounded-full"
            alt="favorite image tag"
          />
          </div>}
        <CoverImage title={title} url={coverImage} slug={slug} />
        <div className="album-info">
          <div className="album-details">
            <div className="album-details-text">
              <Link href={`/posts/${slug}`}>
                <h4 className="album-title">{title} ({releaseYear})</h4>
              </Link>
              <p>{artistName}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}