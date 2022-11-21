import {Component, OnInit} from '@angular/core';
import {AngularEditorConfig} from '@kolkov/angular-editor';
import {CategoriesService} from "../../services/categories.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Post} from "../../models/post";
import {PostsService} from "../../services/posts.service";

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.scss']
})
export class NewPostComponent implements OnInit {
  permalink: string = ""
  imgSrc: any = "https://cdn.discordapp.com/attachments/705034399200313465/1043988893046952078/unknown.png"
  categories: Array<any> | undefined

  editorConfig: AngularEditorConfig = {
    editable: true,
    minHeight: '200px',
  }

  postForm: FormGroup
  selectedImage: any;

  constructor(private categoryService: CategoriesService,
              private fb: FormBuilder,
              private postService: PostsService) {
    this.postForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(2)]],
      permalink: ['',[Validators.required]],
      excerpt: ['',[Validators.required]],
      category: ['',[Validators.required]],
      postImg: ['',[Validators.required]],
      content: ['',[Validators.required]]
    })
  }

  ngOnInit(): void {
    this.categoryService.loadData().subscribe(value => {
      this.categories = value
    })
  }

  get fc() {
    return this.postForm.controls
  }

  onTitleChanged($event: any) {
    let title = $event.target.value
    title = title.split(' ').join('-');
    this.permalink = `https://gmt-mee-blog.com/posts/${title}`
  }

  showPreview($event: any) {
    let reader = new FileReader()

    reader.onload = (e) => {
      this.imgSrc = e.target?.result
    }

    reader.readAsDataURL($event.target.files[0])
    this.selectedImage = $event.target.files[0]
  }

  onSubmit() {
    let categoryInfo = this.postForm.value.category.split('☀')

    const postData: Post = {
      title: this.postForm.value.title,

      permalink: this.postForm.value.permalink,

      category: {category: categoryInfo[1], categoryId: categoryInfo[0]},

      postImgPath: "",

      excerpt: this.postForm.value.excerpt,

      content: this.postForm.value.content,

      createdAt: new Date(),

      isFeatured: false,

      status: "new",

      views: 0
    }

    this.postService.uploadImage(this.selectedImage, postData).then(r => console.log('200'))

    this.postForm.reset()

    this.imgSrc = `https://cdn.discordapp.com/attachments/705034399200313465/1043988893046952078/unknown.png`
  }
}
