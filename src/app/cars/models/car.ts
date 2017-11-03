import {Client} from './client';
export interface Cars {
    id: number,
    model: string,
    plate: string,
    deliveryDate: string,
    deadline: string,
    client: Client,
    cost: number,
    isFullyDamaged: boolean
}