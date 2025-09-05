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

const financialReportSchema = z.object({
  reporterStaffId: z.string().min(1, "Reporter Staff ID is required"),
  projectId: z.string().min(1, "Project ID is required"),
  reportType: z.string().min(1, "Report type is required"),
  reportingPeriod: z.string().min(1, "Reporting period is required"),
  totalBudget: z.string().min(1, "Total budget is required"),
  amountSpent: z.string().min(1, "Amount spent is required"),
  remainingBalance: z.string().min(1, "Remaining balance is required"),
  majorExpenditures: z.string().min(1, "Major expenditures are required"),
  notes: z.string().optional(),
});

type FinancialReportForm = z.infer<typeof financialReportSchema>;

interface FinancialReportFormProps {
  onSubmit?: (data: FinancialReportForm) => void;
  onCancel?: () => void;
}

export default function FinancialReportForm({ onSubmit, onCancel }: FinancialReportFormProps) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FinancialReportForm>({
    resolver: zodResolver(financialReportSchema),
    defaultValues: {
      reporterStaffId: "",
      projectId: "",
      reportType: "",
      reportingPeriod: "",
      totalBudget: "",
      amountSpent: "",
      remainingBalance: "",
      majorExpenditures: "",
      notes: "",
    },
  });

  const handleSubmit = async (data: FinancialReportForm) => {
    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Financial Report Submitted",
        description: `Financial report for project ${data.projectId} has been submitted successfully.`,
      });
      
      onSubmit?.(data);
      form.reset();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit financial report. Please try again.",
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
          <Label htmlFor="reporterStaffId">Reporter Staff ID</Label>
          <Input
            id="reporterStaffId"
            placeholder="Enter your staff ID"
            {...form.register("reporterStaffId")}
          />
          {form.formState.errors.reporterStaffId && (
            <p className="text-sm text-destructive">{form.formState.errors.reporterStaffId.message}</p>
          )}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="projectId">Project ID</Label>
          <Input
            id="projectId"
            placeholder="Enter project ID"
            {...form.register("projectId")}
          />
          {form.formState.errors.projectId && (
            <p className="text-sm text-destructive">{form.formState.errors.projectId.message}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="reportType">Report Type</Label>
          <Select onValueChange={(value) => form.setValue("reportType", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select report type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="quarterly">Quarterly Report</SelectItem>
              <SelectItem value="annual">Annual Report</SelectItem>
              <SelectItem value="interim">Interim Report</SelectItem>
              <SelectItem value="final">Final Report</SelectItem>
            </SelectContent>
          </Select>
          {form.formState.errors.reportType && (
            <p className="text-sm text-destructive">{form.formState.errors.reportType.message}</p>
          )}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="reportingPeriod">Reporting Period</Label>
          <Input
            id="reportingPeriod"
            placeholder="e.g., Q1 2024, Jan-Mar 2024"
            {...form.register("reportingPeriod")}
          />
          {form.formState.errors.reportingPeriod && (
            <p className="text-sm text-destructive">{form.formState.errors.reportingPeriod.message}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="totalBudget">Total Budget (GHS)</Label>
          <Input
            id="totalBudget"
            placeholder="Enter total budget"
            {...form.register("totalBudget")}
          />
          {form.formState.errors.totalBudget && (
            <p className="text-sm text-destructive">{form.formState.errors.totalBudget.message}</p>
          )}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="amountSpent">Amount Spent (GHS)</Label>
          <Input
            id="amountSpent"
            placeholder="Enter amount spent"
            {...form.register("amountSpent")}
          />
          {form.formState.errors.amountSpent && (
            <p className="text-sm text-destructive">{form.formState.errors.amountSpent.message}</p>
          )}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="remainingBalance">Remaining Balance (GHS)</Label>
          <Input
            id="remainingBalance"
            placeholder="Enter remaining balance"
            {...form.register("remainingBalance")}
          />
          {form.formState.errors.remainingBalance && (
            <p className="text-sm text-destructive">{form.formState.errors.remainingBalance.message}</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="majorExpenditures">Major Expenditures</Label>
        <Textarea
          id="majorExpenditures"
          placeholder="Describe major expenditures during this period"
          rows={3}
          {...form.register("majorExpenditures")}
        />
        {form.formState.errors.majorExpenditures && (
          <p className="text-sm text-destructive">{form.formState.errors.majorExpenditures.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="notes">Additional Notes (Optional)</Label>
        <Textarea
          id="notes"
          placeholder="Any additional notes or explanations"
          rows={2}
          {...form.register("notes")}
        />
      </div>

      <div className="flex gap-2 pt-4">
        <Button type="submit" disabled={isSubmitting} className="flex-1">
          {isSubmitting ? "Submitting..." : "Submit Report"}
        </Button>
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </form>
  );
}