package kannon.aaron.meetingrooms.meetingrooms.repository;

import kannon.aaron.meetingrooms.meetingrooms.model.Room;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoomRepository extends JpaRepository<Room, Long> {
}
