import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const researcherSchema = z.object({
  staffId: z.string().min(1, "Staff ID is required"),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().min(1, "Phone number is required"),
  department: z.string().min(1, "Department is required"),
  position: z.string().min(1, "Position is required"),
  specialization: z.string().min(1, "Specialization is required"),
  qualification: z.string().min(1, "Qualification is required"),
});

type ResearcherForm = z.infer<typeof researcherSchema>;

interface AddResearcherFormProps {
  onSubmit?: (data: ResearcherForm) => void;
  onCancel?: () => void;
}

export default function AddResearcherForm({ onSubmit, onCancel }: AddResearcherFormProps) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ResearcherForm>({
    resolver: zodResolver(researcherSchema),
    defaultValues: {
      staffId: "",
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      department: "",
      position: "",
      specialization: "",
      qualification: "",
    },
  });

  const handleSubmit = async (data: ResearcherForm) => {
    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Researcher Added",
        description: `${data.firstName} ${data.lastName} has been added successfully.`,
      });
      
      onSubmit?.(data);
      form.reset();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add researcher. Please try again.",
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
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="Enter email"
            {...form.register("email")}
          />
          {form.formState.errors.email && (
            <p className="text-sm text-destructive">{form.formState.errors.email.message}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="firstName">First Name</Label>
          <Input
            id="firstName"
            placeholder="Enter first name"
            {...form.register("firstName")}
          />
          {form.formState.errors.firstName && (
            <p className="text-sm text-destructive">{form.formState.errors.firstName.message}</p>
          )}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="lastName">Last Name</Label>
          <Input
            id="lastName"
            placeholder="Enter last name"
            {...form.register("lastName")}
          />
          {form.formState.errors.lastName && (
            <p className="text-sm text-destructive">{form.formState.errors.lastName.message}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="phone">Phone</Label>
          <Input
            id="phone"
            placeholder="Enter phone number"
            {...form.register("phone")}
          />
          {form.formState.errors.phone && (
            <p className="text-sm text-destructive">{form.formState.errors.phone.message}</p>
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

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="position">Position</Label>
          <Select onValueChange={(value) => form.setValue("position", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select position" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="professor">Professor</SelectItem>
              <SelectItem value="associate-professor">Associate Professor</SelectItem>
              <SelectItem value="senior-lecturer">Senior Lecturer</SelectItem>
              <SelectItem value="lecturer">Lecturer</SelectItem>
              <SelectItem value="assistant-lecturer">Assistant Lecturer</SelectItem>
              <SelectItem value="research-fellow">Research Fellow</SelectItem>
              <SelectItem value="postdoc">Postdoctoral Researcher</SelectItem>
            </SelectContent>
          </Select>
          {form.formState.errors.position && (
            <p className="text-sm text-destructive">{form.formState.errors.position.message}</p>
          )}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="qualification">Highest Qualification</Label>
          <Select onValueChange={(value) => form.setValue("qualification", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select qualification" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="phd">PhD</SelectItem>
              <SelectItem value="masters">Master's Degree</SelectItem>
              <SelectItem value="bachelors">Bachelor's Degree</SelectItem>
              <SelectItem value="diploma">Diploma</SelectItem>
            </SelectContent>
          </Select>
          {form.formState.errors.qualification && (
            <p className="text-sm text-destructive">{form.formState.errors.qualification.message}</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="specialization">Research Specialization</Label>
        <Input
          id="specialization"
          placeholder="Enter research specialization"
          {...form.register("specialization")}
        />
        {form.formState.errors.specialization && (
          <p className="text-sm text-destructive">{form.formState.errors.specialization.message}</p>
        )}
      </div>

      <div className="flex gap-2 pt-4">
        <Button type="submit" disabled={isSubmitting} className="flex-1">
          {isSubmitting ? "Adding..." : "Add Researcher"}
        </Button>
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </form>
  );
}