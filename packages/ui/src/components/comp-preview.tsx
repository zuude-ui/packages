interface CompPreviewProps {
  children: React.ReactNode;
}

export const CompPreview = ({ children }: CompPreviewProps) => {
  return (
    <div className="border rounded-md p-4 my-14 min-h-96 flex justify-center-safe [&+h2]:mt-0">
      {children}
    </div>
  );
};
