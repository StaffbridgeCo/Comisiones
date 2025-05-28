export interface Printable {
  id?: number; // opcional si aún no ha sido insertado
  load_id: string;
  billing_date: string; // si usas Date en vez de string, puedes cambiarlo
  customer: string;
  broker: string;
  percentage?: number; // opcional si aún no se ha calculado
  gross_margin: number;
  commission?: number; // opcional si aún no se ha calculado
}
