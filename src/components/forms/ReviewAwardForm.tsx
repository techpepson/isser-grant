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

const reviewSchema = z.object({
  reviewerStaffId: z.string().min(1, "Reviewer Staff ID is required"),
  awardId: z.string().min(1, "Award ID is required"),
  applicantStaffId: z.string().min(1, "Applicant Staff ID is required"),
  reviewStatus: z.string().min(1, "Review status is required"),
  score: z.string().min(1, "Score is required"),
  comments: z.string().min(1, "Comments are required"),
  recommendation: z.string().min(1, "Recommendation is required"),
});

type ReviewForm = z.infer<typeof reviewSchema>;

interface ReviewAwardFormProps {
  onSubmit?: (data: ReviewForm) => void;
  onCancel?: () => void;
}

export default function ReviewAwardForm({ onSubmit, onCancel }: ReviewAwardFormProps) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ReviewForm>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      reviewerStaffId: "",
      awardId: "",
      applicantStaffId: "",
      reviewStatus: "",
      score: "",
      comments: "",
      recommendation: "",
    },
  });

  const handleSubmit = async (data: ReviewForm) => {
    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Review Submitted",
        description: `Review for award ${data.awardId} has been submitted successfully.`,
      });
      
      onSubmit?.(data);
      form.reset();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit review. Please try again.",
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
          <Label htmlFor="reviewerStaffId">Reviewer Staff ID</Label>
          <Input
            id="reviewerStaffId"
            placeholder="Enter your staff ID"
            {...form.register("reviewerStaffId")}
          />
          {form.formState.errors.reviewerStaffId && (
            <p className="text-sm text-destructive">{form.formState.errors.reviewerStaffId.message}</p>
          )}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="awardId">Award ID</Label>
          <Input
            id="awardId"
            placeholder="Enter award ID"
            {...form.register("awardId")}
          />
          {form.formState.errors.awardId && (
            <p className="text-sm text-destructive">{form.formState.errors.awardId.message}</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="applicantStaffId">Applicant Staff ID</Label>
        <Input
          id="applicantStaffId"
          placeholder="Enter applicant staff ID"
          {...form.register("applicantStaffId")}
        />
        {form.formState.errors.applicantStaffId && (
          <p className="text-sm text-destructive">{form.formState.errors.applicantStaffId.message}</p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="reviewStatus">Review Status</Label>
          <Select onValueChange={(value) => form.setValue("reviewStatus", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
              <SelectItem value="conditional">Conditional Approval</SelectItem>
              <SelectItem value="pending">Pending Review</SelectItem>
            </SelectContent>
          </Select>
          {form.formState.errors.reviewStatus && (
            <p className="text-sm text-destructive">{form.formState.errors.reviewStatus.message}</p>
          )}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="score">Score (1-10)</Label>
          <Input
            id="score"
            type="number"
            min="1"
            max="10"
            placeholder="Enter score"
            {...form.register("score")}
          />
          {form.formState.errors.score && (
            <p className="text-sm text-destructive">{form.formState.errors.score.message}</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="recommendation">Recommendation</Label>
        <Select onValueChange={(value) => form.setValue("recommendation", value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select recommendation" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="strongly-recommend">Strongly Recommend</SelectItem>
            <SelectItem value="recommend">Recommend</SelectItem>
            <SelectItem value="neutral">Neutral</SelectItem>
            <SelectItem value="not-recommend">Do Not Recommend</SelectItem>
            <SelectItem value="strongly-against">Strongly Against</SelectItem>
          </SelectContent>
        </Select>
        {form.formState.errors.recommendation && (
          <p className="text-sm text-destructive">{form.formState.errors.recommendation.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="comments">Review Comments</Label>
        <Textarea
          id="comments"
          placeholder="Enter detailed review comments"
          rows={4}
          {...form.register("comments")}
        />
        {form.formState.errors.comments && (
          <p className="text-sm text-destructive">{form.formState.errors.comments.message}</p>
        )}
      </div>

      <div className="flex gap-2 pt-4">
        <Button type="submit" disabled={isSubmitting} className="flex-1">
          {isSubmitting ? "Submitting..." : "Submit Review"}
        </Button>
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </form>
  );
}