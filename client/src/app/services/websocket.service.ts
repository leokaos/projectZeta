import { Injectable } from '@angular/core';
import { environment } from '@environment/environment'
import { Message } from '@stomp/stompjs';
import { StompConfig, StompService } from '@stomp/ng2-stompjs';

@Injectable({
    providedIn: 'root'
})
export class WebSocketAPI {

    constructor(private stompService: StompService) { }

    connect(topic: string, fn: any) {

        this.stompService.subscribe(topic).subscribe((message: Message) => {
            fn(message)
        });
    }
}

export const WebSocketConfig: StompConfig = {
    url: environment.WS_URL,
    headers: {},
    heartbeat_in: 0,
    heartbeat_out: 20000,
    reconnect_delay: 5000,
    debug: false
}