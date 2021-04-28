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
  mediaItems: any;
  

  constructor(private _songService: SongService, public dialog: MatDialog, public sanitizer: DomSanitizer) {}


  photoURL() {
    return this.sanitizer.bypassSecurityTrustUrl(this.mediaItems[1].url);
  }
  public youtube_parser(url){
    const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    const match = url.match(regExp);
    return (match&&match[7].length==11)? match[7] : false;
}


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
