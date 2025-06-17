import { Iphone } from "@zuude-ui/ios-mockups";

export default function GradientCanvas() {
  return (
    <Iphone className="![--screen-color:linear-gradient(orange,var(--secondary))]">
      <div className="flex flex-col gap-4 text-black pt-[var(--top-safe-area)] px-4">
        <h1 className="text-2xl font-bold">Hello World</h1>
      </div>
    </Iphone>
  );
}
