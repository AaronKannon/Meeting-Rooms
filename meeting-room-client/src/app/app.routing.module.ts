import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListRoomsComponent } from './rooms/list-rooms/list-rooms.component';
import { CreateRoomsComponent } from './rooms/create-rooms/create-rooms.component';
import { RoomsModule } from './rooms/rooms.module';
import { ShowRoomsComponent } from './rooms/show-rooms/show-rooms.component';

const routes: Routes = [

  {
      path: '',
      redirectTo: 'rooms',
      pathMatch: 'full'
  },
  {
    path: 'rooms',
    children: [
      {
        path: '',
        component: ListRoomsComponent
      },
      {
        path: 'create',
        children: [
          {
            path: '',
            component: CreateRoomsComponent
          },
          {
            path: ':id',
            component: CreateRoomsComponent
          }
        ]
      },
      {
        path: ':id',
        component: ShowRoomsComponent,
        pathMatch: 'full'
      }
    ]
  },
  { path: '**', redirectTo: 'filmes' },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    RoomsModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
