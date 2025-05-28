// src/domain/entities/Data.ts

export interface Data {
  load_id: string;
  dispatched: string;
  tractor: string;
  trailer: string;
  dispatch_type: string;
  order_taker: string;
  dispatcher: string;
  dispatcher_terminal: string;
  dispatch_status: string;
  date_created: string | null;
  dispatch_date: string | null;
  pickup_date: string | null;
  delivery_date: string | null;
  billing_date: string | null;
  load_terminal: string;
  shipper: string;
  bill_to: string;
  customer_terminal: string;
  cust_sales_rep: string;
  origin: string;
  origin_zip: string;
  destination: string;
  dest_zip: string;
  miles: number;
  trailer_type: string;
  load_size: string;
  weight: number;
  extra_stops: number;
  freight_charge: number;
  fuel: number;
  accessorial: number;
  total_bill: number;
  trans_cost: number;
  gross_profit: number;
  gross_margin: number;
  month: number;
  column1: string;
  column2: string;
  column3: string;
  column4: string;
  column5: string;
  column6: string;
  product_category: string;
  month2: string;
}
