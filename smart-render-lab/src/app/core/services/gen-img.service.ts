import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { GenImage } from './gen-img.model';

@Injectable({
  providedIn: 'root'
})
export class GenImgService {
  private _imgState = new BehaviorSubject<GenImage[]>([]);
  imgState$ = this._imgState.asObservable();

  constructor() { }
  
  addImage(newImg: GenImage) {
    const currentState = this._imgState.value;
    this._imgState.next([...currentState, newImg]);
  }
}