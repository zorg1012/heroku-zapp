const jsonServer = require('json-server');
const session = require('express-session');
const got = require('got');

const app = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

const crypto = require('./helpers/crypto');

const PORT = process.env.PORT || 3000;
app.use(middlewares);

app.use(session({
  secret: 'ssshhhhh',
  saveUninitialized: false,
  name: 'zapuserid',
  resave: false,
  cookie: {
    httpOnly: false,
  },
}));
app.use(jsonServer.bodyParser);
app.use((req, res, next) => {
  if (req.path === '/saves') {
    req.body.userId = req.session.userId;
    req.query.userId = `${req.session.userId}`;
  }
  next();
});

app.post('/login', async (req, res) => {
  const userRecord = router.db.getState().users.find((el) => el.username === req.body.username);
  if (!userRecord) {
    res.status(401);
    res.end('User not Found');
    return;
  }
  const match = await crypto.verifyPassword(req.body.password, userRecord.password);
  if (match) {
    req.session.userId = userRecord.id;
    req.session.cookie.maxAge = (!req.body.remember) ? 3600000 : null;
    res.end('done');
  } else {
    res.status(401);
    res.end('Wrong password');
  }
});

app.post('/register', async (req, res) => {
  if (!req.body.username) {
    res.status(400);
    res.end('Username required');
    return;

  }
  if (!req.body.password) {
    res.status(400);
    res.end('Password required');
    return;

  }
  if (!req.body.email) {
    res.status(400);
    res.end('Email required');
    return;

  }
  const userRecord1 = router.db.getState().users.find((el) => el.username === req.body.username);
  const userRecord2 = router.db.getState().users.find((el) => el.email === req.body.email);

  if (userRecord1) {
    res.status(403);
    res.end('Username already in use');
    return;
  }
  if (userRecord2) {
    res.status(403);
    res.end('Email already in use');
    return;
  }
  const hash = await crypto.hashPassword(req.body.password);

  const resp = await got(`http://localhost:${PORT}/users`, {
    method: 'POST',
    json: true,
    body: {
      email: req.body.email,
      username: req.body.username,
      password: hash,
    },
  });
  req.session.userId = resp.body.id;
  req.session.cookie.maxAge = 3600000;
  res.end('done');
});


app.use(router);

app.listen(PORT, () => {
  console.log(`JSON Server is running http://localhost:${PORT}`);
});
