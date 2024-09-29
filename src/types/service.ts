import { Employee } from "./employee";

export interface Service {
  id: number;
  companyName: string;
  resale: string;
  attendanceNumber?: number;
  deliveryPerson?: Employee;
  sellerName: string;
  totalValue?: number;
  quantityItems?: number;
  boxCode?: number | undefined;
  address: string;
  employeeId?: number;
  status:
    | "Aguardando"
    | "Em Andamento"
    | "Concluído"
    | "Cancelado"
    | "Arquivado";
  startedAt?: Date;
  finishedAt?: Date;
  canceledAt?: Date;
}
