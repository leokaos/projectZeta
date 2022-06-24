import { Injectable } from '@angular/core';
import { environment } from '@environment/environment'
import { Message } from '@stomp/stompjs';
import { StompService } from '@services/stomp.service';

@Injectable({
    providedIn: 'root'
})
export class WebSocketAPI {

    constructor(private stompService: StompService) { }

    connect(topic: string, fn: any) {

        this.stompService.watch(topic).subscribe((message: Message) => {
            fn(message);
        });
    }
}
