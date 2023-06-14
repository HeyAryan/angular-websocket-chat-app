import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { io } from "socket.io-client";


@Injectable({
  providedIn: 'root',
})
export class ChatService {

  public message$: BehaviorSubject<string> = new BehaviorSubject('');
  socket = io('http://localhost:3000');
  constructor() {
    this.socket = io('http://localhost:3000', {transports: ['websocket', 'polling', 'flashsocket']});
  }

  roomId:number[]=[]

  public sendMessage(message: any,name:string,roomId:number) {
    const data = {
      message: message,
      name: name,
      roomId:roomId
    };
    this.socket.emit('message', data);
  }

  getMessage(): Observable<any> {
    return new Observable<{user: string, message: string}>(observer => {
      this.socket.on('new message', (data) => {
        console.log(data);
        observer.next(data);
      });

      return () => {
        this.socket.disconnect();
      }
    });
  }
  public getNewMessage = () => {
    this.socket.on('message', (message) =>{
      console.log(message);
      this.message$.next(message);
    });

    return this.message$.asObservable();
  };

  public joinRoom = (username:string,roomId:number) =>{
    this.roomId.push(roomId);
    this.socket.emit('joinRoom', { username, roomId });

    this.socket.on('roomJoined', (message: string) => {
      this.message$.next(message);
    });

    this.socket.on('userLeft', (message: string) => {
      // console.log(message);
    });
  }
}