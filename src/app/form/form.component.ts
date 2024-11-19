import { SupabaseService } from './../supabase.service';
import { Component, effect, inject, signal } from '@angular/core';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class FormComponent {
  private empresa_service = inject(SupabaseService);
  empresas = signal<any>([]);

  constructor(){
    effect(() => {
      this.onListEmpresa();
    })
  }

  onListEmpresa(){
    this.empresa_service.listEmpresa().then(res => {
      console.log(res);
      if(res !== null){
        this.empresas.set(res);
      } else {
        console.log("No messages Found")
      }
    })
    .catch((err) => {
      alert(err.message);
    })
  }

}
