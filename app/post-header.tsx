import CoverImage from './cover-image'

const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

export default function PostHeader({ title, coverImage, date, artist, favoriteMonth } : {
  title: string
  coverImage: string
  date: string
  artist: string
  favoriteMonth: string
}) {
  return (
    <>
      <div className="album-page-header">
        <CoverImage title={title} url={coverImage} />
        <div className="album-page-info">
          <h2>{monthNames[new Date(favoriteMonth).getUTCMonth()]}</h2>
          <h1>{title} ({date})</h1>
          <p className="album-page-subtitle">{artist}</p>
        </div>
      </div>
    </>
  )
}
