import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class WebSocketAPI {

    url: string = 'http://localhost:8090/ws';

    constructor() { }

    connect(topic: string, fn: any) {

        let ws = new SockJS(this.url);

        let stompClient = Stomp.over(ws);

        stompClient.connect({}, function (options) {
            stompClient.subscribe(topic, function (event) {
                fn(event);
            });
        });
    }
}