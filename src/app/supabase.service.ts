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

  async listEmpresa(){
    try {
      const {data, error} = await this.supabase.from('empresa').select();
      if(error){
        alert(error.message);
      }
      return data;

    } catch(error) {
      alert(error);
      return null;
    }
  }

}
