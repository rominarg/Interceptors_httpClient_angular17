import { Component, OnInit } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { PokemonItemComponent } from '../../components/pokemon-item/pokemon-item.component';
import { ErrorMessageComponent } from '../../components/error-message/error-message.component';
import { PokemonService } from '../../core/services/pokemon.service';
import { EMPTY, Observable, catchError } from 'rxjs';
import { PokemonResults } from '../../interfaces/pokemon';

@Component({
  selector: 'app-pokemon-list',
  standalone: true,
  imports: [AsyncPipe, PokemonItemComponent, ErrorMessageComponent],
  templateUrl: './pokemon-list.component.html',
  styleUrl: './pokemon-list.component.css'
})
export class PokemonListComponent implements OnInit {
   // Observable que contendrá los resultados de Pokémon
  public pokemonResults$!: Observable<PokemonResults>;
  // Mensaje de error en caso de fallo
  public errorMessage!: string;
  // Inyección del servicio de Pokémon
  constructor(private service: PokemonService) { }
  // Método del ciclo de vida que se ejecuta al inicializar el componente
  ngOnInit(): void {
    // Obtener la lista de Pokémon del servicio y manejar posibles errores
    this.pokemonResults$ = this.service.getPokemonList().pipe(catchError((error: string) => {
      // Asignar mensaje de error en caso de fallo
      this.errorMessage = error;
      // Devolver un observable vacío para no interrumpir el flujo
      return EMPTY;
    }))
  }
}
