interface CompPreviewProps {
  name: string;
}

export const CompPreview = ({ name }: CompPreviewProps) => {
  return <div className="border rounded-md p-4 my-20 min-h-96"></div>;
};
