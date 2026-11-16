import type { SVGProps } from "react";
import type { ServiceIcon } from "@/lib/sanity/types";

type IconProps = SVGProps<SVGSVGElement>;

function Base({ children, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      {children}
    </svg>
  );
}

export const PhoneDeviceIcon = (p: IconProps) => (
  <Base {...p}><rect x="7" y="2.5" width="10" height="19" rx="2.2" /><path d="M11 18.5h2" /></Base>
);
export const TabletIcon = (p: IconProps) => (
  <Base {...p}><rect x="4.5" y="2.5" width="15" height="19" rx="2.2" /><path d="M11 18.5h2" /></Base>
);
export const LaptopIcon = (p: IconProps) => (
  <Base {...p}><rect x="4.5" y="5" width="15" height="10.5" rx="1.5" /><path d="M2.5 19h19l-1.6-3.5H4.1L2.5 19Z" /></Base>
);
export const DesktopIcon = (p: IconProps) => (
  <Base {...p}><rect x="3" y="4" width="18" height="12" rx="1.8" /><path d="M9 20h6M12 16v4" /></Base>
);
export const ConsoleIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M7.5 7h9a5 5 0 0 1 4.9 4l.9 4.6a2.4 2.4 0 0 1-4.2 2L16 15.5H8l-2.1 2.1a2.4 2.4 0 0 1-4.2-2L2.6 11a5 5 0 0 1 4.9-4Z" />
    <path d="M7 10v3M5.5 11.5h3M15.5 10.5h.01M17.5 12.5h.01" />
  </Base>
);
export const ToolsIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M14.5 6.5a4 4 0 0 0-5.3 5.3l-5.6 5.6a1.6 1.6 0 0 0 2.3 2.3l5.6-5.6a4 4 0 0 0 5.3-5.3l-2.4 2.4-2.1-.6-.6-2.1 2.8-2Z" />
    <path d="m15 15 4.5 4.5M19 4l1 1-3.5 4.5-2-2L19 4Z" />
  </Base>
);
export const ExchangeIcon = (p: IconProps) => (
  <Base {...p}><path d="M4 8h14l-3-3M20 16H6l3 3" /></Base>
);
export const CallIcon = (p: IconProps) => (
  <Base {...p}><path d="M5 4h3.5l1.7 4.3-2.1 1.5a12 12 0 0 0 6.1 6.1l1.5-2.1L20 15.5V19a1.5 1.5 0 0 1-1.6 1.5A16 16 0 0 1 3.5 5.6 1.5 1.5 0 0 1 5 4Z" /></Base>
);
export const MailIcon = (p: IconProps) => (
  <Base {...p}><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m4 7 8 6 8-6" /></Base>
);
export const PinIcon = (p: IconProps) => (
  <Base {...p}><path d="M12 21s7-6 7-11.5a7 7 0 0 0-14 0C5 15 12 21 12 21Z" /><circle cx="12" cy="9.5" r="2.5" /></Base>
);
export const ClockIcon = (p: IconProps) => (
  <Base {...p}><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></Base>
);
export const CheckIcon = (p: IconProps) => (
  <Base {...p}><path d="m5 12.5 4.5 4.5L19 7.5" /></Base>
);
export const ArrowRightIcon = (p: IconProps) => (
  <Base {...p}><path d="M5 12h14M13 6l6 6-6 6" /></Base>
);
export const MenuIcon = (p: IconProps) => (
  <Base {...p}><path d="M4 7h16M4 12h16M4 17h16" /></Base>
);
export const CloseIcon = (p: IconProps) => (
  <Base {...p}><path d="M6 6l12 12M18 6 6 18" /></Base>
);
export const CameraIcon = (p: IconProps) => (
  <Base {...p}><path d="M4 8h3l1.5-2.5h7L17 8h3a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1Z" /><circle cx="12" cy="13" r="3.5" /></Base>
);
export const ShieldIcon = (p: IconProps) => (
  <Base {...p}><path d="M12 3 5 6v5.5c0 4.300 3 7.500 7 9.500 4-2 7-5.200 7-9.500V6l-7-3Z" /><path d="m9 12 2 2 4-4" /></Base>
);
export const StarIcon = ({ filled = true, ...p }: IconProps & { filled?: boolean }) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth={1.6} strokeLinejoin="round" {...p}>
    <path d="m12 3.5 2.6 5.4 5.9.8-4.300 4.100 1 5.900L12 16.900 6.800 19.700l1-5.900L3.500 9.700l5.900-.8L12 3.500Z" />
  </svg>
);

const serviceIcons: Record<ServiceIcon, (p: IconProps) => React.JSX.Element> = {
  phone: PhoneDeviceIcon,
  tablet: TabletIcon,
  laptop: LaptopIcon,
  desktop: DesktopIcon,
  console: ConsoleIcon,
  tools: ToolsIcon,
  exchange: ExchangeIcon,
};

export function ServiceGlyph({ icon, ...props }: IconProps & { icon: ServiceIcon }) {
  const Icon = serviceIcons[icon] ?? ToolsIcon;
  return <Icon {...props} />;
}
