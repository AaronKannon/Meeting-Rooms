import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Room } from '../shared/models/room';

@Injectable({
  providedIn: 'root'
})
export class RoomsService {
    private url = 'http://localhost:8082/api/v1/rooms/';

    constructor(private http: HttpClient) { }

    createRoom(room: Room): Observable<Room> {
        return this.http.post<Room>(this.url, room);
    }

    getRoomList(): Observable<Room[]> {
        return this.http.get<Room[]>(this.url);
    }

    updateRoom(room: Room): Observable<Room> {
        return this.http.put<Room>(`${this.url}/${room.id}`, room);
    }

    getRoom(id: number): Observable<Room> {
        return this.http.get<Room>(`${this.url}/${id}`);
    }

    deleteRoom(id: number): Observable<void> {
        return this.http.delete<void>(`${this.url}/${id}`);
    }

}