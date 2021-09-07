import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { RoomsService } from 'src/app/core/rooms.service';
import { Room } from 'src/app/shared/models/room';

@Component({
  selector: 'app-list-rooms',
  templateUrl: './list-rooms.component.html',
  styleUrls: ['./list-rooms.component.scss']
})
export class ListRoomsComponent implements OnInit {

  rooms: Room[] = [];

  readonly noPhoto = 'https://media.discordapp.net/attachments/269285072215998464/883426319084453938/image.png';

  constructor(private roomsService: RoomsService,
    private fb: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.listRooms();
  }

  onScroll(): void {
    this.listRooms();
  }

  openRoom(id: number): void {
    this.router.navigateByUrl('/rooms/' + id);
  }

  private listRooms(): void {
    this.roomsService.getRoomList()
      .subscribe((rooms: Room[]) => this.rooms.push(...rooms));
  }
}
