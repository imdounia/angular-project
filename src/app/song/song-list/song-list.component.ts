import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { SongFormData } from 'src/app/core/models/song-form-data';
import { SongService } from 'src/app/core/services/http/song.service';
import { Song } from '../../core/models/song';
import { SongFormComponent } from '../song-form/song-form.component';

@Component({
  selector: 'app-song-list',
  templateUrl: './song-list.component.html',
  styleUrls: ['./song-list.component.scss']
})
export class SongListComponent implements OnInit {
  
  songs$ : Observable<Song[]>;

  constructor(private _songService: SongService, public dialog: MatDialog, private sanitizer: DomSanitizer) { }


  ngOnInit(): void {
    this.loadData();
  }

  loadData(){
    this.songs$ = this._songService.get();
  }

  delete(song: Song){
    this._songService.delete(song).subscribe(next => {
      this.loadData();
    })
  }


  openDialog(toUpdate: boolean, song: Song){

    const songFormData: SongFormData = {
      toUpdate: toUpdate,
      song: song
    };

    const dialogRef = this.dialog.open(SongFormComponent,{
      data: songFormData
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      this.loadData();
    });
  }


  
}
