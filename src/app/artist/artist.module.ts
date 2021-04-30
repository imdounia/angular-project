import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArtistRoutingModule } from './artist-routing.module';
import { ArtistComponent } from './artist/artist.component';
import { ArtistListComponent } from './artist-list/artist-list.component';
import { ArtistFormComponent } from './artist-form/artist-form.component';
import { ArtistDetailComponent } from './artist-detail/artist-detail.component';


@NgModule({
  declarations: [ArtistComponent, ArtistListComponent, ArtistFormComponent, ArtistDetailComponent],
  imports: [
    CommonModule,
    ArtistRoutingModule
  ]
})
export class ArtistModule { }
