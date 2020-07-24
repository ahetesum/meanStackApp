import { Injectable } from '@angular/core';
import { Post } from './post.model';
import { HttpClient } from '@angular/common/http';
import {Subject} from 'rxjs'
import { map } from 'rxjs/operators'


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
    this.httpClient.get<{message:String, posts:any}>(
      'http://localhost:3001/api/posts')
      .pipe(map((response)=>{
          return response.posts.map(post=>{
            return {
              title: post.title,
              description:post.description,
              id:post._id
            }
          })
      }))
      .subscribe((tranformedPosts)=>{
      this.posts= tranformedPosts;
      this.postUpdated.next([...this.posts]);
    });
  }

  addPost(title:String,description:String)
  {
    const post:Post = {id:null,title:title,description: description}
    this.httpClient.post<{message:String}>('http://localhost:3001/api/posts',post).subscribe((response)=>{
    console.log(response.message)
    this.posts.push(post);
    this.postUpdated.next([...this.posts]);
    });


  }

}
