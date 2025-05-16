
export interface LoginResponse {
  message: string;
  statusCode: number;
  timestamp: string;
  data: {
    accessToken: string;
  };
}

export interface Train {
  id: string;
  name: string;
  from: string;
  to: string;
  departure: string; 
  arrival: string;
}

export interface QueryTrainsDto {
  search?: string;
  sort?: 'id' | 'name' | 'from' | 'to' | 'departure' | 'arrival';
  order?: 'ASC' | 'DESC';
}

export interface AuthContextValue {
  token: string | null
  signUp: (u: string, p: string) => Promise<void>
  signIn: (u: string, p: string) => Promise<void>
  signOut: () => Promise<void>
}