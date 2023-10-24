import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb";

export async function GET () {
  try {
    const categories = await prisma.category.findMany()
    return NextResponse.json(categories)
  } catch (error) {
    console.log(error)
    return NextResponse.json("Error fetching Categories")
  }
  
}

//since we are using prisma, we are also having an option of adding, editting and removing the data using the prisma studio 
//npx prisma studio
//Prisma Studio is up on http://localhost:5555