import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { RoomsService } from 'src/app/core/rooms.service';
import { AlertComponent } from 'src/app/shared/components/alert/alert.component';
import { ValidateInputsService } from 'src/app/shared/components/inputs/validade-inputs.service';
import { Alert } from 'src/app/shared/models/alert';
import { Room } from 'src/app/shared/models/room';

@Component({
  selector: 'app-create-rooms',
  templateUrl: './create-rooms.component.html',
  styleUrls: ['./create-rooms.component.scss']
})
export class CreateRoomsComponent implements OnInit {

  id!: number;
  createdRoom!: FormGroup;

  constructor(public validate: ValidateInputsService, public dialog: MatDialog,
    private fb: FormBuilder,
    private roomsService: RoomsService,
    private router: Router, private activatedRoute: ActivatedRoute) { }

  get f() {
    return this.createdRoom.controls;
  }

  ngOnInit(): void {

    this.id = this.activatedRoute.snapshot.params['id'];
    if (this.id) {
      this.roomsService.getRoom(this.id)
        .subscribe((room: Room) => this.createForm(room));
    } else {
      this.createForm(this.createBlankRoom());
    }
  }

  submit(): void {
    this.createdRoom.markAllAsTouched();
    if (this.createdRoom.invalid) {
      return console.log("Error");
    }

    const room = this.createdRoom.getRawValue() as Room;
    if (this.id) {
      room.id = this.id;
      this.edit(room);
    } else {
      this.save(room);
    }
  }

  restartForm(): void {
    this.createdRoom.reset();
  }

  private createForm(room: Room): void {
    this.createdRoom = this.fb.group({
      name: [room.name, [Validators.required, Validators.minLength(2), Validators.maxLength(256)]],
      urlPhoto: [room.urlPhoto, [Validators.minLength(10)]],
      date: [room.date, [Validators.required]],
      startHour: [room.startHour, [Validators.required, Validators.min(0), Validators.max(23)]],
      endHour: [room.endHour, [Validators.required, Validators.min(0), Validators.max(23)]],
      description: [room.description, [Validators.minLength(5)]]
    });
  }

  private createBlankRoom(): Room {
    return {
      id: null,
      name: null,
      urlPhoto: null,
      date: null,
      startHour: null,
      endHour: null,
      description: null
    } as unknown as Room;
  }

  private save(room: Room): void {
    this.roomsService.createRoom(room).subscribe(() => {
      const config = {
        data: {
          btnSuccess: 'Go to the list',
          btnCancel: 'Create a new room',
          colorBtnCancel: 'primary',
          haveBtnCancel: true
        } as Alert
  
      };
      const dialogRef = this.dialog.open(AlertComponent, config);
      dialogRef.afterClosed().subscribe((option: boolean) => {
        if (option) {
          this.router.navigateByUrl('rooms');
        } else {
          this.restartForm();
        }
      });
    },
    () => {
      const config = {
        data: {
          title: 'Error to save the room',
          description: 'Unfortunately the room has failed to save',
          colorBtnSuccess: 'warn',
          btnSuccess: 'Close'
        } as Alert
      };
      this.dialog.open(AlertComponent, config);
    });
  }

  private edit(room: Room): void {
    this.roomsService.updateRoom(room).subscribe(() => {
      const config = {
        data: {
          description: 'Your room was updated with success!',
          btnSuccess: 'Go to the list',
        } as Alert
      };
      const dialogRef = this.dialog.open(AlertComponent, config);
      dialogRef.afterClosed().subscribe(() => this.router.navigateByUrl('rooms'));
    },
    () => {
      const config = {
        data: {
          title: 'Error to edit the room!',
          description: 'Unfortunately the room has failed to edit',
          colorBtnSuccess: 'warn',
          btnSuccess: 'Close'
        } as Alert
      };
      this.dialog.open(AlertComponent, config);
    });
  }

}
