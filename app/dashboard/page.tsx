import Link from "next/link"
import Post from "@/components/Post"
import { getServerSession } from "next-auth/next"
import { authOptions } from '../api/auth/[...nextauth]/route'
import { redirect } from 'next/navigation'
import { TPost } from "../types"


const getPosts = async (email: string) => {
  try {
    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/authors/${email}`)

    const { posts } = await res.json();
    return posts;
  } catch (error) {
    return null;
  }
}

const Dashboard = async () => {

  const session = await getServerSession(authOptions)

  const email = session?.user?.email
  let posts = []
  
  if (email) {
    posts = await getPosts(email);
  }

  if(!session) {
    redirect('/sign-in')
  }

  return (
    <div>
      <h1>My Posts</h1>

      {posts && posts.length > 0 ? 
        (posts.map((item: TPost) => 
          <Post 
            key={item.id}
            id={item.id}
            title={item.title}
            author={""}
            authorEmail={item.authorEmail}
            datepublished={item.createdAt}
            category={item.catName}
            links={item.links || []}
            thumbnail={item.imageUrl}
            content={item.content}
          />
        ))  
        
          : 
        (
          <div className="py-6">
            <p>No posts created yet{" "}</p>
            <Link className="underline" href="/create-post">Create New</Link>
          </div>
        )
      }
    </div>
  )
}

export default Dashboard
