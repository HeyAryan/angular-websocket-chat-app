import { Component } from '@angular/core';
import { ChatService } from '../chat.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent {
  names: string[] = ['John', 'Jane', 'Alice', 'Bob', 'Eve'];
  newMessage = '';
  messageList: string[] = [];
  roomId:number = 0;
  name:string ='';
  constructor(private chatService: ChatService,private route: ActivatedRoute,){
    this.roomId = Number(this.route.snapshot.paramMap.get('id'));
  }

  ngOnInit(){
    this.chatService.getMessage().subscribe((data: { user: string, roomId: number, message: string }) => {
      console.log(data);
      // const json = JSON.parse(data);
      // if (data.roomId == this.roomId) {
        this.messageList.push(data.user + " : " +data.message);
      // }
    })
    this.name=this.getRandomName();
    this.joinRoom();
  }
  ngOnDestroy() {
    // this.chatService.exitRoom(this.name,this.roomId);
    this.messageList = [];
  }
  sendMessage() {
    this.chatService.sendMessage(this.newMessage,this.name,this.roomId);
    this.newMessage = '';
  }
  joinRoom() {
    this.chatService.joinRoom(this.name,this.roomId);
    this.newMessage = '';
  }
  getRandomName(): string {
    const randomIndex = Math.floor(Math.random() * this.names.length);
    return this.names[randomIndex];
  }
}
