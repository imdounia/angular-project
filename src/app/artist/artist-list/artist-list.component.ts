import { Component, ElementRef, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Artist } from 'src/app/core/models/artist';
import { ArtistFormData } from 'src/app/core/models/artist-form-data';
import { ArtistService } from 'src/app/core/services/http/artist.service';
import { ArtistFormComponent } from '../artist-form/artist-form.component';

@Component({
  selector: 'app-artist-list',
  templateUrl: './artist-list.component.html',
  styleUrls: ['./artist-list.component.scss']
})
export class ArtistListComponent implements OnInit {

  artists$ : Observable<Artist[]>;

  constructor(private _artistService: ArtistService, public dialog: MatDialog, private elementRef: ElementRef) {}

  ngAfterViewInit(){
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = '#f7dcc2';
 }


  ngOnInit(): void {
    this.loadData();
  }

  loadData(){
    this.artists$ = this._artistService.get();
  }

  delete(artist: Artist){
    this._artistService.delete(artist).subscribe(next => {
      this.loadData();
    })
  }


  openDialog(toUpdate: boolean, artist: Artist){

    const artistFormData: ArtistFormData = {
      toUpdate: toUpdate,
      artist: artist
    };

    const dialogRef = this.dialog.open(ArtistFormComponent,{
      data: artistFormData
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      this.loadData();
    });
  }
}
