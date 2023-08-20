import { Component, Output, Input, EventEmitter,ViewChild, SimpleChanges } from '@angular/core';
import { PostService } from '../services/post.service';
import { NgForm } from '@angular/forms';
import { Post } from '../model/post.model';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent {
  @Output() newPostCreated = new EventEmitter<any>();

  @Output() postUpdated = new EventEmitter<Post>();
  @Input() editingPost: Post | null = null;

  @ViewChild('taskForm') taskForm!: NgForm;

  constructor(private postService: PostService) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['editingPost'] && this['editingPost']) {

      this.taskForm.setValue({
        userId: this['editingPost'].userId,
        id: this['editingPost'].id,
        title: this['editingPost'].title,
        body: this['editingPost'].body
      });
    }
  }
  

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
          taskForm.reset();
        }
      );
    }
  }

  onSubmitToUpdatePost(taskForm: NgForm) {
    if (taskForm.valid) {
      const updatedPost: Post = {
        userId: taskForm.value.userId,
        id: taskForm.value.id,
        title: taskForm.value.title,
        body: taskForm.value.body
      };

      this.postUpdated.emit(updatedPost);
      taskForm.reset();
    }
  }
}

