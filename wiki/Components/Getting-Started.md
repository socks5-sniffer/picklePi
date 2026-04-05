# Getting Started 🚀

This guide covers everything you need to run picklePi — whether you're a learner who just wants to explore the curriculum or a developer setting up a local environment.

---

## For Learners

### What You Need

| Item | Required? | Notes |
|------|-----------|-------|
| A modern web browser | ✅ Yes | Chrome, Firefox, Edge, or Safari |
| Node.js v18+ | ✅ Yes | [Download from nodejs.org](https://nodejs.org/) |
| Git | ✅ Yes | [Download from git-scm.com](https://git-scm.com/) |
| Raspberry Pi (any 40-pin model) | For running code | Not needed just to browse content |
| Python 3 + gpiozero on your Pi | For running code | Pre-installed on Raspberry Pi OS |

> 🖥️ **Just exploring?** You only need Node.js and Git — no Raspberry Pi required to read the curriculum, browse the dictionary, or check the GPIO pinout reference. You'll just need a Pi handy when you're ready to run the Python code.

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

   The server starts on `https://localhost:3000`. HTTPS is enabled automatically via `mkcert`. On first run, your browser may ask you to trust the locally generated certificate — click **Accept** or **Trust**.

4. **Open in your browser**

   Navigate to `https://localhost:3000`.

---

## Running picklePi on Your Raspberry Pi 3B+

picklePi was piloted on the Raspberry Pi 3B+. You can run the full app directly on your Pi so the curriculum is right in front of you while you build circuits on the same device.

### Requirements on the Pi

- **Raspberry Pi OS** (Bookworm or Bullseye recommended)
- **Node.js v18+** — install via [NodeSource](https://github.com/nodesource/distributions):
  ```bash
  curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
  sudo apt-get install -y nodejs
  ```
- **Git**: `sudo apt install git`
- **Python 3 + gpiozero**: pre-installed on Raspberry Pi OS

### Setup on the Pi

Run the same steps as the standard installation above. After `npm run dev`, open the browser on your Pi and go to `https://localhost:3000`.

> 💡 **Tip:** You can also access the app from another device on the same network. The dev server binds to `0.0.0.0`, so navigate to `https://<your-pi-ip>:3000` from your laptop or phone.

---

## Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start HTTPS dev server on port 3000 |
| `npm run build` | Compile TypeScript and create an optimised production build in `dist/` |
| `npm run preview` | Serve the production build locally for testing |
| `npm run lint` | Run TypeScript type checking (`tsc --noEmit`) |
| `npm run clean` | Delete the `dist/` build output directory |

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
| Browser says "Your connection is not private" | The local HTTPS certificate from `mkcert` is not yet trusted. Click **Advanced → Proceed** or import the `mkcert` root CA. |
| `npm run dev` fails with certificate error | Run `npx mkcert -install` once to install the local CA. |
| Port 3000 already in use | Change the port in `vite.config.ts` (`server.port`). |
| Node.js version too old | Run `node -v` to check. Upgrade to v18+ from [nodejs.org](https://nodejs.org/). |
