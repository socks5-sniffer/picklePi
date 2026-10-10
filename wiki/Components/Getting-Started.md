# Getting Started 🚀

This guide covers everything you need to run picklePi — whether you're a learner who just wants to explore the curriculum or a developer setting up a local environment.

---

## For Learners

### What You Need

| Item | Required? | Notes |
|------|-----------|-------|
| A modern web browser | ✅ Yes | Chrome, Firefox, Edge, or Safari |
| Node.js 22.19+ | ✅ Yes | [Download from nodejs.org](https://nodejs.org/) |
| Git | ✅ Yes | [Download from git-scm.com](https://git-scm.com/) |
| Raspberry Pi (any 40-pin model) | For running code | Not needed just to browse content |
| Python 3 and the libraries used by a lesson | For running code | `gpiozero` is commonly available on Raspberry Pi OS; some lessons need extra packages |

> 🖥️ **Just exploring?** You only need Node.js and Git — no Raspberry Pi required to read the curriculum, browse the dictionary, or check the GPIO pinout reference. You'll need a Pi and each lesson's listed Python libraries to run the hardware examples.

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/socks5-sniffer/picklePi.git
   cd picklePi
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   ```

   The server starts on `https://localhost:3000`. HTTPS is enabled automatically via `vite-plugin-mkcert`; follow its terminal prompts if it needs to install or trust a local certificate.

4. **Open in your browser**

   Navigate to `https://localhost:3000`.

---

## Running picklePi on Your Raspberry Pi 3B+

picklePi was piloted on the Raspberry Pi 3B+. The easiest setup is to run the web app on your regular computer and use the Pi for Python examples and circuits; the Pi does not need Node.js for that. These notes also cover running the app directly on a Pi 3B+ with Debian 13 (Trixie).

### Requirements on the Pi

- **Only if running the web app on the Pi:** Debian 13's standard `nodejs` package is Node 20 and does not meet this repo's Node.js 22.19 minimum. Check the Pi's architecture with `dpkg --print-architecture` (`armhf` for 32-bit or `arm64` for 64-bit), then use an installation source that explicitly provides Node 22.19+ for that architecture. Verify with `node --version` before `npm install`. [NodeSource lists supported Debian architectures here](https://github.com/nodesource/distributions#debian-and-ubuntu-based-distributions).
- **Python 3 and lesson libraries**. Debian 13 uses Python 3.13. Install the system Python/venv support and GPIO package, then install the version used by the curriculum checks inside a virtual environment:
  ```bash
  sudo apt update
  sudo apt install -y git python3-full python3-gpiozero
  python3 -m venv --system-site-packages ~/picklepi-venv
  source ~/picklepi-venv/bin/activate
  python -m pip install gpiozero==2.0.1
  ```
  Debian's packaged `gpiozero` is older than the curriculum check's pinned version. The virtual environment keeps the pip-installed version separate from Debian's managed Python packages, while `--system-site-packages` makes apt-installed GPIO drivers available. Install any extra Python library listed by a lesson into this environment too. Keep it activated when running lesson examples.

### Setup on the Pi

For the recommended setup, open the web app on the computer where you ran `npm run dev`; run each lesson's Python example in the activated virtual environment on the Pi. If you installed compatible Node.js on the Pi, you can instead clone the repo and follow the standard installation above, then browse to `https://localhost:3000` on the Pi.

> **LAN access:** `npm run dev` listens on all network interfaces, but the development setup is intended for a browser on the Pi at `https://localhost:3000`. A different device may reject the locally generated certificate, and the development Content Security Policy currently limits HMR WebSocket connections to localhost. LAN access is therefore not a supported ready-to-use setup.

---

## Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start HTTPS dev server on port 3000 |
| `npm run build` | Create an optimised production build in `dist/` |
| `npm run preview` | Serve the production build over HTTP at `http://localhost:4173` |
| `npm run lint` | Run TypeScript type checking (`tsc --noEmit`); this script does not run ESLint |
| `npm run clean` | Delete the `dist/` build output directory |
| `npm test` | Run unit tests |
| `npm run test:e2e` | Run browser tests; install Chromium first with `npx playwright install chromium` |
| `npm run test:curriculum` | Check the Python examples against simulated hardware; requires Python 3 and `gpiozero==2.0.1` |
| `npm run export:data` | Refresh backend JSON snapshots after changing curriculum or dictionary data |

---

## Deploying to Production

The production build is a fully static site — no server needed after build.

```bash
npm run build
```

The output in `dist/` can be deployed to any static host:
- **GitHub Pages**
- **Netlify**
- **Vercel**
- Any web server that can serve static files (Nginx, Apache, Caddy)

---

## Troubleshooting Setup

| Problem | Solution |
|---------|----------|
| Browser says "Your connection is not private" | The local HTTPS certificate may not be trusted yet. Follow the `vite-plugin-mkcert` terminal instructions to trust its local CA, then reload the page. |
| `npm run dev` fails to start HTTPS | Check `vite-plugin-mkcert` terminal output; install or trust its local CA as prompted, then restart. |
| Port 3000 already in use | Start the dev server on another port with `npm run dev -- --port 3002`. |
| Node.js version too old | Run `node -v` to check. Upgrade to 22.19+ from [nodejs.org](https://nodejs.org/). |
