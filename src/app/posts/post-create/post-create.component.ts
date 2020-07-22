import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import {Post} from './../post.model'
import { NgForm } from '@angular/forms';
import {PostService} from './../post.service'

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {

  constructor(public postService:PostService) { }

  ngOnInit(): void {
  }


  onAddPost(postForm:NgForm)
  {
    if(postForm.invalid)
    return;
    this.postService.addPost(postForm.value.title,postForm.value.description);
  }
}
