import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Song } from '../../models/song';

@Injectable()
export class SongService {

  endPoint: string = environment.songEndpoint;

  constructor(private _httpClient: HttpClient) { }

  get(): Observable<Song[]> {
    return this._httpClient.get<Song[]>(this.endPoint);
  }

  getById(id: number): Observable<Song> {
    return this._httpClient.get<Song>(this.endPoint+"/"+id);
  }

  post(song: Song): Observable<Song>{
    return this._httpClient.post<Song>(this.endPoint, song)
  }

  put(song: Song): Observable<Song>{
    return this._httpClient.put<Song>(this.endPoint+"/"+song.id, song)
  }

  delete(song: Song): Observable<Song>{
    return this._httpClient.delete<Song>(this.endPoint+"/"+song.id)
  }
  
}
