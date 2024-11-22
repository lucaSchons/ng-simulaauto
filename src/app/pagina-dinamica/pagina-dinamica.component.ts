import { Component, effect, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SupabaseService } from '../supabase.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input'
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';


@Component({
  selector: 'app-pagina-dinamica',
  standalone: true,
  imports: [ReactiveFormsModule, MatInputModule, MatFormFieldModule, MatButtonModule],
  templateUrl: './pagina-dinamica.component.html',
  styleUrl: './pagina-dinamica.component.css'
})
export class PaginaDinamicaComponent {
  private empresa_service = inject(SupabaseService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  empresa = signal<any>([]);
  id_empresa: number = 0;

  form_simulacao = new FormGroup({
    veiculo: new FormControl('', [Validators.required, Validators.minLength(3)]),
    valor_entrada: new FormControl(null, Validators.required),
    nome: new FormControl(null, Validators.required),
    cidade: new FormControl(null, Validators.required),
    cpf: new FormControl(null, Validators.required),
    telefone: new FormControl(null, Validators.required),
    email: new FormControl(null, Validators.required)
  })

  constructor(){
    const nome_empresa = this.route.snapshot.params['nome'];
  
    this.empresa_service.listEmpresaId(nome_empresa).then((data: any) => {
      this.id_empresa = data[0].id;
    }).catch((error) => {
      console.error("Erro ao buscar dados da empresa: ", error);
    });

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

  onSubmit() {
    
    const status = "Em Aberto";
    const simulacao = this.form_simulacao.value;
    console.log(simulacao);
    console.log("ID DA EMPRESA ",this.id_empresa);
    this.empresa_service.novopedido(simulacao, this.id_empresa, status);
    this.form_simulacao.reset();
    
  }
}
