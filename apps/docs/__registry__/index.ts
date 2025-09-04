import dynamic from "next/dynamic";
import type { GenericComponent } from "@workspace/ui/types";

export const cropperVariants: Record<string, GenericComponent> = {
  basic: {
    name: "basic",
    component: dynamic(() => import("../previews/cropper/basic"), {
      ssr: false,
    }),
    code: `import { Cropper } from "@zuude-ui/cropper";

const Basic = () => {
  return (
    <Cropper src="/A_meteor_hit_the_earth.webp" className="max-w-sm mx-auto" />
  );
};

export default Basic;
`,
  },
  custom_grid: {
    name: "custom_grid",
    component: dynamic(() => import("../previews/cropper/custom_grid"), {
      ssr: false,
    }),
    code: `import { Cropper } from "@zuude-ui/cropper";

const CustomGrid = () => {
  return (
    <Cropper
      src="/A_meteor_hit_the_earth.webp"
      className="max-w-sm mx-auto outline-0"
    >
      {({ isDragging, isPinching }) => (
        <div className="absolute inset-0 pointer-events-none">
          <div
            className={\`absolute left-1/2 -translate-x-1/2 w-px h-full bg-red-500 \${isDragging || isPinching ? "opacity-100" : "opacity-0"} transition-opacity\`}
          />
          <div
            className={\`absolute top-1/2 -translate-y-1/2 w-full h-px bg-red-500 \${isDragging || isPinching ? "opacity-100" : "opacity-0"} transition-opacity\`}
          />
        </div>
      )}
    </Cropper>
  );
};

export default CustomGrid;
`,
  },
  showcase: {
    name: "showcase",
    component: dynamic(() => import("../previews/cropper/showcase"), {
      ssr: false,
    }),
    code: `import { useState } from "react";
import { type Crop, Cropper, useCropper } from "@zuude-ui/cropper";

import { Button } from "@workspace/ui/components/button";
import { cn } from "@workspace/ui/lib/utils";

const Showcase = () => {
  const [crop, setCrop] = useState<Crop>({ x: 0, y: 0, scale: 1 });
  const [image, setImage] = useState<string | null>(null);

  const [ref, { cropIt, reset, isCropping }] = useCropper({
    quality: 10,
    onSuccess: (image) => {
      console.log("onSuccess", image);
      setImage(image);
    },
    onError: (error) => {
      window.alert(error.message);
    },
  });

  return (
    <div className="space-y-8">
      <div
        className={cn(
          "gap-4 flex mt-12 w-full items-center justify-center",
          image && "grid grid-cols-2"
        )}
      >
        <Cropper
          ref={ref}
          src={"/A_meteor_hit_the_earth.webp"}
          crop={crop}
          onCropChange={setCrop}
          className="aspect-square w-full !max-w-96 overflow-hidden bg-muted"
          config={{
            showGrid: true,
            showBehindImage: {
              position: "fixed",
            },
          }}
        />
        {image && (
          <img
            key={image}
            src={image}
            alt="Cropped image"
            className="max-w-96 aspect-square w-full h-full object-cover motion-opacity-in-0"
          />
        )}
      </div>

      <div className="flex gap-4 justify-center">
        <Button variant={"outline"} onClick={reset}>
          Reset
        </Button>
        <Button onClick={cropIt} className="text-background">
          {isCropping ? "Cropping..." : "Crop"}
        </Button>
      </div>
    </div>
  );
};

export default Showcase;
`,
  },
  with_grid: {
    name: "with_grid",
    component: dynamic(() => import("../previews/cropper/with_grid"), {
      ssr: false,
    }),
    code: `import { Cropper } from "@zuude-ui/cropper";

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
`,
  },
};

