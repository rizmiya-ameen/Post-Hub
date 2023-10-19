import CategoryList from "@/components/CategoryList"
import Post from "@/components/Post"
import { postsData } from "@/data"

export default function Home() {
  
  return (
    <div>
      <CategoryList />

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
        (<p className="py-6">There are no posts to show</p>)
      }
      
    </div>
  )
}

    