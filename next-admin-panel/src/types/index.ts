export interface loginData  {
    email:string;
    password:string;
}

type ExperienceRange = "0-1" | "1-3" | "3-5" | "5+";

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
    experience:ExperienceRange,
    salary:number;
  }
  
  export type JobList = JobData[];
