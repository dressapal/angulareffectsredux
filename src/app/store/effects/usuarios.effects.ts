import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { cargarUsuarios, cargarUsuariosError, cargarUsuariosSuccess } from "../actions";
import { catchError, map, mergeMap, of, tap } from "rxjs";
import { UsuariosService } from "src/app/services/usuarios.service";

@Injectable()
export class UsuariosEffects{

    constructor(
        private actions$:Actions ,
        private usuarioService:UsuariosService
    ){}

    cargarUsuarios$ = createEffect(
        ()=> this.actions$.pipe(
            ofType(cargarUsuarios),
            tap(data => console.log("effect tap", data)),
            mergeMap(
                ()=> this.usuarioService.getUsers().pipe(
                    map(users => cargarUsuariosSuccess({usuarios:users})),
                    catchError( err => of(cargarUsuariosError({payload:err}))  )

                 )
            )
        )
    )

}