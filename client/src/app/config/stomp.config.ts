
import { environment } from '@environment/environment';
import { RxStompConfig } from '@stomp/rx-stomp';
import { StompService } from '@services/stomp.service';

export const stompConfig: RxStompConfig = {

    brokerURL: environment.webSocketUrl,
    connectHeaders: {
        login: 'guest',
        passcode: 'guest',
    },
    heartbeatIncoming: 0,
    heartbeatOutgoing: 20000,
    reconnectDelay: 200,

    // It can be quite verbose, not recommended in production
    // Skip this key to stop logging to console
    debug: (msg: string): void => {
        console.log(new Date(), msg);
    }

};

export function stompServiceFactory() {
    const rxStomp = new StompService();
    rxStomp.configure(stompConfig);
    rxStomp.activate();
    return rxStomp;
}