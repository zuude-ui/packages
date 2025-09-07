import {
  Facebook,
  Google,
  Instagram,
  LinkedIn,
  X,
  YouTube,
  Apple,
  Snapchat,
  Pinterest,
  Medium,
  Github,
  Threads,
  WhatsApp,
  Figma,
  Dribbble,
  Reddit,
  Discord,
  TikTok,
  Telegram,
  Bluesky,
  Spotify,
  Twitch,
  Messenger,
} from "@zuude-ui/icons/social-media";

export default function Showcase() {
  return (
    <div className="flex gap-4 flex-col">
      <div className="grid grid-cols-8 gap-8 p-8">
        <Facebook variant="branded" />
        <X variant="branded" />
        <Instagram variant="branded" />
        <LinkedIn variant="branded" />
        <Google variant="branded" />
        <YouTube variant="branded" />
        <Apple variant="branded" />
        <Snapchat variant="branded" fill="red" />
        <Pinterest variant="branded" />
        <Medium variant="branded" />
        <Github variant="branded" />
        <Threads variant="branded" />
        <WhatsApp variant="branded" />
        <Figma variant="branded" />
        <Dribbble variant="branded" />
        <Reddit variant="branded" />
        <Discord variant="branded" />
        <TikTok variant="branded" />
        <Telegram variant="branded" />
        <Bluesky variant="branded" />
        <Spotify variant="branded" />
        <Twitch variant="branded" />
        <Messenger variant="branded" />
      </div>
      <div className="grid grid-cols-8 gap-8 p-8 rounded-xl bg-foreground text-background">
        <Facebook />
        <X />
        <Instagram />
        <LinkedIn />
        <Google />
        <YouTube />
        <Apple />
        <Snapchat />
        <Pinterest />
        <Medium />
        <Github />
        <Threads />
        <WhatsApp />
        <Figma />
        <Dribbble />
        <Reddit />
        <Discord />
        <TikTok />
        <Telegram />
        <Bluesky />
        <Spotify />
        <Twitch />
        <Messenger />
      </div>
    </div>
  );
}
