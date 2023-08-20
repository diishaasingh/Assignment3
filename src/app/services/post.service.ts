import { Injectable, EventEmitter, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post } from '../model/post.model';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private url = 'http://jsonplaceholder.typicode.com/posts';

  constructor(private httpClient: HttpClient) {}

  @Output() newPostCreated = new EventEmitter<Post>();

  getPosts(): Observable<Post[]> {
    return this.httpClient.get<Post[]>(this.url);
  }

  getPostById(id: number): Observable<Post> {
    return this.httpClient.get<Post>(`${this.url}/${id}`);
  }

  createPost(post: Post) {
    return this.httpClient.post<Post>('https://jsonplaceholder.typicode.com/posts', post);
  }

}