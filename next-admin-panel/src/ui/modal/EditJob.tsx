'use client'

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
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
import { FiEdit2, FiX } from "react-icons/fi";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import jobSchema from "@/validations/jobValidation";
import { availableSkills } from "@/data";
import { JobData } from "@/types";
import { privateRequest } from "@/helpers/axios";
import { useEffect, useState } from "react";
import { z } from "zod";

type JobForm = z.infer<typeof jobSchema>;

type EditProps = {
  job: JobData;
  fetchJobs:()=>void
};

function EditJob({ job,fetchJobs }: EditProps) {
  const [selectedSkills, setSelectedSkills] = useState<string[]>(job.skills);
  const [isOpen, setIsOpen] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    reset,
    formState: { errors },
  } = useForm<JobForm>({
    resolver: zodResolver(jobSchema),
    defaultValues: {
      title: job.title,
      description: job.description,
      company: job.company,
      skills: job.skills,
      jobType: job.jobType,
      location: {
        city: job.location?.city || "",
        state: job.location?.state || "",
        country: job.location?.country || "",
        postal_code: job.location?.postal_code || "",
      },
    },
  });

  useEffect(() => {
    reset({
      title: job.title,
      description: job.description,
      company: job.company,
      skills: job.skills,
      jobType: job.jobType,
      location: {
        city: job.location?.city || "",
        state: job.location?.state || "",
        country: job.location?.country || "",
        postal_code: job.location?.postal_code || "",
      },
    });
    setSelectedSkills(job.skills);
  }, [job, reset]);

  useEffect(() => {
    setValue("skills", selectedSkills);
  }, [selectedSkills, setValue]);

  const handleSkillToggle = (skill: string) => {
    setSelectedSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
    );
  };

  const onSubmit = async (data: JobForm) => {
    try {
      await privateRequest.put(`/job/${job._id}`, data);
      fetchJobs();
       setIsOpen(false);
    } catch (err) {
      console.error("Error updating job:", err);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon">
          <FiEdit2 className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Job</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
          {/* Job Title */}
          <div className="space-y-2">
            <Label htmlFor="title">Job Title*</Label>
            <Input
              id="title"
              {...register("title")}
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
                  </SelectContent>
                </Select>
              )}
            />
          </div>

          {/* Skills */}
          <div className="space-y-2">
            <Label>Skills*</Label>
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

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description*</Label>
            <Textarea
              id="description"
              {...register("description")}
              className={`min-h-[120px] ${
                errors.description ? "border-red-500" : ""
              }`}
            />
            {errors.description && (
              <p className="text-sm text-red-500">
                {errors.description.message}
              </p>
            )}
          </div>

          <div className="flex justify-end gap-2 mt-6">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit">Update Job</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default EditJob;