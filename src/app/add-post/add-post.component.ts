  import { Component, Output, Input, EventEmitter } from '@angular/core';
  import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
  import { PostService } from '../services/post.service';
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
  
    postForm: FormGroup;
  
    constructor(private formBuilder: FormBuilder, private postService: PostService) {
      this.postForm = this.formBuilder.group({
        userId: ['', Validators.required],
        id: ['', Validators.required],
        title: ['', Validators.required],
        body: ['', Validators.required]
      });
    }
  
    ngOnChanges() {
      if (this.editingPost) {
        this.postForm.setValue({
          userId: this.editingPost.userId,
          id: this.editingPost.id,
          title: this.editingPost.title,
          body: this.editingPost.body
        });
      }
    }
  
    onSubmit() {
      if (this.postForm.valid) {
        const post: any = {
          userId: this.postForm.value.userId,
          id: this.postForm.value.id,
          title: this.postForm.value.title,
          body: this.postForm.value.body
        };
  
        this.postService.createPost(post).subscribe(
          (response) => {
            console.log('Post created successfully:', response);
            this.newPostCreated.emit(response);
            this.postForm.reset();
          }
        );
      }
    }
  
    onSubmitToUpdatePost() {
      if (this.postForm.valid) {
        const updatedPost: Post = {
          userId: this.postForm.value.userId,
          id: this.postForm.value.id,
          title: this.postForm.value.title,
          body: this.postForm.value.body
        };
  
        this.postUpdated.emit(updatedPost);
        this.postForm.reset();
      }
    }
  }
  

