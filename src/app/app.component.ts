import { Component, OnInit } from '@angular/core';
import { PostService } from './services/post.service';

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  posts: Post[] = []; 
  
  constructor(private service: PostService) {}
  
  ngOnInit() {
    this.service.getPosts().subscribe(response => {
      this.posts = response as Post[]; 
    });
  }
}
