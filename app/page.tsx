import CategoryList from "@/components/CategoryList"
import Post from "@/components/Post"
import { TPost } from "./types"

const getPosts = async (): Promise<TPost[] | null> => {
  try {
    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/posts`, {
      cache: 'no-store'
    })
    
    if (res.ok) {
      const posts = await res.json()
      return posts;
    }
  } catch (error) {
    console.log(error)
  }

  return null;
}

export default async function Home() {

  const posts = await getPosts();
  
  return (

    
    <div>
      <CategoryList />

      {posts && posts.length > 0 ? 
        (posts.map(item => 
          <Post 
            key={item.id}
            id={item.id}
            title={item.title}
            author={item.author.name}
            authorEmail={item.authorEmail}
            datepublished={item.createdAt}
            category={item.catName}
            links={item.links || []}
            thumbnail={item.imageUrl}
            content={item.content}
          />
        ))  
        
          : 
        (<p className="py-6">There are no posts to show</p>)
      }
      
    </div>
  )
}

    