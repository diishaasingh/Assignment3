import { Component, Input, OnChanges } from '@angular/core';
import { PostService } from '../services/post.service';
import { Post } from '../model/post.model';
import { Comment } from '../model/comment.model';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnChanges {
  
  @Input() postSelected: Post | null = null;
  postId: number | null = null;
  comments: Comment[]=[];

  constructor(private postService: PostService) {}

  ngOnChanges() {
    if (this.postSelected) {
      this.postId = this.postSelected.id;
      this.fetchComments();
    }
  }
 
  fetchComments() {
    const url = `https://jsonplaceholder.typicode.com/posts/${this.postId}/comments`;
    this.postService.get(url).subscribe(comments => {
        this.comments = comments;     
    });

  }
}

