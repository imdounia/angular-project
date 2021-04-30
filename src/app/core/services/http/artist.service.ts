import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Artist } from '../../models/artist';

@Injectable({
  providedIn: 'root'
})
export class ArtistService {

  endPoint: string = environment.artistEndpoint;

  constructor(private _httpClient: HttpClient) { }

  get(): Observable<Artist[]> {
    return this._httpClient.get<Artist[]>(this.endPoint);
  }

  getById(id: number): Observable<Artist> {
    return this._httpClient.get<Artist>(this.endPoint+"/"+id);
  }

  post(artist: Artist): Observable<Artist>{
    return this._httpClient.post<Artist>(this.endPoint, artist)
  }

  put(artist: Artist): Observable<Artist>{
    return this._httpClient.put<Artist>(this.endPoint+"/"+artist.id, artist)
  }

  delete(artist: Artist): Observable<Artist>{
    return this._httpClient.delete<Artist>(this.endPoint+"/"+artist.id)
  }
}
