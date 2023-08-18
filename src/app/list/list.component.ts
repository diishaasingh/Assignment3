import { Component, Input,Output,EventEmitter } from '@angular/core';
import { Post } from '../model/post.model';
import { PostService } from '../services/post.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent {
  @Input() posts: Post[] = []; 

  selectedPost = new EventEmitter<Post>();
  postSelected!: Post;

  constructor(private postService: PostService) { }

  editingPostId: number | null = null; 

  editPost(post: Post) {
    this.editingPostId = post.id;
  }

  saveEditedPost(updatedPost: Post) {
    const index = this.posts.findIndex(post => post.id === updatedPost.id);
    
    if (index !== -1) {
      this.posts[index] = updatedPost;
      this.editingPostId = null;

    }
  }

  deletePost(postToDelete: Post) {
    this.posts = this.posts.filter(post => post.id !== postToDelete.id);
  }
  
  getComments(post:Post){
   this.postSelected=post;
   this.selectedPost.emit(post);
  }

  onNewPostCreated(newPost: Post) {
    console.log(newPost);
    console.log(this)
    this.posts.push(newPost);
  }

  getPost(){
    this.postService.getPosts().subscribe((posts) => {
      this.posts = posts;
    });
    this.postService.newPostCreated.subscribe((post) => {
      this.posts.push(post);
    });
  }
  
}



