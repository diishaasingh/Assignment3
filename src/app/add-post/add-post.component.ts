import { Component, Output, EventEmitter } from '@angular/core';
import { PostService } from '../services/post.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent {
  @Output() newPostCreated = new EventEmitter<any>();

  constructor(private postService: PostService) {}

  onSubmit(taskForm: NgForm) {
    if (taskForm.valid) {
      const post: any = {
        userId: taskForm.value.userId,
        id: taskForm.value.id,
        title: taskForm.value.title,
        body: taskForm.value.body
      };

      this.postService.createPost(post).subscribe(
        (response) => {
          console.log('Post created successfully:', response);
          this.newPostCreated.emit(response); 
        }
      );
    }
  }
}

