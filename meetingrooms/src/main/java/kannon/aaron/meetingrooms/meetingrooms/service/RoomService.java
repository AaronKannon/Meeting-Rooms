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
        return createMessageResponse(savedRoom.getId(), "creating room with ID ");
    }

    public List<Room> listAll() {
        List<Room> allRoom = roomRepository.findAll();
        return allRoom;
    }

    public Room findById (Long id) throws RoomNotFoundException {
        Room room = verifyIfExists(id);
        return room;
    }

    public MessageResponseDTO updateById(Long id, Room room) throws RoomNotFoundException {
        verifyIfExists(id);
        Room updatedRoom = roomRepository.save(room);
        return createMessageResponse(updatedRoom.getId(), "updating room with ID ");
    }

    public MessageResponseDTO deleteById(Long id) throws RoomNotFoundException {
        verifyIfExists(id);
        roomRepository.deleteById(id);
        return createMessageResponse(id, "deleting room with ID ");
    }

    private Room verifyIfExists(Long id) throws RoomNotFoundException {
        return roomRepository.findById(id).orElseThrow(() -> new RoomNotFoundException(id));
    }

    private MessageResponseDTO createMessageResponse(Long id, String s) {
        return MessageResponseDTO.builder().message("Success in "+ s + id).build();
    }

}
