"use client"

const DeleteButton = ({id} : {id : string}) => {

  const deleteImage = async (publicId: string) => {
    //we are making a fetch call to removeImage API
    const res = await fetch('/api/removeImage', {
      method: "POST",
      headers: { "Content-Type": "application/json"},
      body: JSON.stringify({ publicId}),
    })
  };
  
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
          console.log("Post Deleted");
          const post = await res.json();
          const { publicId } = post;
          await deleteImage(publicId)

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