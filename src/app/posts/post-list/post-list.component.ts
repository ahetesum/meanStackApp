import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import {Post} from './../post.model'
import { PostService } from '../post.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit ,OnDestroy{

  posts:Post[]=[];
  private postsSubscription: Subscription;

  constructor(public postService:PostService) { }

  ngOnInit(): void {
    this.postService.getPosts();
    this.postsSubscription= this.postService.getPostUpdateListner().subscribe((posts:Post[])=>{
      this.posts=posts;
    });
  }

  ngOnDestroy(){
    this.postsSubscription.unsubscribe();
  }

}
