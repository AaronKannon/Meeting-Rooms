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
  styleUrls: ['./show-rooms.component.scss']
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
    this.router.navigateByUrl('/rooms/create/' + this.id);
  }

  deleteRoom(): void {
    const config = {
      data: {
        title: 'Are you sure that you want to delete the room?',
        description: 'If you want that, click the button OK',
        colorBtnCancel: 'primary',
        colorBtnSuccess: 'warn',
        haveBtnCancel: true
      } as Alert
    };
    const dialogRef = this.dialog.open(AlertComponent, config);
    dialogRef.afterClosed().subscribe((option: boolean) => {
      if (option) {
        this.roomsService.deleteRoom(this.id)
        .subscribe(() => this.router.navigateByUrl('/rooms'));
      }
    });
  }

  private show(): void {
    this.roomsService.getRoom(this.id).subscribe((room: Room) => this.room = room);
  }

}
