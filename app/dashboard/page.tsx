import { postsData } from "@/data"
import Link from "next/link"
import Post from "@/components/Post"
import { getServerSession } from "next-auth/next"
import { authOptions } from '../api/auth/[...nextauth]/route'
import { redirect } from 'next/navigation'

const Dashboard = async () => {

  const session = await getServerSession(authOptions)

  if(!session) {
    redirect('/sign-in')
  }

  return (
    <div>
      <h1>My Posts</h1>

      {postsData && postsData.length > 0 ? 
        (postsData.map(item => 
          <Post 
            key={item.id}
            id={item.id}
            title={item.title}
            author={item.author}
            authorEmail="test@email.com"
            datepublished={item.datepublished}
            category={item.category}
            links={item.links}
            thumbnail={item.thumbnail}
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
