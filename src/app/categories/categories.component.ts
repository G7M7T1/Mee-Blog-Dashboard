import { Component, OnInit } from '@angular/core';
import {CategoriesService} from "../services/categories.service";
import {Category} from "../models/category";


@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  categoryList: Array<any> | undefined
  formCategory: string | undefined
  formStatus: string = "Add"
  categoryId: string = ""

  constructor(private categoryService: CategoriesService) { }

  ngOnInit(): void {
    this.categoryService.loadData().subscribe(val => {
      this.categoryList = val
    })
  }

  onSubmit(formData:any) {
    let categoryData:Category = {
      category: formData.value.category
    }

    if (this.formStatus == "Add") {
      this.categoryService.saveData(categoryData)
      formData.reset()
    }

    else if (this.formStatus == "Edit") {
      this.categoryService.updateData(this.categoryId, categoryData)
      formData.reset()
      this.formStatus = "Add"
    }
  }

  onEdit(dataValue: string, id:string) {
    console.log(dataValue)
    this.formCategory = dataValue
    this.formStatus = "Edit"
    this.categoryId = id
  }

  onDelete(id:string) {
    this.categoryService.deleteData(id)
  }

}
