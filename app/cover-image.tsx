import ContentfulImage from '../lib/contentful-image'
import Link from 'next/link'

function cn(...classes: any[]) {
  return classes.filter(Boolean).join(' ')
}

export default function CoverImage({
  title,
  url,
  slug,
}: {
  title: string
  url: string
  slug?: string
}) {
  const image = (
    <ContentfulImage
      alt={`Cover Image for ${title}`}
      priority
      width={400}
      height={400}
      src={url}
    />
  )

  return (
    <div className="album-cover-wrapper">
      {slug ? (
        <Link href={`/posts/${slug}`} aria-label={title}>
          {image}
        </Link>
      ) : (
        image
      )}
    </div>
  )
}
