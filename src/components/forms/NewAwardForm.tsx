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

const awardSchema = z.object({
  applicationId: z.string().min(1, "Application ID is required"),
  awardTitle: z.string().min(1, "Award title is required"),
  principalInvestigatorStaffId: z.string().min(1, "Principal Investigator Staff ID is required"),
  // department: z.string().min(1, "Department is required"),
  awardAmount: z.string().min(1, "Award amount is required"),
  duration: z.string().min(1, "Duration is required"),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().min(1, "End date is required"),
  fundingCall: z.string().min(1, "Funding call is required"),
  description: z.string().min(1, "Award description is required"),
  awardType: z.string().min(1, "Award type is required"),
  awardImage: z.string().min(1, "Award image is required"),
});

type AwardForm = z.infer<typeof awardSchema>;

interface NewAwardFormProps {
  onSubmit?: (data: AwardForm) => void;
  onCancel?: () => void;
}

export default function NewAwardForm({ onSubmit, onCancel }: NewAwardFormProps) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<AwardForm>({
    resolver: zodResolver(awardSchema),
    defaultValues: {
      applicationId: "",
      awardTitle: "",
      principalInvestigatorStaffId: "",
      // department: "",
      awardAmount: "",
      duration: "",
      // startDate: "",
      // endDate: "",
      fundingCall: "",
      description: "",
      awardType: "",
      awardImage: "",
    },
  });

  const handleSubmit = async (data: AwardForm) => {
    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Award Created",
        description: `Award for ${data.awardTitle} has been created successfully.`,
      });
      
      onSubmit?.(data);
      form.reset();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create award. Please try again.",
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
          <Label htmlFor="applicationId">Application ID</Label>
          <Input
            id="applicationId"
            placeholder="Enter application ID"
            {...form.register("applicationId")}
          />
          {form.formState.errors.applicationId && (
            <p className="text-sm text-destructive">{form.formState.errors.applicationId.message}</p>
          )}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="principalInvestigatorStaffId">Principal Investigator Staff ID</Label>
          <Input
            id="principalInvestigatorStaffId"
            placeholder="Enter PI staff ID"
            {...form.register("principalInvestigatorStaffId")}
          />
          {form.formState.errors.principalInvestigatorStaffId && (
            <p className="text-sm text-destructive">{form.formState.errors.principalInvestigatorStaffId.message}</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="awardTitle">Award Title</Label>
        <Input
          id="awardTitle"
          placeholder="Enter award title"
          {...form.register("awardTitle")}
        />
        {form.formState.errors.awardTitle && (
          <p className="text-sm text-destructive">{form.formState.errors.awardTitle.message}</p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* <div className="space-y-2">
          <Label htmlFor="department">Department</Label>
          <Input
            id="department"
            placeholder="Enter department"
            {...form.register("department")}
          />
          {form.formState.errors.department && (
            <p className="text-sm text-destructive">{form.formState.errors.department.message}</p>
          )}
        </div> */}
        
        <div className="space-y-2">
          <Label htmlFor="awardAmount">Award Amount (GHS)</Label>
          <Input
            id="awardAmount"
            placeholder="Enter award amount"
            {...form.register("awardAmount")}
          />
          {form.formState.errors.awardAmount && (
            <p className="text-sm text-destructive">{form.formState.errors.awardAmount.message}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
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
        
        <div className="space-y-2">
          <Label htmlFor="awardType">Award Type</Label>
          <Select onValueChange={(value) => form.setValue("awardType", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select award type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="research-grant">Research Grant</SelectItem>
              <SelectItem value="fellowship">Fellowship</SelectItem>
              <SelectItem value="equipment-grant">Equipment Grant</SelectItem>
              <SelectItem value="travel-grant">Travel Grant</SelectItem>
              <SelectItem value="collaborative">Collaborative Award</SelectItem>
              <SelectItem value="best-paper">Best Paper Award</SelectItem>
            </SelectContent>
          </Select>
          {form.formState.errors.awardType && (
            <p className="text-sm text-destructive">{form.formState.errors.awardType.message}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="dueDate">Start Date</Label>
          <Input
            id="startDate"
            type="date"
            {...form.register("startDate")}
          />
          {form.formState.errors.startDate && (
            <p className="text-sm text-destructive">{form.formState.errors.startDate.message}</p>
          )}
        </div>
        
        {/* <div className="space-y-2">
          <Label htmlFor="endDate">End Date</Label>
          <Input
            id="endDate"
            type="date"
            {...form.register("endDate")}
          />
          {form.formState.errors.endDate && (
            <p className="text-sm text-destructive">{form.formState.errors.endDate.message}</p>
          )}
        </div> */}
      </div>

      <div className="space-y-2">
        <Label htmlFor="fundingCall">Funding Call</Label>
        <Input
          id="fundingCall"
          placeholder="Enter funding call name"
          {...form.register("fundingCall")}
        />
        {form.formState.errors.fundingCall && (
          <p className="text-sm text-destructive">{form.formState.errors.fundingCall.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="awardImage">Upload an image of the award</Label>
        <Input
          id="awardImage"
          type="file"
          accept="image/*"
          {...form.register("awardImage")}
        />
        {form.formState.errors.awardImage && (
          <p className="text-sm text-destructive">{form.formState.errors.awardImage.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Award Description</Label>
        <Textarea
          id="description"
          placeholder="Enter detailed award description"
          rows={4}
          {...form.register("description")}
        />
        {form.formState.errors.description && (
          <p className="text-sm text-destructive">{form.formState.errors.description.message}</p>
        )}
      </div>

      <div className="flex gap-2 pt-4">
        <Button type="submit" disabled={isSubmitting} className="flex-1">
          {isSubmitting ? "Creating..." : "Create Award"}
        </Button>
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </form>
  );
}