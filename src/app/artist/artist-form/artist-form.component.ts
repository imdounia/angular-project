import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Artist } from 'src/app/core/models/artist';
import { ArtistFormData } from 'src/app/core/models/artist-form-data';
import { ArtistService } from 'src/app/core/services/http/artist.service';

@Component({
  selector: 'app-artist-form',
  templateUrl: './artist-form.component.html',
  styleUrls: ['./artist-form.component.scss']
})
export class ArtistFormComponent implements OnInit {

  artistForm: FormGroup;

  formAction: string;

  constructor(
    private fb: FormBuilder,
    private _artistService: ArtistService,
    private _dialogRef: MatDialogRef<ArtistFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data:ArtistFormData
  ) {
    this.formAction = data.toUpdate? "Update" : "Add";

    if (data.toUpdate) {
      this.artistForm = this.fb.group({
        name: [data.artist.name, [Validators.required, this.noWhitespaceValidator]],
        description: [data.artist.description, [Validators.required, this.noWhitespaceValidator]],
        years_active: [data.artist.years_active, [Validators.required]]
      })
    }
    else {
      this.artistForm = this.fb.group({
        name: ['', [Validators.required, this.noWhitespaceValidator]],
        description: ['', [Validators.required, this.noWhitespaceValidator]],
        years_active: ['', [Validators.required]]
      })
    }

  }

  ngOnInit(): void {
  }

  onSubmit(artist: Artist) {
    if (this.artistForm.valid) {

      if (this.data.toUpdate) {
        artist.id = this.data.artist.id;
        this._artistService.put(artist).subscribe((next) => {
          console.log("dang bro WE HAVE updated A artist");
          this.artistForm.reset();
          this._dialogRef.close();
        })
      } else {
        this._artistService.post(artist).subscribe((next) => {
          console.log("hell yes dude WE HAVE ADDED A NEW artist");
          this.artistForm.reset();
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
