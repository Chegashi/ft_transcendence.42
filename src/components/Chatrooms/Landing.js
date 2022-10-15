import { chatRooms } from './ChatRoomData.js';
import {Link} from'react-router-dom';

import './Landing.css'
function Landing() {
    return (
        <>
        <div className='ChatRooms'>
            <h2>Choose a Chat Room</h2>
            <ul className="chat-room-list">
                {chatRooms.map((room) => (
                    <li key={room.id}>
                    <Link to={`/room/${room.id}`}>{room.title}</Link>
                    </li>
                ))}
            </ul>
            </div>
        </>
    );
}

export { Landing };