import CreatePostForm from '@/components/CreatePostForm'
import { getServerSession } from "next-auth/next"
import { authOptions } from '../api/auth/[...nextauth]/route'
import { redirect } from 'next/navigation'

const CreatePost = async () => {

  const session = await getServerSession(authOptions)

  console.log(session)
  /*{
  user: {
    name: 'Fathima Rizmiya',
    email: 'rizmiyaamin@gmail.com',
    image: 'https://lh3.googleusercontent.com/a/ACg8ocJHeatwI7pxdykx3kqBHYgG7pzngc5gIY_N5DBkHPE-LQ=s96-c'
  }
}*/

  if(!session) {
    redirect('/sign-in')
  }

  return (
    <div>
      <CreatePostForm />
    </div>
  )
}

export default CreatePost





/*

Backend - API Route
To protect an API Route, you can use the getServerSession() method.
*/