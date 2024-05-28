import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { getService } from '../get/get-service.service';
import { CreateService } from '../create/create-service.service';

@Injectable({
    providedIn: 'root'
})
export class CommentService {
    public user: any = {};
    public dataOrders: any = new BehaviorSubject([]);
    public dataDefault: any = [];
    currentData = this.dataOrders.asObservable();

    constructor(private getService: getService, private createService: CreateService) {
    }

    public changeData(data: any) {
        this.dataOrders.next(data);
    }
}
