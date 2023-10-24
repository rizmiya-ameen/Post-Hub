"use client"

const DeleteButton = ({id} : {id : string}) => {

  const handleDelete = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this post?"
    );

    if (confirmed) {
      try {
        const res = await fetch(`/api/posts/${id}`, {
          method: "DELETE",
          headers: {
            "Content-type": "application/json",
          },
         })

         if (res.ok) {
          console.log("Post Deleted")
         }
      } catch (error) {
        console.log(error)
      }
    }
  }

  return (
    <div 
      className='text-red-500'
      onClick={handleDelete}
    >
      Delete
    </div>
  )
}

export default DeleteButton