import { Component, OnInit } from '@angular/core';
import {PostsService} from "../../services/posts.service";

@Component({
  selector: 'app-all-post',
  templateUrl: './all-post.component.html',
  styleUrls: ['./all-post.component.scss']
})
export class AllPostComponent implements OnInit {

  postList: Array<any> | undefined

  constructor(private postService: PostsService) { }

  ngOnInit(): void {
    this.postService.loadData().subscribe(value => {
      this.postList = value
    })
  }

  onDelete(postImgPath:any, id:string) {
    this.postService.deleteImage(postImgPath, id)
  }

  onFeatured(id: string, featured: boolean) {
    const featuredData = {
      isFeatured: featured
    }

    this.postService.markFeatured(id, featuredData)
  }
}
