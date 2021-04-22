import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { RouterModule } from '@angular/router';
import { SongService } from './services/http/song.service';
import { HttpClientModule } from '@angular/common/http';
import {MatToolbarModule} from '@angular/material/toolbar';



@NgModule({
  declarations: [HeaderComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    MatToolbarModule,
    RouterModule,
  ],
  providers: [SongService],
  exports: [ 
    HeaderComponent,
    RouterModule
  ]
})
export class CoreModule { }
