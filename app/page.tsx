import Link from 'next/link'
import { draftMode } from 'next/headers'

import Albums from './albums'


import { getAllAlbumPosts } from '@/lib/api'

function Intro() {
  return (
    <section className="hero">
      <h1 className="title">
        <Link href="/">
          Year in music.
        </Link>
      </h1>
      <p className="intro">
        Spotify Wrapped is neat but it really only tracks what we binge listen to. Use this project to keep track of the albums that defined each month for you.
      </p>
    </section>
  )
}

export default async function Page() {
  const { isEnabled } = draftMode()
  const allPosts = await getAllAlbumPosts(isEnabled)

  return (
    <div>
      <Intro />
      <section className="home-albums">
        <Albums posts={allPosts} />
      </section>
    </div>
  )
}
