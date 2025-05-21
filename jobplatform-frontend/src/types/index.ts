// types/index.ts



export interface User {
    _id?: string;
    first_name: string;
    last_name:string
    username: string;
    email: string;
    password: string; 
    role?: string; 
    createdAt?: string;
    updatedAt?: string;
  }
  export interface registerFormData {
    name:string;
    email:string;
    username:string;
    password:string;
  }
  export interface AuthResponse {
    data:{
      user: User;
      token: string
    }
    statusCode:number;
  }
  
  export interface AuthError {
    message: string;
    statusCode?: number;
  }
  
  export interface authState {
    userData: User | null;  
    isLoading: boolean;
    error: string | null;   
    isAuthenticated: boolean;
    token: string | null;
  }
  
  export interface userState {
    users: User[];
    loading:boolean;
    error:null
  }
  export interface  jobState{
    jobData: Job[]; 
    filteredData:Job | [],
    suggestedData:[],
    isLoading:boolean,
    error:null
  }

  export interface jobPayload{
    title:string;
    jobType:string;
    experience:string;
  }
  export interface Job {
    _id: string;
    company: string;
    title: string;
    description: string;
    jobType: string;
    location: {
      city: string;
      state: string;
      country: string;
      postal_code: string;
    };
    experience:string,
    skills: string[];
    createdAt:Date;
    __v: number;
  }

  export type jobData = Job[]
  
  export interface modalState{
    modalType:string;
    modalProps:boolean
  }
  
  export interface UserCredentials {
    username: string;
    email: string;
    password: string;
    name?: string;
  }
  
  export interface AuthResponse {
    user:User
    token: string;
  }
  
  export interface ApiError {
    response?: {
      data?: {
        message?: string;
        code?: {
          message?: string;
        };
      };
    };
    message?: string;
  }
  
export interface profileState{
  profileData:UserProfile | null,
  isLoading:boolean,
  error:null
}

export interface UserProfile {
  _id: string;  
  user: string; 
  skills: string[];  
  jobType: "onsite" | "remote" | "hybrid"; 
  location: {
    city?: string;
    state?: string;
    country?: string;
    postal_code?:string
  };
  experience: "0-1" | "1-3" | "3-5" | "5+";  
}


  export interface userPayload {
    user?: User;
    token?: string;
    error?: string;
    id?: string;
  }

  export type profilePayload = object
  
  export interface userDataPayload{
    user?:User
  }

  // Your existing task interfaces
  export interface Task {
    _id?:string
    title?: string;
    description: string;
    dueDate: Date;
    priority?: 'low' | 'medium' | 'high';
    status?: 'not-started' | 'in-progress' | 'completed';
    assignedTo?:string;
    userId?:string
    assignTo?:string
  }
  
  export interface taskState {
    taskData: Task[];
    filteredData:Task[]
    isLoading: boolean;
    error: string | null;  // Changed to string for consistency
  }

  export interface JobMatch {
    company: string;
    experienceFit: "perfect" | "partial" | "none";  
    fullDescription: string;
    jobId: string;  
    jobTitle: string;
    location: string;
    locationMatch: "perfect" | "partial" | "none"; 
    matchScore: number; 
    missingSkills: string[];
    reason: string;
    salary: string;  
    skillsMatch: string[];
  }

  export type JobSuggested = JobMatch[];
  
  

  export type ErrorType = 
    | {
        err: {
          message: string;
        };
      }
    | unknown;

    export type UserLogin = {
         email: string,
      password: string
    }

    export type UserRegister = {
          first_name:string;
          last_name:string;
          username:string;
          email:string;
          password:string;  
    }