import { Component, Input, OnChanges } from '@angular/core';
import { PostService } from '../services/post.service';
import { ApiService } from '../services/api.service';

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
} 
interface Comment{
  postId:number;
  id:number;
  name:string;
  email:string;
  body:string;
}

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnChanges {
  
  @Input() postSelected: Post | null = null;
  postId: number | null = null;
  comments: Comment[]=[];
  http: any;
  userId: any;

  constructor(private apiService: ApiService) {}

  ngOnChanges() {
    if (this.postSelected) {
      this.postId = this.postSelected.id;
      this.fetchComments();
    }
  }

  fetchComments() {
    const url = `https://jsonplaceholder.typicode.com/posts/${this.postId}/comments`;
    this.apiService.get(url).subscribe(comments => {
      if (this.userId) {
        this.comments = comments.filter((comment:Comment) => comment.postId === this.userId);
      } else {
        this.comments = comments;
      }
    });

  }
}
