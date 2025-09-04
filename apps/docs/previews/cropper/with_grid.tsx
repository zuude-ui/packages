import { Cropper } from "@zuude-ui/cropper";

const WithGrid = () => {
  return (
    <Cropper
      src="/A_meteor_hit_the_earth.webp"
      className="max-w-sm mx-auto"
      config={{ showGrid: true }}
    />
  );
};

export default WithGrid;
