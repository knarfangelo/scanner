import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Persona } from '../../interfaces/Persona';
import { PersonasService } from '../../services/Personas.service';

@Component({
  selector: 'app-tabla',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tabla.component.html',
  styleUrl: './tabla.component.scss'
})
export class TablaComponent implements OnInit {
  personas: Persona[] = [];  // Para almacenar todas las personas

  constructor(private personasService: PersonasService) {}

  ngOnInit(): void {
    // Obtener todas las personas al cargar el componente
    this.personasService.getAllPersonas();

    // Suscribirse al observable de personas para actualizar la tabla cuando cambie la lista
    this.personasService.personas$.subscribe(personas => {
      this.personas = personas;
    });

    this.personasService.searchDni$.subscribe(dni => {
      if (dni) {
        console.log('Buscando persona con DNI:', dni);
        this.personasService.getPersonaByDNI(dni);  // Realiza la consulta por DNI
      } else {
        this.personasService.getAllPersonas();  // Si no hay DNI, obtenemos todas las personas
      }
    });    
}}
