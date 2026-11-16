import type { Service } from "@/lib/sanity/types";

/**
 * Built-in fallback copy, shown only until the owner fills in the matching
 * fields in Sanity Studio. It makes no claims about pricing, turnaround,
 * warranties, experience, or location.
 */
export const defaultHome = {
  heroHeadline: "Tech trouble? Let's get it working again.",
  heroText:
    "Everyday Tech Repair fixes phones, computers, game consoles, and other everyday electronics. Have a device you no longer need? We buy those too.",
  introHeading: "What we work on",
  introText:
    "Tell us what's going on with your device and we'll let you know how we can help.",
  finalCtaHeading: "Ready when you are",
  finalCtaText:
    "Send a few details about your device. It only takes a couple of minutes, and there's no obligation.",
};

/** The four core service areas from the approved brand sheet, plus device buying. */
export const defaultServices: Service[] = [
  {
    id: "default-phones",
    name: "Phones & Tablets",
    description:
      "Help with phones and tablets that are damaged or not working the way they should.",
    categories: ["phone", "tablet"],
    commonIssues: [],
    icon: "phone",
    image: null,
    ctaTarget: "repair",
  },
  {
    id: "default-computers",
    name: "Computers & Laptops",
    description:
      "Troubleshooting and repair for laptops and desktop computers, from hardware problems to machines that just won't cooperate.",
    categories: ["laptop", "desktop"],
    commonIssues: [],
    icon: "laptop",
    image: null,
    ctaTarget: "repair",
  },
  {
    id: "default-consoles",
    name: "Game Consoles & Controllers",
    description:
      "Repair for gaming consoles and controllers so you can get back to playing.",
    categories: ["console", "controller"],
    commonIssues: [],
    icon: "console",
    image: null,
    ctaTarget: "repair",
  },
  {
    id: "default-electronics",
    name: "Other Electronics",
    description:
      "Have something else that plugs in or charges up? Describe it and we'll tell you whether it's something we can take a look at.",
    categories: ["other"],
    commonIssues: [],
    icon: "desktop",
    image: null,
    ctaTarget: "repair",
  },
  {
    id: "default-buying",
    name: "We Buy Devices",
    description:
      "Sell us your used, unwanted, or damaged electronics. Send a few details and photos and we'll review your device.",
    categories: [],
    commonIssues: [],
    icon: "exchange",
    image: null,
    ctaTarget: "sell",
  },
];
