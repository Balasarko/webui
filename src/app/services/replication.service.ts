import { Injectable } from '@angular/core';

import { WebSocketService } from './ws.service';

@Injectable()
export class ReplicationService {

    constructor(protected ws: WebSocketService) { };

    getSnapshotTasks() {
        return this.ws.call('pool.snapshottask.query');
    }
}