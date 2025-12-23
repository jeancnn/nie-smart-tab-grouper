import { CONFIG } from "./config.js";
import { getDomain } from "https://cdn.jsdelivr.net/npm/tldts@6.1.71/+esm";

let timeout = null;

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === "complete" && tab.url?.startsWith("http")) {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      organizeTabs();
    }, 500);
  }
});

// Helper to extract the registered domain (e.g., "example.com" from "mail.example.com")
// function getRegisteredDomain(hostname) {
//   const parts = hostname.split(".").filter(Boolean);
//   if (parts.length >= 2) {
//     return parts.slice(-2).join(".");
//   }
//   return hostname;
// }

async function organizeTabs() {
  const tabs = await chrome.tabs.query({ currentWindow: true });
  const urlMap = {};

  // 1. Map tabs to registered domains
  tabs.forEach((tab) => {
    try {
      if (tab.pinned) return;

      const url = new URL(tab.url);
      const host = url.hostname.replace("www.", "");

      // Check if this host should be grouped separately
      let domain;
      if (CONFIG.groupSeparately && CONFIG.groupSeparately.includes(host)) {
        domain = host;
      } else {
        // Use full host (subdomain) or registered domain based on config
        // domain = CONFIG.groupSubdomains ? host : getRegisteredDomain(host);
        domain = CONFIG.groupSubdomains ? host : getDomain(host);
      }

      // Check against exact exceptions
      const isExactExcluded = CONFIG.exceptionsExact.includes(host);

      // Check against substring exceptions
      const isExcluded = CONFIG.exceptions.some((ex) => domain.includes(ex));

      if (!isExactExcluded && !isExcluded) {
        if (!urlMap[domain]) urlMap[domain] = [];
        urlMap[domain].push(tab);
      }
    } catch (e) {}
  });

  // 2. Process each domain group
  for (const domain in urlMap) {
    const domainTabs = urlMap[domain];

    if (domainTabs.length > 1) {
      const tabIds = domainTabs.map((t) => t.id);

      const existingGroupTab = domainTabs.find((t) => t.groupId !== -1);
      const existingGroupId = existingGroupTab
        ? existingGroupTab.groupId
        : null;

      if (existingGroupId !== null) {
        await chrome.tabs.group({ tabIds, groupId: existingGroupId });
      } else {
        const groupId = await chrome.tabs.group({ tabIds });

        const namePart = domain.split(".")[0];
        const formattedTitle =
          namePart.charAt(0).toUpperCase() + namePart.slice(1);

        const randomColor =
          CONFIG.groupColors[
            Math.floor(Math.random() * CONFIG.groupColors.length)
          ];

        await chrome.tabGroups.update(groupId, {
          title: formattedTitle,
          color: randomColor,
        });
      }
    }
  }
}
