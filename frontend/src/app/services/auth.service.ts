import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface User {
    id: number;
    nombre: string;
    rol: 'Admin' | 'Agente' | 'Broker' | 'Contabilidad';
}

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    // Mock user for development
    private currentUserSubject = new BehaviorSubject<User | null>({
        id: 1,
        nombre: 'Admin User',
        rol: 'Admin'
    });

    currentUser$ = this.currentUserSubject.asObservable();

    constructor() { }

    get currentUserValue(): User | null {
        return this.currentUserSubject.value;
    }

    // Method to switch roles for testing
    loginAs(role: 'Admin' | 'Agente' | 'Broker' | 'Contabilidad') {
        this.currentUserSubject.next({
            id: role === 'Broker' ? 3 : 1,
            nombre: `${role} User`,
            rol: role
        });
    }
}
