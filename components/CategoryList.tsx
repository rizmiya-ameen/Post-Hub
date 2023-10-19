import { categoriesData } from "@/data"
import Link from "next/link"

const CategoryList = () => {
  return (
    <div className="flex flex-wrap gap-2 text-sm">
      {categoriesData.map(item => (
        <div key={item.id}>
        <Link 
          href={`/category/${item.name}`}
          className="px-4 py-1 rounded-md bg-slate-700 text-white"
        >
          {item.name}
        </Link>
      </div>
      ))}
    </div>
  )
}

export default CategoryList