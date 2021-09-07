import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Room } from 'src/app/shared/models/room';
import { RoomsService } from 'src/app/core/rooms.service';
import { AlertComponent } from 'src/app/shared/components/alert/alert.component';
import { Alert } from 'src/app/shared/models/alert';

@Component({
  selector: 'app-show-rooms',
  templateUrl: './show-rooms.component.html',
  styleUrls: ['./show-rooms.component.css']
})
export class ShowRoomsComponent implements OnInit {
  readonly noPhoto = 'https://media.discordapp.net/attachments/269285072215998464/883426319084453938/image.png';
  room!: Room;
  id!: number;

  constructor(public dialog: MatDialog,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private roomsService: RoomsService) { }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.params['id'];
    this.show();
  }

  editRoom(): void {
    this.router.navigateByUrl('/filmes/cadastro/' + this.id);
  }

  deleteRoom(): void {
    const config = {
      data: {
        title: 'Você tem certeza que deseja excluir?',
        description: 'Caso você tenha certceza que deseja excluir, clique no botão OK',
        colorBtnCancel: 'primary',
        colorBtnSuccess: 'warn',
        haveBtnCancel: true
      } as Alert
    };
    const dialogRef = this.dialog.open(AlertComponent, config);
    dialogRef.afterClosed().subscribe((opcao: boolean) => {
      if (opcao) {
        this.roomsService.deleteRoom(this.id)
        .subscribe(() => this.router.navigateByUrl('/filmes'));
      }
    });
  }

  private show(): void {
    this.roomsService.getRoom(this.id).subscribe((room: Room) => this.room = room);
  }

}
