import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListRoomsComponent } from './rooms/list-rooms/list-rooms.component';
import { CreateRoomsComponent } from './rooms/create-rooms/create-rooms.component';
import { RoomsModule } from './rooms/rooms.module';

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
        component: CreateRoomsComponent,
        pathMatch: 'full'
      }
    ]
  },
  { path: '**', redirectTo: 'rooms' },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    RoomsModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
