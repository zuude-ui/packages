import { Iphone } from "@zuude-ui/ios-mockups";

export default function Texts() {
  return (
    <Iphone className="[--canvas-color:white]">
      <div className="flex flex-col gap-4 text-black pt-[var(--top-safe-area)] px-4">
        <h1 className="text-2xl font-bold">Hello World</h1>
        <p className="text-sm">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem illum
          doloribus minus fuga. Iusto deleniti, eligendi non dolor minima
          ratione nam maxime cumque libero perferendis odio possimus
          exercitationem sed alias!
        </p>
      </div>
    </Iphone>
  );
}
