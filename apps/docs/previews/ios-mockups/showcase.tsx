import { useState } from "react";
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
              style={{ background: colorsList[`--${c}`] }}
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
