import Link from "next/link"
import { TCategory } from "@/app/types"

const getCategories = async (): Promise<TCategory[] | null> => {
  try {
    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/categories`)

    if (res.ok) {
      const categories = await res.json()
      return categories
    }
  } catch (error) {
    console.log(error)
  }
  return null;
 };

 export default async function CategoryList () {

  const categories = await getCategories();

  return (
    <div className="flex flex-wrap gap-2 text-sm">
      {categories && categories.map(item => (
        <div key={item.id}>
        <Link 
          href={`/category/${item.catName}`}
          className="px-4 py-1 rounded-md bg-slate-700 text-white"
        >
          {item.catName}
        </Link>
      </div>
      ))}
    </div>
  )
}

/*
Certainly, I see you've updated your code to return a promise explicitly from the `getCategories` function. This change is beneficial, as it provides clarity and helps ensure that the function returns a promise consistently. Let's break down the promise part and how it's used:

1. **`getCategories` Function**:

   - The `getCategories` function is marked as `async`, which means it returns a promise. However, in your original code, you didn't explicitly specify the return type as `Promise<TCategory[] | null>`. By not specifying the return type, TypeScript was inferring the return type to be `Promise<void>`, which is why you encountered an error.

   - In the updated code, you explicitly declare that the function returns a `Promise<TCategory[] | null>`. This clarifies that the function returns a promise that resolves to an array of `TCategory` or `null`.

   - Inside `getCategories`, you use `await` to make an asynchronous HTTP request to fetch category data from your API.

   - If the response is successful (`res.ok`), you parse the response body as JSON and return the data. If there's an error during the fetch or parsing, you catch it, log it, and return `null`.

2. **Usage in the `CategoryList` Component**:

   - In your `CategoryList` component, you `await` the result of `getCategories`, which returns a promise. This means the component will wait for the promise to resolve before rendering the category links.

   - The `categories` variable is now of type `TCategory[] | null` because `getCategories` returns this type.

   - You check if `categories` is truthy (not `null`) before mapping over it and rendering the category links. This is a good practice to handle the case where the promise may return `null`.

   - You map over the `categories` and create `Link` components for each category.

By explicitly returning a `Promise` and specifying the return type as `Promise<TCategory[] | null`, you ensure that TypeScript understands the function's return type correctly, and your code works as expected. This change makes your code more robust and easier to understand, especially in the context of asynchronous operations.
*/
