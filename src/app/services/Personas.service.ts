import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Persona } from '../interfaces/Persona';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PersonasService {

  private apiUrl = 'http://localhost:8080/personas';  // URL de la API

  // Observables para almacenar las personas y la persona buscada por DNI
  private personasSubject = new BehaviorSubject<Persona[]>([]);
  private personaSubject = new BehaviorSubject<Persona | null>(null);

  personas$ = this.personasSubject.asObservable();
  persona$ = this.personaSubject.asObservable();

  // Evento que se activa al presionar el botón de búsqueda
  private searchDniSubject = new BehaviorSubject<string>('');
  searchDni$ = this.searchDniSubject.asObservable();

  constructor(private http: HttpClient) {}

  // Método para obtener todas las personas
  getAllPersonas(): void {
    this.http.get<Persona[]>(this.apiUrl).subscribe(
      (personas) => this.personasSubject.next(personas),
      (error) => this.personasSubject.next([])
    );
  }

// Método para obtener una persona por DNI
getPersonaByDNI(dni: string): void {
  this.http.get<Persona>(`${this.apiUrl}/${dni}`).subscribe(
    (persona) => {
      this.personasSubject.next([persona]);  // Actualizamos personasSubject con un arreglo que contiene solo esa persona
      console.log('Persona obtenida con DNI:', persona);
    },
    (error) => {
      this.personasSubject.next([]); // Si ocurre un error, emitimos un arreglo vacío
    }
  );
}

  

  // Método para actualizar el evento de búsqueda
  searchPersona(dni: string): void {
    this.searchDniSubject.next(dni);  // Emite el DNI a todos los componentes suscritos
  }

}
