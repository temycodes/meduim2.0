import Head from 'next/head';
import Link from 'next/link';
import Header from '../components/Header';
import { sanityClient, urlFor } from '../sanity';
import { Post } from '../typings';

interface Props {
  posts: [Post];
}

export default function Home({posts}: Props) {
  return (
    <div className="max-w-7xl mx-auto">
      <Head>
        <title>Meduim 2.0</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />

      <div className="flex justify-between items-center bg-yellow-400 border-y border-black py-10 lg:py-0">
        <div className="px-10 space-y-5">
          <h1 className="text-5xl max-w-xl font-serif">
            <span className="underline decoration-black decoration-4">
              Meduim
            </span> is a place to write, read and connect
          </h1>
          <h2>
            it's easy and free to post your thinking on any topic and connect with millions of readers.
          </h2>
        </div>

        <img
          className="hidden md:inline-flex h-32 lg:h-full"
          src="https://accountabilitylab.org/wp-content/uploads/2020/03/Medium-logo.png" alt="meduim logo" />
      </div>
      {/* posts server side rende*/}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 p-2 md:p-6">
        {posts.map((post) => (
          <Link key={post._id} href={`/post/${post.slug.current}`}>
            <div className="cursor-pointer">
              <img src={
                urlFor(post.mainImage).url()!
              } alt="" />
              <div className="flex flex-col  justify-between items-center bg-white-400 border-y border-black p-5">
                <p className='text-center'>{post.title}</p> 
              </div> 
              <div className="flex justify-between items-center">
                  <p className="mb-3">({post.description}) by { post.author?.name }</p>
                  <img
                    className='h-12 w-12 rounded-full'
                    src={urlFor(post.author?.image).url()!}
                    alt="IMG" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export const getServerSideProps = async () => {
  //fetch all information from sanity
  const query = `*[_type == 'post']{
    _id,
    title,
    author-> {
        name,
        image,
  },
    description,
    mainImage,
    slug, 
  }`;
  
  const posts = await sanityClient.fetch(query);

  return {
    props: {
      posts,
    }
  }
}