export const iosmockupsVariants: Record<string, GenericComponent> = {
  dialog: {
    name: "dialog",
    component: dynamic(() => import("../previews/ios-mockups/dialog"), {
      ssr: false,
    }),
    code: `import { useState } from "react";
import { Button } from "@workspace/ui/components/button";
import { Iphone } from "@zuude-ui/ios-mockups";
import { AnimatePresence, motion } from "motion/react";

export default function Dialog() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Iphone className="shrink-0 ![--screen-color:var(--background)]">
      <div className="flex h-full items-center justify-center">
        <Button onClick={() => setIsOpen(true)} className="bg-red-500">
          Delete profile
        </Button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              className="bg-background/50 absolute inset-0 z-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              className="absolute right-0 bottom-0 left-0 z-40 flex items-center justify-center p-4 pb-[calc(var(--bottom-safe-area)+0.5rem)]"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ duration: 0.5, type: "spring", bounce: 0 }}
            >
              <div className="w-full rounded-4xl border bg-white p-8 pb-4 text-black">
                <h3 className="text-2xl font-bold">Delete profile</h3>
                <p className="mt-2">
                  Are you sure you want to delete your profile? This action
                  cannot be undone.
                </p>
                <div className="mt-7 grid grid-cols-2 gap-2">
                  <Button
                    size={"lg"}
                    className="text-background"
                    onClick={() => setIsOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    className="bg-red-500"
                    size={"lg"}
                    onClick={() => setIsOpen(false)}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </Iphone>
  );
}
`,
  },
  "gradient-canvas": {
    name: "gradient-canvas",
    component: dynamic(
      () => import("../previews/ios-mockups/gradient-canvas"),
      {
        ssr: false,
      },
    ),
    code: `import { Iphone } from "@zuude-ui/ios-mockups";

export default function GradientCanvas() {
  return (
    <Iphone className="![--screen-color:linear-gradient(orange,var(--secondary))]">
      <div className="flex flex-col gap-4 text-black pt-[var(--top-safe-area)] px-4">
        <h1 className="text-2xl font-bold">Hello World</h1>
      </div>
    </Iphone>
  );
}
`,
  },
  image: {
    name: "image",
    component: dynamic(() => import("../previews/ios-mockups/image"), {
      ssr: false,
    }),
    code: `import { testImage } from "@workspace/ui/lib/utils";
import { Iphone } from "@zuude-ui/ios-mockups";

export default function Image() {
  return (
    <Iphone>
      <img src={testImage} className="h-full w-full object-cover" />
    </Iphone>
  );
}
`,
  },
  showcase: {
    name: "showcase",
    component: dynamic(() => import("../previews/ios-mockups/showcase"), {
      ssr: false,
    }),
    code: `import { useState } from "react";
import {
  Iphone,
  type IphoneColor,
  colors as colorsList,
} from "@zuude-ui/ios-mockups";

import { Button } from "@workspace/ui/components/button";
import { cn, testImage } from "@workspace/ui/lib/utils";
import { Checkbox } from "@workspace/ui/components/checkbox";
import { Label } from "@workspace/ui/components/label";

const colors: IphoneColor[] = [
  "natural-titanium",
  "blue-titanium",
  "white-titanium",
  "black-titanium",
  "blue",
  "pink",
  "yellow",
  "green",
  "black",
];

const Showcase = () => {
  const [color, setColor] = useState<IphoneColor>("natural-titanium");
  const [activate, setActivate] = useState({
    topPadding: false,
    bottomPadding: false,
    blur: false,
  });

  return (
    <>
      <div className="flex mt-8 flex-wrap justify-center max-w-48">
        {colors.map((c) => (
          <Button
            key={c}
            variant={c === color ? "default" : "ghost"}
            size={"icon"}
            onClick={() => setColor(c)}
            className="capitalize"
          >
            <span
              className="size-4 rounded-4xl"
              style={{ background: colorsList[\`--\${c}\`] }}
            ></span>
          </Button>
        ))}
      </div>
      <div className="flex my-8 gap-4">
        <Label>
          <Checkbox
            checked={activate.topPadding}
            onCheckedChange={() =>
              setActivate({ ...activate, topPadding: !activate.topPadding })
            }
          />
          <span>Top Padding</span>
        </Label>
        <Label>
          <Checkbox
            checked={activate.bottomPadding}
            onCheckedChange={() =>
              setActivate({
                ...activate,
                bottomPadding: !activate.bottomPadding,
              })
            }
          />
          <span>Bottom Padding</span>
        </Label>
      </div>
      <div className="flex gap-8">
        <Iphone
          color={color}
          buttonHandlers={{
            action: () => window.alert("Action"),
            volumeUp: () => window.alert("Volume Up"),
            volumeDown: () => window.alert("Volume Down"),
            power: () => window.alert("Power"),
          }}
          style={
            {
              "--screen-color": "var(--muted)",
              "--dynamic-island-color": "black",
            } as React.CSSProperties
          }
        >
          <div
            className={cn(
              "transition-all duration-300",
              activate.topPadding && "pt-[var(--top-safe-area)]",
              activate.bottomPadding && "pb-[var(--bottom-safe-area)]"
            )}
          >
            <img src={testImage} alt="iOS Mockups" className="w-full" />
            <div className="p-4">
              <h1 className="text-2xl font-bold">Iphone Mockup</h1>
              <p className="text-sm text-muted-foreground">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis
                ut nesciunt, cum porro suscipit deleniti perferendis magni.
                Excepturi cupiditate tempore quibusdam corrupti nemo
                necessitatibus, vel, eligendi odio cum fugit fuga?
              </p>
              <Button className="my-4 text-background">Explore</Button>
              <p className="text-sm text-muted-foreground">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Libero
                nam consequuntur praesentium expedita impedit possimus dolorum
                odio debitis veniam saepe, officia, fugit distinctio sit qui? Ea
                labore illo perferendis quia? Labore tempore voluptatibus
                doloribus eos mollitia sed qui natus repellendus, inventore
                animi architecto itaque assumenda in! Veniam architecto, sint
                modi natus saepe quis, quidem neque maiores aspernatur quam est?
                Illo? Corrupti, voluptatum nobis saepe eligendi architecto
                laboriosam temporibus, porro, ipsa velit error natus alias
                necessitatibus magni illo in! Aliquid impedit blanditiis rem nam
                amet provident quis tenetur ratione vitae cum. Delectus sed nam
                vel, culpa ducimus sunt dolorum ratione, natus eligendi facere
                odit repellendus, nostrum adipisci tempore! Nemo neque
                reprehenderit veniam, molestias, eum ullam vel placeat repellat
                excepturi labore vero. Voluptates officia nemo odit similique
                nihil praesentium delectus, illum distinctio culpa unde, optio
                repellendus sequi amet quo atque quia vel quas? Assumenda eaque
                dolore, ipsum doloribus optio quae id sunt? Tempora mollitia
                quae ab cum. Inventore voluptatem a, doloribus quidem sunt porro
                enim sed at quos doloremque ea quis eligendi magni modi impedit.
                Consequuntur soluta distinctio vero nam dicta eveniet. Libero
                quis aliquid ullam, reprehenderit iste perspiciatis possimus
                eaque ad ipsum porro cupiditate. Ipsam sapiente soluta
                temporibus! At reiciendis aperiam explicabo iusto alias ipsam
                repellendus dolores, culpa veniam non corrupti! Iusto ratione
                eveniet iure tempore quis magni illum dolores animi sed est
                obcaecati adipisci, mollitia ipsa, explicabo quod nemo officia!
                Aspernatur recusandae pariatur voluptatibus alias rerum dolore
                nemo dolores voluptas. Nam sequi minus aut quos! Minus, et?
                Quidem id omnis quo exercitationem similique excepturi, atque
                qui? Placeat inventore impedit quaerat delectus, facere,
                eligendi debitis dicta et voluptatibus beatae officiis velit? Ex
                quibusdam tempore vitae, rem eveniet eos? Consequatur, nobis
                saepe ipsa repellat ducimus error vitae quia, at inventore culpa
                et, ipsam itaque aliquam nihil accusamus. Consequatur eius neque
                ipsa fugit. Adipisci eius dignissimos sint, incidunt veniam,
                aspernatur rerum saepe magni perspiciatis dolores nisi aut
                magnam qui ipsa iure laboriosam nobis culpa, voluptatem
                reprehenderit consectetur sequi tenetur vel aperiam. Veniam,
                cum. Perspiciatis eligendi est illum quia, incidunt, officiis
                reprehenderit, architecto molestiae voluptatibus ratione maxime
                iusto quae laboriosam minima amet similique? Sed hic facilis a
                unde quos pariatur architecto expedita nostrum debitis? Vel,
                ratione cupiditate doloribus harum ipsa dolores in nisi natus
                nulla non quia officiis alias. Deserunt, nostrum officiis!
                Molestiae officiis odit, nulla culpa assumenda maiores? Autem
                iure eius omnis reprehenderit! Perspiciatis tempore ab
                voluptatem, vel eos fugit ullam pariatur blanditiis ipsa maiores
                nisi repellat est tempora, reprehenderit nihil facere soluta sed
                sit sequi recusandae iusto et fuga quod. Consectetur, repellat.
                Obcaecati possimus laboriosam facilis praesentium ipsa
                asperiores quaerat pariatur modi illum eligendi, eveniet et odit
                laudantium facere similique sequi quia sunt aut nihil, minima
                itaque dolore nesciunt numquam quis! Esse? Atque, quam non et
                sequi labore neque, illum sint, perferendis aut distinctio eum
                quidem voluptates quis asperiores temporibus natus. Aut
                consequuntur a incidunt iste. Dolore, non. Cum ex possimus
                corporis? Culpa veniam quidem autem consequatur nobis sunt iusto
                libero fugiat totam nesciunt illum molestiae perferendis nihil
                vitae ipsa rerum laboriosam, harum porro quis, rem excepturi
                alias! Neque consequuntur itaque similique. Ad quibusdam libero
                dignissimos provident voluptate ipsam iusto. Autem, labore? Id
                reprehenderit sed tempore velit quidem necessitatibus nisi
                eveniet, corporis inventore animi harum blanditiis nam sit
                recusandae ducimus excepturi! Aspernatur. Incidunt, ipsam, cum
                perspiciatis optio aspernatur natus cupiditate nostrum unde
                illum quos ullam laboriosam excepturi, nesciunt aut laborum!
                Culpa ratione mollitia amet eos iusto itaque voluptates
                molestias saepe, deleniti tempore. Rerum error exercitationem
                blanditiis a consequuntur quae corrupti, quaerat, nam possimus
                sed autem tempore doloribus dolores quasi maiores odit sint
                expedita atque velit, sapiente dolor debitis fugiat hic. Earum,
                harum.
              </p>
            </div>
          </div>
        </Iphone>
      </div>
    </>
  );
};

export default Showcase;
`,
  },
  texts: {
    name: "texts",
    component: dynamic(() => import("../previews/ios-mockups/texts"), {
      ssr: false,
    }),
    code: `import { Iphone } from "@zuude-ui/ios-mockups";

export default function Texts() {
  return (
    <Iphone className="![--screen-color:white]">
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
`,
  },
};

