import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArtistRoutingModule } from './artist-routing.module';
import { ArtistListComponent } from './artist-list/artist-list.component';
import { ArtistFormComponent } from './artist-form/artist-form.component';
import { ArtistDetailComponent } from './artist-detail/artist-detail.component';
import { ArtistComponent } from './artist.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [ArtistComponent, ArtistListComponent, ArtistFormComponent, ArtistDetailComponent],
  imports: [
    CommonModule,
    ArtistRoutingModule,
    SharedModule
  ]
})
export class ArtistModule { }
