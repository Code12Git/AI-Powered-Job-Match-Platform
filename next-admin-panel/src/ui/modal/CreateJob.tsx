"use client"
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { FiPlus, FiX } from "react-icons/fi";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { useEffect, useState } from "react";
import { privateRequest } from "@/helpers/axios";
import { availableSkills } from "@/data";
import jobSchema from "@/validations/jobValidation";
import toast from "react-hot-toast";



type JobForm = z.infer<typeof jobSchema>;

interface CreateProps{
  fetchJobs:()=>void
}

export function CreateJob({fetchJobs}:CreateProps) {
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    control,
    reset,
    setValue,
    formState: { errors },
  } = useForm<JobForm>({
    resolver: zodResolver(jobSchema),
    defaultValues: {
      title: "",
      description: "",
      company: "",
      skills: [],
      jobType: "full-time",
      location: {
        city: "",
        state: "",
        country: "",
        postal_code: "",
      },
    },
  });

  useEffect(()=>{
    setValue('skills',selectedSkills)
  },[selectedSkills,setValue])
 
  const onSubmit = async(data: JobForm) => {
    data.skills = selectedSkills;
    try{
      await privateRequest.post('/job',data)
      reset();
      setSelectedSkills([]);
      toast.success('Job Created Successfully')
      fetchJobs();
    }catch(err){
      console.log(err)
    }
  };
  
  const handleSkillToggle = (skill: string) => {
    setSelectedSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
    );
  };


  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2">
          <FiPlus className="h-4 w-4" />
          Add Job
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
      <DialogHeader>
          <DialogTitle className="text-xl">Create New Job Listing</DialogTitle>
          <DialogDescription>
            Fill in the details for the new job position.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-2">
          <div className="space-y-4">
            {/* Title */}
            <div className="space-y-2">
              <Label htmlFor="title">Job Title*</Label>
              <Input
                id="title"
                {...register("title")}
                placeholder="Senior Frontend Developer"
                className={errors.title ? "border-red-500" : ""}
              />
              {errors.title && (
                <p className="text-sm text-red-500">{errors.title.message}</p>
              )}
            </div>

            {/* Company */}
            <div className="space-y-2">
              <Label htmlFor="company">Company*</Label>
              <Input
                id="company"
                {...register("company")}
                placeholder="Tech Corp Inc."
                className={errors.company ? "border-red-500" : ""}
              />
              {errors.company && (
                <p className="text-sm text-red-500">{errors.company.message}</p>
              )}
            </div>

            {/* Location */}
            <div className="space-y-2">
              <Label>Location*</Label>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    {...register("location.city")}
                    className={errors.location?.city ? "border-red-500" : ""}
                  />
                  {errors.location?.city && (
                    <p className="text-sm text-red-500">
                      {errors.location.city.message}
                    </p>
                  )}
                </div>
                <div className="space-y-1">
                  <Label htmlFor="state">State</Label>
                  <Input
                    id="state"
                    {...register("location.state")}
                    className={errors.location?.state ? "border-red-500" : ""}
                  />
                  {errors.location?.state && (
                    <p className="text-sm text-red-500">
                      {errors.location.state.message}
                    </p>
                  )}
                </div>
                <div className="space-y-1">
                  <Label htmlFor="country">Country</Label>
                  <Input
                    id="country"
                    {...register("location.country")}
                    className={errors.location?.country ? "border-red-500" : ""}
                  />
                  {errors.location?.country && (
                    <p className="text-sm text-red-500">
                      {errors.location.country.message}
                    </p>
                  )}
                </div>
                <div className="space-y-1">
                  <Label htmlFor="postal_code">Postal Code</Label>
                  <Input
                    id="postal_code"
                    {...register("location.postal_code")}
                    className={
                      errors.location?.postal_code ? "border-red-500" : ""
                    }
                  />
                  {errors.location?.postal_code && (
                    <p className="text-sm text-red-500">
                      {errors.location.postal_code.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Job Type */}
            <div className="space-y-2">
              <Label>Job Type*</Label>
              <Controller
                name="jobType"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select job type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="full-time">Full-time</SelectItem>
                      <SelectItem value="part-time">Part-time</SelectItem>
                      <SelectItem value="contract">Contract</SelectItem>
                      <SelectItem value="remote">Remote</SelectItem>
                      <SelectItem value="onsite">Onsite</SelectItem>
                      <SelectItem value="any">Any</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>

            {/* Skills */}
            <div className="space-y-2">
              <Label>Skills*</Label>
              <div className="space-y-2">
                <div className="flex flex-wrap gap-2">
                  {availableSkills.map((skill) => (
                    <Badge
                      key={skill}
                      variant={
                        selectedSkills.includes(skill) ? "default" : "outline"
                      }
                      className="px-3 py-1 text-sm flex items-center gap-1 cursor-pointer"
                      onClick={() => handleSkillToggle(skill)}
                    >
                      {skill}
                      {selectedSkills.includes(skill) && (
                        <FiX className="h-3 w-3" />
                      )}
                    </Badge>
                  ))}
                </div>
                {errors.skills && (
                  <p className="text-sm text-red-500">{errors.skills.message}</p>
                )}
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description">Description*</Label>
              <Textarea
                id="description"
                {...register("description")}
                className={`min-h-[120px] ${
                  errors.description ? "border-red-500" : ""
                }`}
                placeholder="Detailed job description..."
              />
              {errors.description && (
                <p className="text-sm text-red-500">
                  {errors.description.message}
                </p>
              )}
            </div>
          </div>

          <div className="flex justify-end gap-2 mt-6">
            <Button
              type="button"
              variant="outline"
              className="cursor-pointer"
              onClick={() => {
                reset();
                setSelectedSkills([]);
              }}
            >
              Cancel
            </Button>
            <Button className="cursor-pointer" type="submit">Create Job</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}