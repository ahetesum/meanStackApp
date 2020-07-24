import { Injectable } from '@angular/core';
import { Post } from './post.model';
import { HttpClient } from '@angular/common/http';
import {Subject} from 'rxjs'
import {map} from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class PostService {

  posts:Post[]=[];
  private postUpdated= new Subject<Post[]>();

  constructor(public httpClient:HttpClient) { }


  getPostUpdateListner()
  {
    return this.postUpdated.asObservable();
  }

  getPosts()
  {
    this.httpClient.get<{message:String, posts:any}>('http://localhost:3001/api/posts')
    .pipe(map((resposeData)=>{
      return resposeData.posts.map(post=>{
        return{
          id: post._id,
          title:post.title,
          description:post.description
        }
      })
    }))
    .subscribe((transformedData)=>{
      this.posts= transformedData;
      this.postUpdated.next([...this.posts]);
    });
  }

  addPost(title:String,description:String)
  {
    const post:Post = {id:null,title:title,description: description}
    this.httpClient.post<{message:String,postId:String}>('http://localhost:3001/api/posts',post).subscribe((response)=>{
    console.log(response.message)
    post.id= response.postId;
    this.posts.push(post);
    this.postUpdated.next([...this.posts]);

    });
  }

  deletePost(id)
  {
    this.httpClient.delete<{message:String}>('http://localhost:3001/api/posts/'+id).subscribe((response)=>{
    console.log(response.message)
    let updatedPost= this.posts.filter(post=>post.id!= id);
    this.posts= updatedPost;
    this.postUpdated.next([...this.posts]);
    });
  }

}
