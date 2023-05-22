import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Aliment } from '../model/cookbook';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlimentService {

  private apiUrl = 'http://localhost:8080/aliment';

  constructor(private _http : HttpClient) { }

  addAliment(aliment: Aliment): Observable<Aliment>{
    return this._http.post<Aliment>(`${this.apiUrl}/add`, aliment);
  }

  getAliment(id: number): Observable<Aliment> {
    return this._http.get<Aliment>(`${this.apiUrl}/${id}`);
  }

  getAllAliments(): Observable<Aliment[]>{
    return this._http.get<Aliment[]>(`${this.apiUrl}/all`);
  }

  deleteAliment(id: number): Observable<any> {
    return this._http.delete(`${this.apiUrl}/delete/${id}`);
  }

  updateAliment(id: number, aliment: Aliment): Observable<any> {
    return this._http.patch(`${this.apiUrl}/${id}/update`, aliment);
  }

  clearAliments(): Observable<Aliment[]> {
    return this._http.delete<Aliment[]>(`${this.apiUrl}`)
  }

}
