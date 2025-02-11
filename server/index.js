const { Server } = require("socket.io");
const { v4: uuidv4 } = require("uuid");

const io = new Server(8080, {
  cors: {
    origin: "*",
  },
});

const WORDS = [
  "apple",
  "hand",
  "eye",
  "fish",
  "car",
  "crown",
  "dog",
  "book",
  "bicycle",
  "airplane",
];

const matches = {};

const sendStroke = (socket, data) => {
  if (!matches[socket.code]) return;

  matches[socket.code].forEach(client => {
    if (client !== socket && client.connected)
      client.emit("stroke", { stroke: data.stroke });
  });
};

const sendClear = socket => {
  if (!matches[socket.code]) return;

  matches[socket.code].forEach(client => {
    if (client !== socket && client.connected) client.emit("clear");
  });
};

const makeReady = socket => {
  if (!matches[socket.code]) return;

  socket.ready = true;

  if (matches[socket.code].every(client => client.ready)) {
    const randomWord = WORDS[Math.floor(Math.random() * WORDS.length)];

    matches[socket.code].forEach(client => {
      client.ready = false;
      if (client.connected) client.emit("start", { word: randomWord });
    });
  } else {
    matches[socket.code].forEach(client => {
      if (client !== socket && client.connected) {
        client.emit("ready");
      }
    });
  }
};

const win = socket => {
  if (!matches[socket.code]) return;

  matches[socket.code].forEach(client => {
    if (client !== socket && client.connected) client.emit("win");
  });
};

const checkMatch = (socket, data) => {
  if (!matches[data.code])
    return socket.emit("check", { message: "Match not found" });

  if (matches[data.code].length === 2)
    return socket.emit("check", { message: "Match is full" });

  if (matches[data.code].length === 1 && matches[data.code][0] === socket)
    return;

  socket.emit("check", { message: "" });
};

const createMatch = socket => {
  const code = uuidv4().slice(0, 6);
  matches[code] = [];
  socket.emit("create", { code });
};

const joinMatch = (socket, data) => {
  if (!matches[data.code])
    return socket.emit("error", { message: "Match not found" });
  if (matches[data.code].length === 2)
    return socket.emit("error", { message: "Match is full" });
  if (matches[data.code].length === 1 && matches[data.code][0] === socket)
    return;

  matches[data.code].push(socket);
  socket.code = data.code;
  socket.username = data.username;
  socket.ready = false;

  if (matches[data.code].length === 2)
    socket.emit("join", { username: matches[data.code][0].username });

  matches[data.code].forEach(client => {
    if (client !== socket && client.connected)
      client.emit("join", { username: data.username });
  });
};

io.on("connection", socket => {
  socket.on("stroke", data => sendStroke(socket, data));
  socket.on("clear", () => sendClear(socket));
  socket.on("ready", () => makeReady(socket));
  socket.on("win", () => win(socket));
  socket.on("check", data => checkMatch(socket, data));
  socket.on("create", () => createMatch(socket));
  socket.on("join", data => joinMatch(socket, data));

  socket.on("disconnect", () => {
    if (!socket.code || !matches[socket.code]) return;

    matches[socket.code] = matches[socket.code].filter(
      client => client !== socket
    );
    if (matches[socket.code].length === 0) delete matches[socket.code];
  });
});

console.log("Socket.io server is running on ws://localhost:8080");
