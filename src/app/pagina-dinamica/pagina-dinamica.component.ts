import { Component, effect, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SupabaseService } from '../supabase.service';


@Component({
  selector: 'app-pagina-dinamica',
  standalone: true,
  imports: [],
  templateUrl: './pagina-dinamica.component.html',
  styleUrl: './pagina-dinamica.component.css'
})
export class PaginaDinamicaComponent {
  private empresa_service = inject(SupabaseService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  empresa = signal<any>([]);

  constructor(){
    const nome_empresa = this.route.snapshot.params['nome'];
    console.log("nome da empresa selecionada ", nome_empresa);
    effect(() => {
      this.onListNomeEmpresa(nome_empresa);
    })
  }

  onListNomeEmpresa(nome: string){
    this.empresa_service.listEmpresaNome(nome).then(res => {
      console.log(res);
      if(res !== null){
        console.log("retorno do objeto res, ", res);
        this.empresa.set(res);
      } else {
        console.log("No messages Found")
      }
    })
    .catch((err) => {
      alert(err.message);
    })
  }
}
