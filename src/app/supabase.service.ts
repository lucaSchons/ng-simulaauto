import { Injectable } from '@angular/core';
import { SupabaseClient, createClient } from '@supabase/supabase-js';
import { environment } from '../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {
  private supabase!: SupabaseClient;

  constructor() {
    this.supabase = createClient(
      environment.supabaseUrl,
      environment.supabaseKey
    )
  }

  async listEmpresa() {
    try {
      const { data, error } = await this.supabase.from('empresa').select();
      if (error) {
        alert(error.message);
      }
      return data;

    } catch (error) {
      alert(error);
      return null;
    }
  }

  async listEmpresaId(nome: string) {
    try {
      const { data, error } = await this.supabase
        .from('empresa')
        .select('id')
        .eq('nome', nome);

      if (error) {
        alert(error.message);
      }
      return data;

    } catch (error) {
      alert(error);
      return null;
    }
  }


  async listEmpresaNome(nome: string) {
    try {
      const { data, error } = await this.supabase.from('empresa').select().eq('nome', nome);
      if (error) {
        alert(error.message);
      }
      return data;

    } catch (error) {
      alert(error);
      return null;
    }

  }

  async novopedido(pedido: any, id: any, status: any) {
    const empresa_id = id;
    console.log("DADOS PEDIDO: ",pedido);
    console.log("ID EMPRESA: ", id);
    console.log("STATUS: ", status);

    try {
      const { data, error } = await this.supabase
        .from('pedido_simulacao')
        .insert(
          {
            veiculo: pedido.veiculo,
            valor_entrada: pedido.valor_entrada,
            cliente_nome: pedido.nome,
            cliente_endereco: pedido.cidade,
            cliente_cpf: pedido.cpf,
            cliente_telefone: pedido.telefone,
            cliente_email: pedido.email,
            empresa_id: empresa_id,
            status: status
          });

      if (error) {
        alert(error.message);
      }
      // return data;

    } catch (error) {
      alert(error);
      // return null;
    }
  }

}
