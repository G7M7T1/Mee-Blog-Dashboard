import {Injectable} from '@angular/core';
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {Post} from "../models/post";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {map} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private storage: AngularFireStorage,
              private afs: AngularFirestore) {
  }

  async uploadImage(selectedImage: any, postData: Post) {
    const filePath = `postIMG/${Date.now()}`

    await this.storage.upload(filePath, selectedImage)
      .then(() => {
        console.log("200")
      })

    await this.storage.ref(filePath).getDownloadURL().subscribe(URL => {
      postData.postImgPath = URL
      console.log(URL)
      this.saveData(postData)
    })
  }

  saveData(postData: Post) {
    this.afs.collection('posts').add(postData)
      .then(docRef => {
        console.log("Done")
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
}
