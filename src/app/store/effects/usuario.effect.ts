import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { cargarUsuario, cargarUsuarioError, cargarUsuarioSuccess, cargarUsuarios, cargarUsuariosError, cargarUsuariosSuccess } from "../actions";
import { catchError, map, mergeMap, of, tap } from "rxjs";
import { UsuariosService } from "src/app/services/usuarios.service";

@Injectable()
export class UsuarioEffects{

    constructor(
        private actions$:Actions ,
        private usuarioService:UsuariosService
    ){}

    cargarUsuario$ = createEffect(
        ()=> this.actions$.pipe(
            ofType(cargarUsuario),
            tap(data => console.log("effect tap", data)),
            mergeMap(
                (action)=> this.usuarioService.getUserById(action.id).pipe(
                    map(user => cargarUsuarioSuccess({usuario:user})),
                    catchError(err => of(cargarUsuarioError({payload:err})))
                )
            )
        )
    )

}