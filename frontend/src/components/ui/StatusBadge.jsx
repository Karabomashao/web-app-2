import { Badge } from "@/components/ui/badge";

export function StatusBadge({ status, className }) {
  const getStatusConfig = (status) => {
    const configs = {
      draft: { label: "Draft", color: "bg-gray-100 text-gray-800" },
      submitted: { label: "Submitted", color: "bg-blue-100 text-blue-800" },
      "under-review": { label: "Under Review", color: "bg-yellow-100 text-yellow-800" },
      approved: { label: "Approved", color: "bg-green-100 text-green-800" },
      conditions: { label: "Conditions", color: "bg-orange-100 text-orange-800" },
      "tranche-1": { label: "Tranche 1", color: "bg-purple-100 text-purple-800" },
      "tranche-2": { label: "Tranche 2", color: "bg-purple-100 text-purple-800" },
      disbursed: { label: "Disbursed", color: "bg-green-100 text-green-800" },
      overdue: { label: "Overdue", color: "bg-red-100 text-red-800" },
      closed: { label: "Closed", color: "bg-gray-100 text-gray-800" },
      active: { label: "Active", color: "bg-green-100 text-green-800" },
      pending: { label: "Pending", color: "bg-yellow-100 text-yellow-800" },
      complete: { label: "Complete", color: "bg-green-100 text-green-800" },
      rejected: { label: "Rejected", color: "bg-red-100 text-red-800" },
    };

    return configs[status] || configs.draft;
  };

  const config = getStatusConfig(status);

  return (
    <Badge className={`${config.color} ${className || ""}`} variant="secondary">
      {config.label}
    </Badge>
  );
}