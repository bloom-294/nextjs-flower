export const RequiredBadge = ({ label = "必須" }: { label?: string }) => {
  return (
    <span className="ml-2 rounded-md bg-red-600 p-1 text-xs text-white" data-testid="badge-label">
      {label}
    </span>
  );
};
