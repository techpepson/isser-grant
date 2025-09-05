import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const applicationSchema = z.object({
  staffId: z.string().min(1, "Staff ID is required"),
  projectTitle: z.string().min(1, "Project title is required"),
  department: z.string().min(1, "Department is required"),
  fundingAmount: z.string().min(1, "Funding amount is required"),
  duration: z.string().min(1, "Duration is required"),
  description: z.string().min(1, "Description is required"),
  category: z.string().min(1, "Category is required"),
});

type ApplicationForm = z.infer<typeof applicationSchema>;

interface QuickApplicationFormProps {
  onSubmit?: (data: ApplicationForm) => void;
  onCancel?: () => void;
}

export default function QuickApplicationForm({ onSubmit, onCancel }: QuickApplicationFormProps) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ApplicationForm>({
    resolver: zodResolver(applicationSchema),
    defaultValues: {
      staffId: "",
      projectTitle: "",
      department: "",
      fundingAmount: "",
      duration: "",
      description: "",
      category: "",
    },
  });

  const handleSubmit = async (data: ApplicationForm) => {
    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Application Submitted",
        description: `Application for ${data.projectTitle} has been submitted successfully.`,
      });
      
      onSubmit?.(data);
      form.reset();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit application. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="staffId">Staff ID</Label>
          <Input
            id="staffId"
            placeholder="Enter staff ID"
            {...form.register("staffId")}
          />
          {form.formState.errors.staffId && (
            <p className="text-sm text-destructive">{form.formState.errors.staffId.message}</p>
          )}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="department">Department</Label>
          <Input
            id="department"
            placeholder="Enter department"
            {...form.register("department")}
          />
          {form.formState.errors.department && (
            <p className="text-sm text-destructive">{form.formState.errors.department.message}</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="projectTitle">Project Title</Label>
        <Input
          id="projectTitle"
          placeholder="Enter project title"
          {...form.register("projectTitle")}
        />
        {form.formState.errors.projectTitle && (
          <p className="text-sm text-destructive">{form.formState.errors.projectTitle.message}</p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="fundingAmount">Funding Amount (GHS)</Label>
          <Input
            id="fundingAmount"
            placeholder="Enter amount"
            {...form.register("fundingAmount")}
          />
          {form.formState.errors.fundingAmount && (
            <p className="text-sm text-destructive">{form.formState.errors.fundingAmount.message}</p>
          )}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="duration">Duration (months)</Label>
          <Input
            id="duration"
            placeholder="Enter duration"
            {...form.register("duration")}
          />
          {form.formState.errors.duration && (
            <p className="text-sm text-destructive">{form.formState.errors.duration.message}</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="category">Category</Label>
        <Select onValueChange={(value) => form.setValue("category", value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="basic-research">Basic Research</SelectItem>
            <SelectItem value="applied-research">Applied Research</SelectItem>
            <SelectItem value="collaborative">Collaborative Research</SelectItem>
            <SelectItem value="international">International Collaboration</SelectItem>
          </SelectContent>
        </Select>
        {form.formState.errors.category && (
          <p className="text-sm text-destructive">{form.formState.errors.category.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Project Description</Label>
        <Textarea
          id="description"
          placeholder="Describe your research project"
          {...form.register("description")}
        />
        {form.formState.errors.description && (
          <p className="text-sm text-destructive">{form.formState.errors.description.message}</p>
        )}
      </div>

      <div className="flex gap-2 pt-4">
        <Button type="submit" disabled={isSubmitting} className="flex-1">
          {isSubmitting ? "Submitting..." : "Submit Application"}
        </Button>
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </form>
  );
}