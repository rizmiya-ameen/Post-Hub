import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function GET (req: Request, {params}: {params: {id: string}}) {
  try {
    const id = params.id;
    //console.log(id)

    //we get a specific post based on id
    const post = await prisma.post.findUnique({where: { id }})
    return NextResponse.json(post) 

  } catch (error) {
    console.log(error)
    return NextResponse.json({message: "Couldnt fetch post"}, {status: 500})
  }
}
//checks that the user is signed in and is the author of the post
//returns an error response if not, otherwise null
async function checkAuthor(id: string) {
  const session = await getServerSession(authOptions)

  if (!session?.user?.email) {
    return NextResponse.json({error: "Not authenticated"}, {status: 401})
  }

  const post = await prisma.post.findUnique({where: { id }})

  if (!post) {
    return NextResponse.json({error: "Post not found"}, {status: 404})
  }

  if (post.authorEmail !== session.user.email) {
    return NextResponse.json({error: "Not allowed"}, {status: 403})
  }

  return null
}

export async function PUT(req: Request, {params} : {params : { id: string}}) {

  const {title, content, links, imageUrl, publicId, selectedCategory} = await req.json();
  const id = params.id

  try {
    //to check whether the user is the author of the post
    const authError = await checkAuthor(id)
    if (authError) return authError

     //we edit the post based on id
    const post = await prisma.post.update({
      where: { id },
      data: {
        title, content, links, imageUrl, publicId, catName: selectedCategory,
      }
    })
    return NextResponse.json(post)
  } catch (error) {
    console.log(error)
    return NextResponse.json({message: "Error"}, {status: 500})
  }
}

export async function DELETE (req: Request, {params} : {params : { id : string }}) {

  const id = params.id

  try {
    //to check whether the user is the author of the post
    const authError = await checkAuthor(id)
    if (authError) return authError

    const post =  await prisma.post.delete({where: { id }})
    //we delete the post based on id
    return NextResponse.json(post)

  } catch (error) {
    console.log(error)
    return NextResponse.json({message: "error deleting the post"}, {status: 500})
  }
}
