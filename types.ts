export interface RoomsProps {
  activeRooms: string[];
}

export interface CreateUserProps {
  activeRooms: string[];
}

export interface MeowButtonProps {
  userID: string;
}

export interface UserCardProps {
  id: string;
  name: string;
  img: string;
}

export interface UserList {
  id: string;
  name: string;
  img: string;
}
