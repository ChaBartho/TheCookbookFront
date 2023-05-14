import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Aliment } from '../model/cookbook';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlimentService {

  constructor(private _httpClient : HttpClient) { }


  getAllAliment() : Observable<Aliment>{
    return this._httpClient.get<Aliment>("http://localhost:8080/aliment/")
  }




}
