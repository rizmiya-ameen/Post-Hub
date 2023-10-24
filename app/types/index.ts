export type TCategory = {
  id: string;
  catName: string;
}


export type TPost = {
  id: string;
  title: string;
  content: string;
  imageUrl?: string;
  publicId?: string;
  catName?: string;
  authorEmail: string;
  links: null | string[];
  createdAt: string;
  author: {
    name: string;
  }




}
/*
[
  {
    "id":"653650787ebe9395fcb45fb9","title":"gdfghd","content":"dfgsdfgdfsghdfhdfhdfhdfh","imageUrl":"","publicId":null,
    "catName":null,
    "authorEmail":"kawzzer@gmail.com",
    "links":["https://www.google.com/"],"createdAt":"2023-10-23T10:52:40.439Z","updatedAt":"2023-10-23T10:52:40.439Z","author":{
      "name":"Kawzer Mohamed"
    }
  },
]
*/