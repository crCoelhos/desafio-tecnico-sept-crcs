export interface Service {
  id: string;
  companyName: string;
  resale: string;
  attendanceNumber?: number;
  sellerName: string;
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
  tripDuration?: string;
  observation?: string;
  items: {
    id?: string | number;
    name: string;
    quantity: number;
    value: number;
    itemObservation?: string;
  }[];
}
