import { Component } from '@angular/core';
import { ChatService } from '../chat.service';
export interface room{
  name:string;
  roomId:number;
}
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  newMessage = '';
  messageList: string[] = [];
  roomList: room[] = [];
  constructor(private chatService: ChatService){

  }

  ngOnInit(){
 for(var i = 0; i < 5; i++){
      const room = {} as room;
      console.log("room before:" , room);
      room.name="Room-"+(i+100);
      room.roomId=i+100;
      console.log("room after:" , room);
      this.roomList.push(room);
    }
    console.log(this.roomList);
  }
}
