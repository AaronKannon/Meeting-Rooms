package kannon.aaron.meetingrooms.meetingrooms.controller;

import kannon.aaron.meetingrooms.meetingrooms.dto.MessageResponseDTO;
import kannon.aaron.meetingrooms.meetingrooms.exception.RoomNotFoundException;
import kannon.aaron.meetingrooms.meetingrooms.model.Room;
import kannon.aaron.meetingrooms.meetingrooms.service.RoomService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/v1/rooms")
@AllArgsConstructor(onConstructor = @__(@Autowired))
public class RoomController {

    private RoomService roomService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public MessageResponseDTO createRoom(@RequestBody @Valid Room room) {
        return roomService.createRoom(room);
    }

    @GetMapping
    public List<Room> listAll() {
        return roomService.listAll();
    }

    @GetMapping("/{id}")
    public Room findById(@PathVariable Long id) throws RoomNotFoundException {
        return roomService.findById(id);
    }

    @PutMapping("/{id}")
    public MessageResponseDTO updateRoom(@PathVariable Long id, @RequestBody @Valid Room room) throws RoomNotFoundException {
        return roomService.updateRoom(id, room);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public MessageResponseDTO deleteById(@PathVariable Long id) throws RoomNotFoundException {
        return roomService.deleteById(id);
    }

}
