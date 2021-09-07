package kannon.aaron.meetingrooms.meetingrooms.service;

import kannon.aaron.meetingrooms.meetingrooms.dto.MessageResponseDTO;
import kannon.aaron.meetingrooms.meetingrooms.exception.RoomNotFoundException;
import kannon.aaron.meetingrooms.meetingrooms.model.Room;
import kannon.aaron.meetingrooms.meetingrooms.repository.RoomRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor(onConstructor = @__(@Autowired))
public class RoomService {

    private RoomRepository roomRepository;

    public MessageResponseDTO createRoom(Room room) {
        Room savedRoom = roomRepository.save(room);
        return createMessageResponse(savedRoom, "creating room ");
    }

    public List<Room> listAll() {
        List<Room> allRoom = roomRepository.findAll();
        return allRoom;
    }

    public Room findById (Long id) throws RoomNotFoundException {
        Room room = verifyIfExists(id);
        return room;
    }

    public MessageResponseDTO updateRoom(Long id, Room room) throws RoomNotFoundException {
        Room check = verifyIfExists(id);
        check.setName(room.getName());
        check.setUrlPhoto(room.getUrlPhoto());
        check.setDate(room.getDate());
        check.setStartHour(room.getStartHour());
        check.setEndHour(room.getEndHour());
        check.setDescription(room.getDescription());
        Room updatedRoom = roomRepository.save(check);
        return createMessageResponse(updatedRoom, "updating room ");
    }

    public MessageResponseDTO deleteById(Long id) throws RoomNotFoundException {
        Room room = verifyIfExists(id);
        roomRepository.deleteById(id);
        return createMessageResponse(room, "deleting room ");
    }

    private Room verifyIfExists(Long id) throws RoomNotFoundException {
        return roomRepository.findById(id).orElseThrow(() -> new RoomNotFoundException(id));
    }

    private MessageResponseDTO createMessageResponse(Room room, String s) {
        return MessageResponseDTO.builder().message("Success in "+ s + room.toString()).build();
    }

}
