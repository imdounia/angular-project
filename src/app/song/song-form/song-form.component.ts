import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Song } from 'src/app/core/models/song';
import { SongFormData } from 'src/app/core/models/song-form-data';
import { SongService } from 'src/app/core/services/http/song.service';

@Component({
  selector: 'app-song-form',
  templateUrl: './song-form.component.html',
  styleUrls: ['./song-form.component.scss']
})
export class SongFormComponent implements OnInit {

  songForm: FormGroup;

  formAction: string;

  genres: string[] = [
    'K-POP',
    'K-HIPHOP'
  ]

  constructor(
    private fb: FormBuilder,
    private _songService: SongService,
    private _dialogRef: MatDialogRef<SongFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: SongFormData
  ) {
    this.formAction = data.toUpdate? "Update" : "Add";

    if (data.toUpdate) {
      this.songForm = this.fb.group({
        videourl: [data.song.videourl, [Validators.required, this.noWhitespaceValidator]],
        name: [data.song.name, [Validators.required, this.noWhitespaceValidator]],
        artist: [data.song.artist, [Validators.required]],
        genre: [data.song.genre, [Validators.required]]
      })
    }
    else {
      this.songForm = this.fb.group({
        videourl: ['', [Validators.required, this.noWhitespaceValidator]],
        name: ['', [Validators.required, this.noWhitespaceValidator]],
        artist: ['', [Validators.required]],
        genre: ['', [Validators.required]]
      })
    }

  }

  ngOnInit(): void {
  }

  onSubmit(song: Song) {
    if (this.songForm.valid) {

      if (this.data.toUpdate) {
        song.id = this.data.song.id;
        this._songService.put(song).subscribe((next) => {
          console.log("YES WE DID IT !!! WE HAVE updated A song");
          this.songForm.reset();
          this._dialogRef.close();
        })
      } else {
        this._songService.post(song).subscribe((next) => {
          console.log("YES WE DID IT !!! WE HAVE ADDED A NEW song");
          this.songForm.reset();
          this._dialogRef.close();
        })
      }


    }
  }

  public noWhitespaceValidator(control: FormControl) {
    const isWhitespace = (control.value || '').trim().length === 0;

    const isValid = !isWhitespace;
    return isValid ? null : { 'whitespace': true };
  }

}
