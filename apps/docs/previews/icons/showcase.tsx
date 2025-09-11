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
      <div className="grid grid-cols-8 gap-8 p-8">
        <Facebook variant="filled-branded" className="rounded-sm" />
        <X variant="filled-branded" className="rounded-sm" />
        <Instagram variant="filled-branded" className="rounded-sm" />
        <LinkedIn variant="filled-branded" className="rounded-sm" />
        <Google variant="filled-branded" className="rounded-sm" />
        <YouTube variant="filled-branded" className="rounded-sm" />
        <Apple variant="filled-branded" className="rounded-sm" />
        <Snapchat variant="filled-branded" fill="red" className="rounded-sm" />
        <Pinterest variant="filled-branded" className="rounded-sm" />
        <Medium variant="filled-branded" className="rounded-sm" />
        <Github variant="filled-branded" className="rounded-sm" />
        <Threads variant="filled-branded" className="rounded-sm" />
        <WhatsApp variant="filled-branded" className="rounded-sm" />
        <Figma variant="filled-branded" className="rounded-sm" />
        <Dribbble variant="filled-branded" className="rounded-sm" />
        <Reddit variant="filled-branded" className="rounded-sm" />
        <Discord variant="filled-branded" className="rounded-sm" />
        <TikTok variant="filled-branded" className="rounded-sm" />
        <Telegram variant="filled-branded" className="rounded-sm" />
        <Bluesky variant="filled-branded" className="rounded-sm" />
        <Spotify variant="filled-branded" className="rounded-sm" />
        <Twitch variant="filled-branded" className="rounded-sm" />
        <Messenger variant="filled-branded" className="rounded-sm" />
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
