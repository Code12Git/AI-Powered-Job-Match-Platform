export interface loginData  {
    email:string;
    password:string;
}

export interface JobData {
    _id:string
     title: string;
    description?: string;
    company: string;
    skills: string[];
    jobType: 'full-time' | 'part-time' | 'contract' | 'remote';
    location?: {
      city?: string;
      state?: string;
      country?: string;
      postal_code?: string;
    };
  }
  
  export type JobList = JobData[];
