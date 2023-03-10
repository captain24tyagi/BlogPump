import author from '@/blogpump/schemas/author';
import Header from '@/components/Header'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link';
import { sanityClient, urlFor } from '../sanity';
import { Post } from '../typings';
interface Props {
  posts: Post[];
}

export default function Home({ posts }: Props) {

  return (
    <div className='max-w-7xl mx-auto'>
      <Head>
        <title>BlogPump</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header/>

      <div className='flex justify-between items-center bg-pink-300 py-20'>
        <div className='space-y-5 px-10'>
          <h1 className='text-6xl font-serif max-w-2xl'><span className='underline decoration-black'>BlogPump</span>{" "} is a platform to express your opinions, read, write and connect with writers.</h1>
          <h2 className=' font-semibold'>It is easy and free to post your thinking over any topic and connect with millions of readers.</h2> 
        </div>

        <Image
          className='hidden md:inline-flex h-50 lg:h-full'
          src="https://cdn-icons-png.flaticon.com/512/51/51221.png"
          alt='/'
          height={260}
          width={260}
        />
      </div>

      <div className=' grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 p-2 md:p-6'>
        {posts.map((post) => (
          <Link key={post._id} href={`/posts/${post.slug.current}`}>
            <div className='my-10 max-w-fit border rounded-lg cursor-pointer overflow-hidden'>
              <Image 
               className=' h-60 w-full object-cover hover:scale-105 transition-transform duration-200 ease-in-out'
               src={urlFor(post.mainImage).url()}
               alt='/'
               height={300}
               width={500}
              />
              <div className='flex items-center justify-between mr-3'>
                <div className='items-center justify-between p-5 bg-white'>
                  <p className=' text-lg font-bold'>{post.title}</p>
                  <p className=' text-xs'>{post.description} by {post.author.name}</p>
                </div>
                  
                <Image
                  className='h-11 w-12 rounded-full mx-auto'
                  src={urlFor(post.author.image).url()}
                  alt='/'
                  height={60}
                  width={150}
                />
                
              </div>
            </div>
          </Link>
        ))}
      </div>



    </div>
  )
}

// Server Side Rendering - SSR - Everytime when users tries to access a seperate page is created 
// and then rendered over to client by nextJS

export const getServerSideProps = async () => {
  const query = `*[_type == "post"]{
    _id,
    title,
    author -> {
      name,
      image
    },
    description,
    mainImage,
    slug,
  }`;

  const posts = await sanityClient.fetch(query)

  return {
    props: {
      posts,
    }
  }
}