import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Song } from 'src/app/core/models/song';
import { SongService } from 'src/app/core/services/http/song.service';

@Component({
  selector: 'app-song-detail',
  templateUrl: './song-detail.component.html',
  styleUrls: ['./song-detail.component.scss']
})
export class SongDetailComponent implements OnInit {

  songId: number;

  song$: Observable<Song>;

  constructor(private _activateRoute: ActivatedRoute,
    private _songService: SongService) { }

  ngOnInit(): void {
    this.songId = Number(this._activateRoute.snapshot.paramMap.get('id'));

    if (this.songId) {
      this.fetchData(this.songId);
    }
  }

  fetchData(id: number): void {
    this.song$ = this._songService.getById(id);
  }

}
