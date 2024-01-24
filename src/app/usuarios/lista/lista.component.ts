import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { cargarUsuarios } from 'src/app/store/actions';
import { AppState } from 'src/app/store/app.reducers';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})
export class ListaComponent implements OnInit {

  usuarios:Usuario[] = []
  loading = false;
  error:any;

  constructor(public usuarioService:UsuariosService, private store:Store<AppState>) { }

  ngOnInit(): void {
    this.store.select('usuarios').subscribe( ({users, loading, error}) => {
            this.usuarios = users
            this.loading = loading
            this.error = error
    } 
    )


    this.store.dispatch(cargarUsuarios());
  //  this.usuarioService.getUsers().subscribe(data => this.usuarios = data);
  }

}
