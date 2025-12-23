export const CONFIG = {
  // Add hostnames here that you want the extension to ignore (substring match)
  exceptions: ["facebook.com", "bing.com"],
  // Add hostnames here for exact match exceptions (e.g., "google.com" but not "docs.google.com")
  exceptionsExact: ["google.com"],
  // List subdomains to group separately (e.g., "docs.google.com")
  groupSeparately: [
    "docs.google.com",
    "meet.google.com",
    "mail.google.com",
    "calendar.google.com",
    // add more as needed
  ],
  // Chrome only allows these specific colors
  groupColors: [
    "grey",
    "blue",
    "red",
    "yellow",
    "green",
    "pink",
    "purple",
    "cyan",
    "orange",
  ],
  // If true, group by full domain (including subdomains); if false, group by registered domain only
  groupSubdomains: false,
};
