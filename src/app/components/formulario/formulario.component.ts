import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FilterService } from '../../services/Filter.service';
import { LoadingService } from '../../services/Loading.service';

@Component({
  selector: 'app-formulario',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.scss']
})
export class FormularioComponent {

    // Filtros dinámicos
    anioInicio: string = '1000';
    anioFinal: string = '3000';
    fechaMesDesde: string = '1';
    fechaMesHasta: string = '12';
    fechaDiaDesde: string = '1';
    fechaDiaHasta: string = '31';
  
    edad: string = '';
    edadDesde: string = '';
    edadHasta: string = '';


  dni: string = '';          // Variable para almacenar el DNI ingresado
  apPat: string = '';        // Apellido Paterno
  apMat: string = '';        // Apellido Materno
  nombres: string = '';      // Nombres
  fechaNac: string = '';     // Fecha de Nacimiento
  direccion: string = '';    // Dirección
  sexo: string = '';         // Sexo
  estCivil: string = '';     // Estado Civil
  departamento: string = ''; // Departamento
  provincia: string = '';    // Provincia
  distrito: string = '';     // Distrito
  fechaInicial: string = `${this.anioInicio}-${this.fechaMesDesde.padStart(2, '0')}-${this.fechaDiaDesde.padStart(2, '0')}`;
  fechaFinal: string = `${this.anioFinal}-${this.fechaMesHasta.padStart(2, '0')}-${this.fechaDiaHasta.padStart(2, '0')}`;

    // Este método se llama para actualizar las fechas inicial y final
    actualizarFechas(): void {
      if (this.anioInicio && this.fechaMesDesde && this.fechaDiaDesde) {
        this.fechaInicial = `${this.anioInicio}-${this.fechaMesDesde.padStart(2, '0')}-${this.fechaDiaDesde.padStart(2, '0')}`;
      }
  
      if (this.anioFinal && this.fechaMesHasta && this.fechaDiaHasta) {
        this.fechaFinal = `${this.anioFinal}-${this.fechaMesHasta.padStart(2, '0')}-${this.fechaDiaHasta.padStart(2, '0')}`;
      }
    }


  constructor(
    private filterService: FilterService,
    private loadingService: LoadingService  // Inyectamos el servicio de carga
  ) {}

  // Este método se llama cada vez que el usuario ingresa un valor en el input
  updateFilter(): void {
    // Aplicar trim() a todos los campos
    this.actualizarFechas();

    const filters = {
      dni: this.dni.trim(),
      apPat: this.apPat.trim(),
      apMat: this.apMat.trim(),
      nombres: this.nombres.trim(),
      fechaNac: this.fechaNac.trim(),
      direccion: this.direccion.trim(),
      sexo: this.sexo.trim(),
      estCivil: this.estCivil.trim(),
      departamento: this.departamento.trim(),
      provincia: this.provincia.trim(),
      distrito: this.distrito.trim(),
      // Aquí puedes agregar los filtros adicionales si es necesario
      fechaInicial: this.fechaInicial,
      fechaFinal:this.fechaFinal,

    };

    // Verificar si algún campo tiene contenido después de aplicar trim()
    if (
      filters.dni || filters.apPat || filters.apMat || filters.nombres || 
      filters.fechaNac || filters.direccion || filters.sexo || 
      filters.estCivil || filters.departamento || filters.provincia || 
      filters.distrito || filters.fechaInicial || filters.fechaFinal
    ) {
      // Llamar al servicio que actualiza los filtros
      this.filterService.updateFilterFields(filters);
      // Aquí podrías hacer la llamada para obtener los datos, si es necesario
      // Por ejemplo, llamando a un servicio para obtener la lista filtrada de datos
      // Y, después de obtener los datos, desactivar la pantalla de carga
      // this.personasService.getPersonas(filters).subscribe(() => {
      //   this.loadingService.hideLoading(); // Desactivar la pantalla de carga
      // });
    } else {
      console.log('Por favor ingrese al menos un filtro válido');
      // Desactivar la pantalla de carga si no hay filtros
      this.loadingService.hideLoading();
    }
  }
}
