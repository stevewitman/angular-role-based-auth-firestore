import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { firebase } from '@firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

import { Observable, of } from 'rxjs';
import { switchMap, startWith, tap, filter } from 'rxjs/operators';

interface User {
  uid: string;
  email: string;
  photoUrl?: string;
  displayName?: string;
  favColor: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: Observable<User>;

  constructor(private afAuth: AngularFireAuth,
              private afs: AngularFirestore,
              private router: Router)
    {
    // Get auth data, then get firestore user document || null
    this.user = this.afAuth.authState.pipe(
      .switchMap(user => {
        if (user) {
          return this.afs.doc<User>('users/${user.uid}').valueChanges();
        } else {
          return of(null);
        }
      })
    );
  }

}
