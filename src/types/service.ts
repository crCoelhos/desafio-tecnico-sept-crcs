import { Employee } from "./employee";

export interface Service {
  id: number;
  companyName: string;
  resale: string;
  attendanceNumber: number;
  deliveryPerson?: Employee;
  sellerName: string;
  totalValue: number;
  quantityItems: number;
  boxCode: string;
  address: string;
  status: "Em Andamento" | "Concluído" | "Cancelado";
}
