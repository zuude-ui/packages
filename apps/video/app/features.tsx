import { cn } from "@workspace/ui/lib/utils";
import {
  MousePointer,
  Keyboard,
  Smartphone,
  Monitor,
  Globe,
  Palette,
} from "lucide-react";

const initialFeatures = [
  {
    icon: MousePointer,
    title: "Interactive Controls",
    description:
      "Fully customizable controls with hover states, animations, and accessibility features.",
  },
  {
    icon: Keyboard,
    title: "Hotkey Support",
    description:
      "Built-in keyboard shortcuts for play, pause, seek, volume, and fullscreen controls.",
  },
  {
    icon: Smartphone,
    title: "Mobile Optimized",
    description:
      "Touch-friendly controls and responsive design for all device sizes.",
  },
  {
    icon: Monitor,
    title: "Cross Browser",
    description:
      "Works seamlessly across all modern browsers with fallback support.",
  },
  {
    icon: Globe,
    title: "Accessibility",
    description:
      "WCAG compliant with screen reader support and keyboard navigation.",
  },
  {
    icon: Palette,
    title: "Themeable",
    description:
      "Customizable styling with CSS variables and design system integration.",
  },
];

export const Features = () => {
  return (
    <div className="mt-16">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1.5 mb-16">
        {initialFeatures.map((feature) => (
          <div
            key={feature.title}
            className="border rounded-md bg-card p-6 lg:nth-[1]:col-span-2 lg:nth-[4]:col-span-2 lg:nth-[5]:col-span-2"
          >
            <div className="flex items-center gap-3 mb-4">
              <div
                className={cn(
                  "p-2 rounded-lg",
                  feature.title === "Interactive Controls" && "bg-green-500/10",
                  feature.title === "Hotkey Support" && "bg-blue-500/10",
                  feature.title === "Mobile Optimized" && "bg-purple-500/10",
                  feature.title === "Cross Browser" && "bg-orange-500/10",
                  feature.title === "Accessibility" && "bg-pink-500/10",
                  feature.title === "Themeable" && "bg-cyan-500/10"
                )}
              >
                <feature.icon
                  className={cn(
                    "w-5 h-5 text-green-500",
                    feature.title === "Hotkey Support" && "text-blue-500",
                    feature.title === "Mobile Optimized" && "text-purple-500",
                    feature.title === "Cross Browser" && "text-orange-500",
                    feature.title === "Accessibility" && "text-pink-500",
                    feature.title === "Themeable" && "text-cyan-500"
                  )}
                />
              </div>
              <h3 className="text-lg font-semibold leading-[1.25]">
                {feature.title}
              </h3>
            </div>
            <p className="text-sm md:text-base text-muted-foreground">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

//         <div className="border rounded-lg bg-card p-6">
//           <div className="flex items-center gap-3 mb-4">
//             <div className="p-2 rounded-lg bg-green-500/10">
//               <MousePointer className="w-5 h-5 text-green-500" />
//             </div>
//             <h3 className="text-lg font-semibold">Interactive Controls</h3>
//           </div>
//           <p className="text-sm text-muted-foreground">
//             Fully customizable controls with hover states, animations, and
//             accessibility features.
//           </p>
//         </div>

//         <div className="border rounded-lg bg-card p-6">
//           <div className="flex items-center gap-3 mb-4">
//             <div className="p-2 rounded-lg bg-blue-500/10">
//               <Keyboard className="w-5 h-5 text-blue-500" />
//             </div>
//             <h3 className="text-lg font-semibold">Hotkey Support</h3>
//           </div>
//           <p className="text-sm text-muted-foreground">
//             Built-in keyboard shortcuts for play, pause, seek, volume, and
//             fullscreen controls.
//           </p>
//         </div>

//         <div className="border rounded-lg bg-card p-6">
//           <div className="flex items-center gap-3 mb-4">
//             <div className="p-2 rounded-lg bg-purple-500/10">
//               <Smartphone className="w-5 h-5 text-purple-500" />
//             </div>
//             <h3 className="text-lg font-semibold">Mobile Optimized</h3>
//           </div>
//           <p className="text-sm text-muted-foreground">
//             Touch-friendly controls and responsive design for all device sizes.
//           </p>
//         </div>

//         <div className="border rounded-lg bg-card p-6">
//           <div className="flex items-center gap-3 mb-4">
//             <div className="p-2 rounded-lg bg-orange-500/10">
//               <Monitor className="w-5 h-5 text-orange-500" />
//             </div>
//             <h3 className="text-lg font-semibold">Cross Browser</h3>
//           </div>
//           <p className="text-sm text-muted-foreground">
//             Works seamlessly across all modern browsers with fallback support.
//           </p>
//         </div>

//         <div className="border rounded-lg bg-card p-6">
//           <div className="flex items-center gap-3 mb-4">
//             <div className="p-2 rounded-lg bg-pink-500/10">
//               <Globe className="w-5 h-5 text-pink-500" />
//             </div>
//             <h3 className="text-lg font-semibold">Accessibility</h3>
//           </div>
//           <p className="text-sm text-muted-foreground">
//             WCAG compliant with screen reader support and keyboard navigation.
//           </p>
//         </div>

//         <div className="border rounded-lg bg-card p-6">
//           <div className="flex items-center gap-3 mb-4">
//             <div className="p-2 rounded-lg bg-cyan-500/10">
//               <Palette className="w-5 h-5 text-cyan-500" />
//             </div>
//             <h3 className="text-lg font-semibold">Themeable</h3>
//           </div>
//           <p className="text-sm text-muted-foreground">
//             Customizable styling with CSS variables and design system
//             integration.
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };
