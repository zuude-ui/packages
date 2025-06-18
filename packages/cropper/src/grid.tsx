interface GridProps {
  active: boolean;
}

export function Grid({ active }: GridProps) {
  return (
    <div
      data-zuude-cropper-grid
      style={{
        opacity: active ? 1 : 0,
      }}
    >
      <div data-zuude-cropper-grid-vertical>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div data-zuude-cropper-grid-horizontal>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}
