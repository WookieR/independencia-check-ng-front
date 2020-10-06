import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImagenPipe } from './imagen.pipe';
import { TurnoPipe } from './turno.pipe';



@NgModule({
  declarations: [ ImagenPipe, TurnoPipe ],
  imports: [
    CommonModule
  ],
  exports: [ ImagenPipe, TurnoPipe ]
})
export class PipesModule { }
