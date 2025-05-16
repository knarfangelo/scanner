import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FilterService } from '../../services/Filter.service';
import { LoadingService } from '../../services/Loading.service';
import { Departamento, departamentoJSON } from '../../layouts/homeLayout/mantenimiento/DepartamentoJSON';
import { CommonModule } from '@angular/common';
import { UbigeoService } from '../../services/ubigeo.service';

@Component({
  selector: 'app-formulario',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.scss']
})
export class FormularioComponent {

  // Filtros dinámicos
  // Propiedades para ubigeo
  departamentos: any[] = [];
  provincias: any[] = [];
  distritos: any[] = [];
  selectedDepartamento: any = null;
  selectedProvincia: any = null;
  selectedDistrito: any = null;


  edadSeleccionada: string = '';
  filtroActivo: string = 'fechaNac';  // Por defecto, se activa la búsqueda por fecha de nacimiento
  anioInicio: string = '';
  anioFinal: string = '';
  fechaMesDesde: string = '1';
  fechaMesHasta: string = '12';
  fechaDiaDesde: string = '1';
  fechaDiaHasta: string = '31';

  edad: string = '';
  edadDesde: string = '';
  edadHasta: string = '';

  dni: string = '';
  apPat: string = '';
  apMat: string = '';
  nombres: string = '';
  fechaNac: string = '';
  direccion: string = '';
  sexo: string = '';
  estCivil: string = '';
  departamento: string = '';
  provincia: string = '';
  distrito: string = '';
  fechaInicial: string = `${this.anioInicio}-${this.fechaMesDesde.padStart(2, '0')}-${this.fechaDiaDesde.padStart(2, '0')}`;
  fechaFinal: string = `${this.anioFinal}-${this.fechaMesHasta.padStart(2, '0')}-${this.fechaDiaHasta.padStart(2, '0')}`;

  // Constructor
actualizarFechas(): void {
  if (this.filtroActivo === 'edad') {
          if (this.anioInicio === '' || this.anioFinal === '') {
              this.fechaInicial = `${1800}-${this.fechaMesDesde.padStart(2, '0')}-${this.fechaDiaDesde.padStart(2, '0')}`;
              this.fechaFinal = `${2500}-${this.fechaMesHasta.padStart(2, '0')}-${this.fechaDiaHasta.padStart(2, '0')}`;
      }
    const hoy = new Date();
    const edadMin = parseInt(this.edadDesde); // ej: 18
    const edadMax = parseInt(this.edadHasta); // ej: 35

    if (isNaN(edadMin) || isNaN(edadMax)) {
      console.warn('Edad inválida');
      return;
    }

    // Fecha de nacimiento máxima = hoy - edad mínima (más joven)
    const fechaNacMax = new Date(hoy.getFullYear() - edadMin, hoy.getMonth(), hoy.getDate()); // Mes 11 = diciembre
    // Fecha de nacimiento mínima = hoy - edad máxima (más viejo)
    const fechaNacMin = new Date(hoy.getFullYear() - edadMax - 1 , hoy.getMonth(), hoy.getDate()); // Mes 11 = diciembre

    this.fechaInicial = fechaNacMin.toISOString().split('T')[0];
    this.fechaFinal = fechaNacMax.toISOString().split('T')[0];
  } else {

      if (this.anioInicio === '' || this.anioFinal === '') {
              this.fechaInicial = `${'1800'}-${this.fechaMesDesde.padStart(2, '0')}-${this.fechaDiaDesde.padStart(2, '0')}`;
              this.fechaFinal = `${'2500'}-${this.fechaMesHasta.padStart(2, '0')}-${this.fechaDiaHasta.padStart(2, '0')}`;
      } else {
      this.fechaInicial = `${this.anioInicio}-${this.fechaMesDesde.padStart(2, '0')}-${this.fechaDiaDesde.padStart(2, '0')}`;
      this.fechaFinal = `${this.anioFinal}-${this.fechaMesHasta.padStart(2, '0')}-${this.fechaDiaHasta.padStart(2, '0')}`;
      }
  }
}


  constructor(
    private filterService: FilterService,
    private loadingService: LoadingService,
    private ubigeoService: UbigeoService
  ) {}

  ngOnInit() {
      this.ubigeoService.loadData().subscribe(() => {
      this.departamentos = this.ubigeoService.getDepartamentos();
    });
  }

   onDepartamentoChange(): void {
    if (this.selectedDepartamento) {
      this.provincias = this.ubigeoService.getProvinciasByDepartamento(this.selectedDepartamento.id_depa);
      this.departamento = this.selectedDepartamento.departamento; // Asignar nombre correcto
    } else {
      this.provincias = [];
      this.departamento = '';
    }
    this.selectedProvincia = null;
    this.selectedDistrito = null;
    this.provincia = '';
    this.distritos = [];
    this.distrito = '';
    this.updateFilter();
  }

  onProvinciaChange(): void {
    if (this.selectedProvincia) {
      this.distritos = this.ubigeoService.getDistritosByProvincia(this.selectedProvincia.id_prov);
      this.provincia = this.selectedProvincia.provincia; // Asignar nombre correcto
    } else {
      this.distritos = [];
      this.provincia = '';
    }
    this.selectedDistrito = null;
    this.distrito = '';
    this.updateFilter();
  }

  onDistritoChange(): void {
    if (this.selectedDistrito) {
      this.distrito = this.selectedDistrito.distrito; // Asignar nombre correcto
    } else {
      this.distrito = '';
    }
    this.updateFilter();
  }


  updateFilter(): void {
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
      fechaInicial: this.fechaInicial,
      fechaFinal: this.fechaFinal,
      page: 1
    };

    if (
      filters.dni || filters.apPat || filters.apMat || filters.nombres ||
      filters.fechaNac || filters.direccion || filters.sexo ||
      filters.estCivil || filters.departamento || filters.provincia ||
      filters.distrito || filters.fechaInicial || filters.fechaFinal
    ) {
      this.filterService.saveFilters(filters);
    } else {
      console.log('Por favor ingrese al menos un filtro válido');
      this.loadingService.hideLoading();
    }
  }

  updateFilterEdad() {
    this.updateFilterSwitch(this.edadSeleccionada);
    console.log(`Filtro actualizado: Desde ${this.edadDesde} hasta ${this.edadHasta}`);
  }

  updateFilterSwitch(edadSeleccionada: string) {
    switch (edadSeleccionada) {
      case 'adulto':
        this.edadDesde = '18';
        this.edadHasta = '35';
        break;
      case 'maduro':
        this.edadDesde = '36';
        this.edadHasta = '60';
        break;
      case 'mayor':
        this.edadDesde = '61';
        this.edadHasta = '120';
        break;
      default:
        this.edadDesde = '0';
        this.edadHasta = '120';
        break;
    }
    this.updateFilter();
  }
}
