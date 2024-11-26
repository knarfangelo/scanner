import { Component } from '@angular/core';
import { PersonasService } from '../../services/Personas.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-formulario',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './formulario.component.html',
  styleUrl: './formulario.component.scss'
})
export class FormularioComponent {
  dni: string = '';  // Variable para almacenar el DNI ingresado

  constructor(private personasService: PersonasService) {}

  searchPersona(): void {
    console.log('Buscando persona con DNI:', this.dni);
    this.personasService.searchPersona(this.dni);  // Emite el evento de búsqueda por DNI
  }
  
}
