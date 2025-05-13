export interface SchedulingResponse {
  items: SchedulingDto[];
  total: number;
  current_page: number;
  per_page: number;
  last_page: number;
}

export interface SchedulingDto {
  id?: string;
  client: {
    id: string;
    name: string;
    address: {
      cep: string;
      publicPlace: string;
      numberHouse: string;
      neighborhood: string;
      state: string;
      city: string;
    };
    contact: {
      phone: string;
      whatsApp?: string;
      email: string;
    };
  };
  date: Date;
  time: string;
  observations: string;
  created_at: Date;
}
