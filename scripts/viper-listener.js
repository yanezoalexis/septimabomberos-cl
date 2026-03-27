import { io } from "socket.io-client";
import https from "https";
import http from "http";

const VIPER_URL = "https://one.viper.cl";
const SOCKET_URL = "https://echoone.viper.cl";
const EMAIL = "cbvm_7";
const PASSWORD = "tumdls";

let socket = null;
let sessionCookies = "";

async function loginToWeb() {
  return new Promise((resolve, reject) => {
    // Obtener CSRF token
    const options = {
      hostname: "one.viper.cl",
      path: "/login",
      method: "GET",
      headers: {
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
        "Accept": "text/html,application/xhtml+xml",
      }
    };

    const req = https.request(options, (res) => {
      let data = "";
      res.on("data", chunk => data += chunk);
      res.on("end", () => {
        const cookies = res.headers["set-cookie"]?.join("; ") || "";
        sessionCookies = cookies;
        
        // Extraer token CSRF
        const tokenMatch = data.match(/name="_token".*?value="([^"]+)"/);
        const csrfToken = tokenMatch ? tokenMatch[1] : "";
        
        console.log("CSRF Token:", csrfToken ? "Encontrado" : "No encontrado");
        console.log("Cookies:", cookies.substring(0, 100) + "...");
        
        if (!csrfToken) {
          resolve(null);
          return;
        }

        // Hacer login
        const loginData = `_token=${encodeURIComponent(csrfToken)}&email=${encodeURIComponent(EMAIL)}&password=${encodeURIComponent(PASSWORD)}`;
        
        const loginOptions = {
          hostname: "one.viper.cl",
          path: "/login",
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Content-Length": Buffer.byteLength(loginData),
            "Cookie": cookies,
            "User-Agent": "Mozilla/5.0",
            "Referer": "https://one.viper.cl/login",
          }
        };

        const loginReq = https.request(loginOptions, (loginRes) => {
          let loginData = "";
          loginRes.on("data", chunk => loginData += chunk);
          loginRes.on("end", () => {
            const loginCookies = loginRes.headers["set-cookie"]?.join("; ") || "";
            console.log("Login cookies:", loginCookies.substring(0, 100) + "...");
            resolve(loginCookies);
          });
        });
        loginReq.write(loginData);
        loginReq.end();
      });
    });
    req.end();
  });
}

async function connectToSocket(cookies) {
  return new Promise((resolve) => {
    // Obtener SID de Socket.IO
    const sidOptions = {
      hostname: "echoone.viper.cl",
      path: "/socket.io/?EIO=3&transport=polling",
      method: "GET",
      headers: {
        "Accept": "*/*",
        "Origin": "https://one.viper.cl",
        "Referer": "https://one.viper.cl/",
        "Cookie": cookies,
      }
    };

    const req = https.request(sidOptions, (res) => {
      let data = "";
      res.on("data", chunk => data += chunk);
      res.on("end", () => {
        console.log("Socket response:", data.substring(0, 200));
        
        const sidMatch = data.match(/"sid":"([^"]+)"/);
        const sid = sidMatch ? sidMatch[1] : null;
        
        if (sid) {
          console.log("SID obtenido:", sid);
        }
        resolve(sid);
      });
    });
    req.end();
  });
}

async function main() {
  console.log("=== VIPER Listener ===\n");
  
  // Paso 1: Login web
  console.log("1. Haciendo login en VIPER...");
  const cookies = await loginToWeb();
  
  if (!cookies) {
    console.log("No se pudo obtener cookies. Intentando conexión directa...");
  }
  
  // Paso 2: Conectar a Socket.IO
  console.log("\n2. Conectando a Socket.IO...");
  const sid = await connectToSocket(cookies || "");
  
  // Intentar conexión directa con socket.io-client
  console.log("\n3. Intentando conexión WebSocket...");
  
  socket = io(SOCKET_URL, {
    path: "/socket.io/",
    transports: ["polling", "websocket"],
    extraHeaders: {
      origin: "https://one.viper.cl",
      referer: "https://one.viper.cl/",
      Cookie: cookies || "",
    },
    reconnection: true,
    reconnectionAttempts: 3,
    reconnectionDelay: 1000,
  });

  socket.on("connect", () => {
    console.log("Conectado al socket!");
  });

  socket.on("connect_error", (err) => {
    console.log("Error de conexión:", err.message);
  });

  socket.on("message", (data) => {
    console.log("Mensaje recibido:", data);
  });

  socket.on("event", (data) => {
    console.log("Evento:", data);
  });

  // Mantener vivo
  setTimeout(() => {
    console.log("\nCerrando...");
    if (socket) socket.disconnect();
    process.exit(0);
  }, 30000);
}

main().catch(console.error);