export const videoVariants: Record<string, GenericComponent> = {
  "format-duration": {
    name: "format-duration",
    component: dynamic(() => import("../previews/video/format-duration"), {
      ssr: false,
    }),
    code: `import { useRef } from "react";
import {
  formatTime,
  humanizeTime,
  compactTime,
  detailedTime,
  parseTime,
  timeRemaining,
  formatTimeWithPercentage,
  getTimeSegments,
  formatTimeForAccessibility,
} from "@zuude-ui/video/utils";
import {
  usePlayPause,
  useCurrentTime,
  useGetDuration,
} from "@zuude-ui/video/hooks";

const FormatDuration = () => {
  // Video player refs and state
  const videoRef = useRef<HTMLVideoElement>(null);
  const { togglePlay } = usePlayPause(videoRef);
  const { currentTime } = useCurrentTime(videoRef);
  const { duration } = useGetDuration(videoRef);

  return (
    <div className="space-y-6">
      {/* Video Player with Live Data */}
      <p className="text-lg font-semibold mb-4">Live Video Player</p>
      <div className="space-y-4">
        {/* Video Player */}
        <video
          ref={videoRef}
          src="https://personal-work-ali.s3.us-west-2.amazonaws.com/Transform+Your+Drone+Footage+%23OsmoAction5Pro+%2B+FPV+Cinematic+Editing+%E2%9C%A8%F0%9F%9A%80.mp4"
          className="w-full aspect-video object-cover rounded"
          muted
          onClick={togglePlay}
          loop
        />

        {/* Live Time Display */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 p-3 bg-muted rounded">
          <div className="text-center">
            <p className="text-xs ">Current</p>
            <p className="font-mono text-muted-foreground text-sm">
              {formatTime(currentTime)}
            </p>
          </div>
          <div className="text-center">
            <p className="text-xs ">Duration</p>
            <p className="font-mono text-muted-foreground text-sm">
              {formatTime(duration || 0)}
            </p>
          </div>
          <div className="text-center">
            <p className="text-xs ">Remaining</p>
            <p className="font-mono text-muted-foreground text-sm">
              {timeRemaining(currentTime, duration || 0)}
            </p>
          </div>
          <div className="text-center">
            <p className="text-xs ">Progress</p>
            <p className="font-mono text-muted-foreground text-sm">
              {formatTimeWithPercentage(currentTime, duration || 0)}
            </p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-1">
          <div className="flex justify-between text-xs">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration || 0)}</span>
          </div>
          <div className="w-full bg-muted rounded-full h-1">
            <div
              className="bg-primary h-1 rounded-full transition-all duration-100"
              style={{
                width: \`\${duration ? (currentTime / duration) * 100 : 0}%\`,
              }}
            />
          </div>
        </div>
      </div>

      {/* Utility Functions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Basic Formatting */}
        <div className="p-3 bg-background rounded-lg shadow">
          <h4 className="font-medium mb-2 text-sm">Basic Formatting</h4>
          <div className="space-y-1 text-xs">
            <div>
              <span className="">Default:</span>
              <span className="font-mono text-muted-foreground ml-1">
                {formatTime(currentTime)}
              </span>
            </div>
            <div>
              <span className="">Hours:</span>
              <span className="font-mono text-muted-foreground ml-1">
                {formatTime(currentTime, "h:mm:ss")}
              </span>
            </div>
            <div>
              <span className="">Seconds:</span>
              <span className="font-mono text-muted-foreground ml-1">
                {formatTime(currentTime, "ss")}
              </span>
            </div>
            <div>
              <span className="">Human:</span>
              <span className="font-mono text-muted-foreground ml-1">
                {formatTime(currentTime, "human")}
              </span>
            </div>
          </div>
        </div>

        {/* Human Readable */}
        <div className="p-3 bg-background rounded-lg shadow">
          <h4 className="font-medium mb-2 text-sm">Human Readable</h4>
          <div className="space-y-1 text-xs">
            <div>
              <span className="">Full:</span>
              <span className="font-mono text-muted-foreground ml-1">
                {humanizeTime(currentTime)}
              </span>
            </div>
            <div>
              <span className="">Compact:</span>
              <span className="font-mono text-muted-foreground ml-1">
                {humanizeTime(currentTime, { compact: true })}
              </span>
            </div>
            <div>
              <span className="">Accessibility:</span>
              <span className="font-mono text-muted-foreground ml-1">
                {formatTimeForAccessibility(currentTime)}
              </span>
            </div>
          </div>
        </div>

        {/* Compact & Detailed */}
        <div className="p-3 bg-background rounded-lg shadow">
          <h4 className="font-medium mb-2 text-sm">Compact & Detailed</h4>
          <div className="space-y-1 text-xs">
            <div>
              <span className="">Compact:</span>
              <span className="font-mono text-muted-foreground ml-1">
                {compactTime(currentTime)}
              </span>
            </div>
            <div>
              <span className="">Detailed:</span>
              <span className="font-mono text-muted-foreground ml-1">
                {detailedTime(currentTime)}
              </span>
            </div>
            <div>
              <span className="">With ms:</span>
              <span className="font-mono text-muted-foreground ml-1">
                {detailedTime(currentTime, { showMilliseconds: true })}
              </span>
            </div>
          </div>
        </div>

        {/* Time Calculations */}
        <div className="p-3 bg-background rounded-lg shadow">
          <h4 className="font-medium mb-2 text-sm">Time Calculations</h4>
          <div className="space-y-1 text-xs">
            <div>
              <span className="">Remaining:</span>
              <span className="font-mono text-muted-foreground ml-1">
                {timeRemaining(currentTime, duration || 0)}
              </span>
            </div>
            <div>
              <span className="">Remaining (human):</span>
              <span className="font-mono text-muted-foreground ml-1">
                {timeRemaining(currentTime, duration || 0, "human")}
              </span>
            </div>
            <div>
              <span className="">Progress:</span>
              <span className="font-mono text-muted-foreground ml-1">
                {formatTimeWithPercentage(currentTime, duration || 0)}
              </span>
            </div>
          </div>
        </div>

        {/* Time Parsing Examples */}
        <div className="p-3 bg-background rounded-lg shadow">
          <h4 className="font-medium mb-2 text-sm">Time Parsing</h4>
          <div className="space-y-1 text-xs">
            <div>
              <span className="">"2:30":</span>
              <span className="font-mono text-muted-foreground ml-1">
                {parseTime("2:30")}s
              </span>
            </div>
            <div>
              <span className="">"1:23:45":</span>
              <span className="font-mono text-muted-foreground ml-1">
                {parseTime("1:23:45")}s
              </span>
            </div>
            <div>
              <span className="">"90s":</span>
              <span className="font-mono text-muted-foreground ml-1">
                {parseTime("90s")}s
              </span>
            </div>
            <div>
              <span className="">"1.5m":</span>
              <span className="font-mono text-muted-foreground ml-1">
                {parseTime("1.5m")}s
              </span>
            </div>
          </div>
        </div>

        {/* Time Segments */}
        <div className="p-3 bg-background rounded-lg shadow">
          <h4 className="font-medium mb-2 text-sm">Time Segments</h4>
          <div className="space-y-2">
            <p className="text-xs ">5 segments for current duration:</p>
            <div className="flex flex-wrap gap-1">
              {getTimeSegments(duration || 0, 5).map((time, i) => (
                <span
                  key={i}
                  className="px-1 py-0.5 bg-muted rounded text-xs font-mono text-muted-foreground"
                >
                  {formatTime(time, "mm:ss")}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Static Examples for Reference */}
      <div className="p-3 bg-muted rounded-lg">
        <h4 className="font-medium mb-2 text-sm">
          Static Examples (for reference)
        </h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
          <div>
            <span className="">125.5s:</span>
            <span className="font-mono text-muted-foreground ml-1">
              {formatTime(125.5)}
            </span>
          </div>
          <div>
            <span className="">3600s:</span>
            <span className="font-mono text-muted-foreground ml-1">
              {formatTime(3600)}
            </span>
          </div>
          <div>
            <span className="">7325s:</span>
            <span className="font-mono text-muted-foreground ml-1">
              {formatTime(7325)}
            </span>
          </div>
          <div>
            <span className="">Human 125.5s:</span>
            <span className="font-mono text-muted-foreground ml-1">
              {humanizeTime(125.5)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormatDuration;
`,
  },
  showcase: {
    name: "showcase",
    component: dynamic(() => import("../previews/video/showcase"), {
      ssr: false,
    }),
    code: `import * as SliderPrimitive from "@radix-ui/react-slider";

import {
  Video,
  VideoProvider,
  Pause,
  Play,
  Mute,
  Unmute,
  SeekForward,
  SeekBackward,
  Controls,
  Fullscreen,
  ExitFullscreen,
  Loading,
  PictureInPicture,
  Download,
} from "@zuude-ui/video";
import {
  useGetDuration,
  useCurrentTime,
  useVideoState,
  useSpeed,
} from "@zuude-ui/video/hooks";
import { formatTime } from "@zuude-ui/video/utils";
import { useRef, memo } from "react";
import { cn } from "@workspace/ui/lib/utils";
import { Button } from "@workspace/ui/components/button";
import { Badge } from "@workspace/ui/components/badge";
import {
  Play as PlayIcon,
  Pause as PauseIcon,
  Volume2,
  VolumeX,
  SkipForward,
  SkipBack,
  Maximize,
  Minimize,
  PictureInPicture as PipIcon,
  Download as DownloadIcon,
  Clock,
  Zap,
  Sparkles,
} from "lucide-react";
import { VideoRef } from "@zuude-ui/video";

const Showcase = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const { duration } = useGetDuration(videoRef);
  const { currentTime } = useCurrentTime(videoRef);
  const { isPlaying, isMuted, isFullscreen } = useVideoState(videoRef);
  const { speed } = useSpeed(videoRef);

  return (
    <div>
      <div className="p-6 pb-4">
        <div className="flex items-center justify-between">
          <h3 className="flex items-center !mt-0 gap-2 text-lg font-semibold">
            Video Player
          </h3>
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="flex items-center gap-1">
              <Zap className="w-3 h-3" />
              {speed}x
            </Badge>
            <Badge variant="outline" className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {formatTime(currentTime)} / {formatTime(duration || 0)}
            </Badge>
          </div>
        </div>
      </div>
      <div className="p-0">
        <VideoProvider
          onError={(error) => console.log(error)}
          className="relative w-full flex justify-center items-center"
        >
          <Video
            ref={videoRef}
            src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
            className="aspect-[16/9] w-full object-cover !my-0"
            controls
            loop
          />

          {/* Overlay content */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* Top overlay */}
            <div
              data-zuude-hide-elements
              className={cn(
                "absolute top-0 isolate left-0 text-white py-4 right-0 p-4 gap-4",
                "data-[hidden=true]:opacity-0 data-[hidden=true]:pointer-events-none data-[hidden=true]:-translate-y-full duration-300"
              )}
            >
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black/50 to-transparent -z-10"></div>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-white">Big Buck Bunny</h3>
                  <p className="text-sm opacity-80">A short animated film</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge
                    variant="secondary"
                    className="bg-white/20 text-white border-white/20"
                  >
                    <Sparkles className="w-3 h-3 mr-1" />
                    Demo
                  </Badge>
                </div>
              </div>
            </div>

            {/* Controls */}
            <Controls className="absolute pointer-events-auto px-4 isolate bottom-0 left-0 text-white flex-wrap py-4 items-center right-0 flex justify-center gap-2 data-[hidden=true]:opacity-0 data-[hidden=true]:pointer-events-none data-[hidden=true]:translate-y-full duration-300">
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black/50 to-transparent -z-10"></div>
              <Timeline videoRef={videoRef} />

              {/* Control buttons */}
              <div className="flex items-center gap-1">
                <Button variant="ghost" size="icon" asChild>
                  <SeekBackward>
                    <SkipBack className="w-4 h-4" />
                  </SeekBackward>
                </Button>

                <Button variant="ghost" size="icon" asChild>
                  {isPlaying ? (
                    <Pause>
                      <PauseIcon className="w-4 h-4" />
                    </Pause>
                  ) : (
                    <Play>
                      <PlayIcon className="w-4 h-4" />
                    </Play>
                  )}
                </Button>

                <Button variant="ghost" size="icon" asChild>
                  <SeekForward>
                    <SkipForward className="w-4 h-4" />
                  </SeekForward>
                </Button>
              </div>

              <div className="flex items-center gap-1">
                <Button variant="ghost" size="icon" asChild>
                  {isMuted ? (
                    <Unmute>
                      <VolumeX className="w-4 h-4" />
                    </Unmute>
                  ) : (
                    <Mute>
                      <Volume2 className="w-4 h-4" />
                    </Mute>
                  )}
                </Button>

                <Button variant="ghost" size="icon" asChild>
                  <PictureInPicture>
                    <PipIcon className="w-4 h-4" />
                  </PictureInPicture>
                </Button>

                <Button variant="ghost" size="icon" asChild>
                  <Download>
                    <DownloadIcon className="w-4 h-4" />
                  </Download>
                </Button>

                <Button variant="ghost" size="icon" asChild>
                  {isFullscreen ? (
                    <ExitFullscreen>
                      <Minimize className="w-4 h-4" />
                    </ExitFullscreen>
                  ) : (
                    <Fullscreen>
                      <Maximize className="w-4 h-4" />
                    </Fullscreen>
                  )}
                </Button>
              </div>
            </Controls>

            {/* Loading state */}
            <Loading className="absolute top-0 left-0 w-full h-full duration-300 bg-black/50 flex items-center opacity-0 justify-center data-[loading=true]:opacity-100">
              <div className="flex items-center gap-2 text-white">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                Loading...
              </div>
            </Loading>
          </div>
        </VideoProvider>
      </div>
    </div>
  );
};

interface TimelineProps {
  videoRef: VideoRef;
}

const Timeline = memo(({ videoRef }: TimelineProps) => {
  const { currentTime, onTimeUpdate } = useCurrentTime(videoRef);
  const { duration } = useGetDuration(videoRef);

  return (
    <SliderPrimitive.Root
      data-slot="slider"
      value={[currentTime]}
      min={0}
      max={duration || 0}
      className="relative flex w-full touch-none items-center select-none data-[disabled]:opacity-50 data-[orientation=vertical]:h-full data-[orientation=vertical]:min-h-44 data-[orientation=vertical]:w-auto data-[orientation=vertical]:flex-col"
      onValueChange={(value) => {
        onTimeUpdate(value[0] || 0);
      }}
    >
      <SliderPrimitive.Track
        data-slot="slider-track"
        className={cn(
          "bg-white/30 relative grow overflow-hidden rounded-full data-[orientation=horizontal]:h-1.5 data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-1.5"
        )}
      >
        <SliderPrimitive.Range
          data-slot="slider-range"
          className={cn(
            "bg-white absolute data-[orientation=horizontal]:h-full data-[orientation=vertical]:w-full"
          )}
        />
      </SliderPrimitive.Track>
      {Array.from({ length: 1 }, (_, index) => (
        <SliderPrimitive.Thumb
          data-slot="slider-thumb"
          key={index}
          className="border-primary bg-background ring-ring/50 block h-4 w-1.5 shrink-0 rounded-[2px] shadow-sm transition-[color,box-shadow] hover:ring-4 focus-visible:ring-4 focus-visible:outline-hidden disabled:pointer-events-none disabled:opacity-50"
        />
      ))}
    </SliderPrimitive.Root>
  );
});

export default Showcase;
`,
  },
};
