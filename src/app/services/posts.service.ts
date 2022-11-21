import {Injectable} from '@angular/core';
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {Post} from "../models/post";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {map} from "rxjs";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private storage: AngularFireStorage,
              private afs: AngularFirestore,
              private router: Router) {
  }

  async uploadImage(selectedImage: any, postData: Post, formStatus: string, id: any) {
    const filePath = `postIMG/${Date.now()}`

    await this.storage.upload(filePath, selectedImage)
      .then(() => {
        console.log("200")
      })

    await this.storage.ref(filePath).getDownloadURL().subscribe(URL => {
      postData.postImgPath = URL
      console.log(URL)

      if (formStatus == 'Edit') {
        this.updateData(id, postData)
      } else {
        this.saveData(postData)
      }
    })
  }

  saveData(postData: Post) {
    this.afs.collection('posts').add(postData)
      .then(docRef => {
        console.log("Done")
        this.router.navigate(['/posts'])
      })
  }

  loadData() {
    return this.afs.collection('posts').snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const id = a.payload.doc.id
        const data = a.payload.doc.data()
        return {id, data}
      }))
    )
  }

  loadOneData(id: string) {
    return this.afs.collection('posts').doc(id).valueChanges()
  }

  updateData(id: string, postData: any) {
    this.afs.doc(`posts/${id}`).update(postData)
      .then(() => {
        console.log('Done')
        this.router.navigate(['/posts'])
      })
  }

  deleteImage(postImgPath: string, id:string) {
    this.storage.storage.refFromURL(postImgPath).delete()
      .then(() => {
        console.log('Image Deleted')
        this.deleteData(id)
      })
  }

  deleteData(id: string) {
    this.afs.doc(`posts/${id}`).delete()
      .then(() => console.log('Data Deleted'))
  }

  markFeatured(id:string, featuredData: any) {
    this.afs.doc(`posts/${id}`).update(featuredData)
      .then(() => console.log('Featured Updated'))
  }
}
