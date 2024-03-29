import { Component, Input} from '@angular/core';
import { Post } from '../model/post.model';
import { PostService } from '../services/post.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent {
  @Input() posts: Post[] = []; 

  postSelected!: Post;

  constructor(private postService: PostService) { }

  editingPost: Post | null = null; 
  
  editPost(post: Post) {
    this.editingPost = { ...post };
  }

  updatePost(updatedPost: Post) {
    if (this.editingPost) {
      const index = this.posts.findIndex(post => post.id === this.editingPost!.id);
      if (index !== -1) {
        this.posts[index] = updatedPost;
        this.editingPost = null;
      }
    }
  }
  deletePost(postToDelete: Post) {
    this.posts = this.posts.filter(post => post.id !== postToDelete.id);
    
  }
  getComments(post:Post){
   this.postSelected=post;
  }
  onNewPostCreated(newPost: Post) {
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

