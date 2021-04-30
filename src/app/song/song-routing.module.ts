import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from '../shared/components/not-found/not-found.component';
import { SongDetailComponent } from './song-detail/song-detail.component';
import { SongListComponent } from './song-list/song-list.component';
import { SongComponent } from './song.component';

const routes: Routes = [
  {
    path: '',
    component: SongComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        children: [
      {
        path: '',
        component: SongListComponent
      }
    ]
      },
      {
        path: ':id',
        component: SongDetailComponent
      },
      {
        path: '**',
        component: NotFoundComponent
      }
    ]
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SongRoutingModule { }
