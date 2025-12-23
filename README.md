# Nie Smart TAB Grouper

Automatically groups Chrome tabs based on their domain names for a cleaner, more organized browsing experience.

## Features

- **Automatic Tab Grouping:** Tabs are grouped by domain or subdomain, keeping related tabs together.
- **Configurable Exceptions:** Easily exclude specific domains or subdomains from grouping.
- **Separate Subdomain Groups:** Optionally group certain subdomains separately (e.g., `docs.google.com`, `mail.google.com`).
- **Custom Group Colors:** Tab groups use random colors from a configurable palette.
- **Pinned Tab Exclusion:** Pinned tabs are never grouped.

## Installation

1. **Clone or Download the Repository**

2. **Open Chrome Extensions Page**

   - Go to `chrome://extensions/`
   - Enable Developer mode (top right).

3. **Load the Extension**

   - Click **Load unpacked**.
   - Select the project folder (`nie-smart-tab-grouper`).

4. **Done!**
   - The extension will automatically group your tabs as you browse.

## Configuration

Edit `config.js` to customize:

- `exceptions`: Domains to ignore (substring match).
- `exceptionsExact`: Domains to ignore (exact match).
- `groupSeparately`: Subdomains to group separately.
- `groupColors`: List of allowed group colors.
- `groupSubdomains`: Set to `true` to group by full domain (including subdomains).

## How It Works

The extension listens for tab updates and automatically organizes tabs into groups based on their domain or subdomain. Configuration options allow you to fine-tune which tabs are grouped and how.

## License

MIT License

## Author

Jean Carlos Niehues

---

For more details, see the source files.
