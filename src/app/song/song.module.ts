import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SongRoutingModule } from './song-routing.module';
import { SongComponent } from './song.component';
import { SharedModule } from '../shared/shared.module';
import { SongListComponent } from './song-list/song-list.component';
import { SongFormComponent } from './song-form/song-form.component';
import { SongDetailComponent } from './song-detail/song-detail.component';


@NgModule({
  declarations: [SongComponent, SongListComponent, SongFormComponent, SongDetailComponent],
  imports: [
    CommonModule,
    SongRoutingModule,
    SharedModule
  ]
})
export class SongModule { }
