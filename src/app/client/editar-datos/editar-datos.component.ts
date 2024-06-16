import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/auth/users.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { LocalizacionService } from '../../services/auth/localizacion.service';

import { Provincia } from '../../interface/user';

import { Localidad } from '../../interface/user';

import { usuario } from '../../interface/user';

@Component({
  selector: 'app-editar-datos',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './editar-datos.component.html',
  styleUrl: './editar-datos.component.css'
})
export class EditarDatosComponent implements OnInit {
  private userId = new BehaviorSubject<number | null>(null);
  currentUserId = this.userId.asObservable();

  usuarioForm!: FormGroup;

  provincias: Provincia[] = [];
  localidades: Localidad[] = [];
  usuarioExistente!: usuario;

  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private route: ActivatedRoute,
    private localizacionService: LocalizacionService,
  ) {}

  ngOnInit(): void {
    this.crearFormulario(); 
    this.route.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.cargarDatosUsuario(id);
        this.userId.next(id); 
      }
    });
    this.crearFormulario();
  }

  crearFormulario() {
    this.usuarioForm = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5)]], 
      // rol: ['', Validators.required],
      direccionEnvio: ['', ],
      metodoPago: ['', ], 
      provincia: [null],
      localidad: [{ value: null, disabled: true },]

    });
  

  this.localizacionService.obtenerProvincias().subscribe(
    (provincias) => {
      this.provincias = provincias;
      // Después de cargar las provincias, selecciona la provincia del usuario
    
      // Luego carga las localidades de esa provincia
      // this.onProvinciaChange();
    },
    (error) => {
      console.error('Error al obtener las provincias', error);
    }
  );
}

  onProvinciaChange() {
    if (this.usuarioForm) { 
      const provinciaId = this.usuarioForm.get('provincia')?.value;
      if (provinciaId) {
      this.localizacionService.obtenerLocalidadesPorProvincia(provinciaId).subscribe(
        (localidades) => {
          this.localidades = localidades;
          this.usuarioForm.get('localidad')?.enable();
        },
        (error) => {
          console.error('Error al obtener las localidades', error);
        }
      );
    }
  }
}

  cargarDatosUsuario(id: number) {
    this.usuarioService.obtenerUsuarioPorId(id).subscribe(
      (usuario) => {
        this.usuarioExistente = usuario; // Guarda el usuario existente
        this.usuarioForm.patchValue({
          nombre: usuario.nombre,
          apellido: usuario.apellido,
          email: usuario.email,
          password: usuario.password,
          direccionEnvio: usuario.direccionEnvio,
          metodoPago: usuario.metodoPago,
          provincia: usuario.localidad?.provincia?.id,
          // No establezcas aún la localidad aquí
        });
        // Ahora carga las localidades correspondientes a la provincia seleccionada
        if (usuario.localidad?.provincia?.id) {
          this.localizacionService.obtenerLocalidadesPorProvincia(usuario.localidad.provincia.id).subscribe(
            (localidades) => {
              this.localidades = localidades;
              // Una vez cargadas las localidades, establece la localidad actual del usuario
              this.usuarioForm.get('localidad')?.setValue(usuario.localidad.id);
              this.usuarioForm.get('localidad')?.enable();
            },
            (error) => {
              console.error('Error al obtener las localidades', error);
            }
          );
        }
      },
      (error) => {
        console.error('Error al obtener los datos del usuario', error);
      }
    );
  }

  actualizarUsuario() {
    if (this.usuarioForm.valid) {
      const usuarioData = this.usuarioForm.value;
      //  datos de localidad y provincia estén estructurados correctamente
      usuarioData.localidad = {
        id: usuarioData.localidad,
        // se Omitee 'nombre' si no es necesario enviarlo
        provincia: {
          id: usuarioData.provincia
        }
      };
      // see Omiteee 'provincia' si no es necesario enviarlo
      this.currentUserId.subscribe(id => {
        if (id) {
          this.usuarioService.actualizarUsuario(id, this.usuarioForm.value).subscribe(
            (usuarioActualizado) => {
              console.log('Usuario actualizado', usuarioActualizado);

            },
            (error) => {
              console.error('Error al actualizar el usuario', error);

            }
          );
        }
      });
    } else {
      console.error('El formulario no es válido');
      // mostrar un mensaje al usuario indicando que debe completar todos los campos requeridos
    }
  }
}