import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Artist } from 'src/app/core/models/artist';
import { ArtistService } from 'src/app/core/services/http/artist.service';

@Component({
  selector: 'app-artist-detail',
  templateUrl: './artist-detail.component.html',
  styleUrls: ['./artist-detail.component.scss']
})
export class ArtistDetailComponent implements OnInit {

  artistId: number;

  artist$: Observable<Artist>;

  constructor(private _activateRoute: ActivatedRoute,
    private _artistService: ArtistService) { }

  ngOnInit(): void {
    this.artistId = Number(this._activateRoute.snapshot.paramMap.get('id'));

    if (this.artistId) {
      this.fetchData(this.artistId);
    }
  }

  fetchData(id: number): void {
    this.artist$ = this._artistService.getById(id);
  }

}
