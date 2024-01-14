const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const session = require('express-session');

const app = express();
const port = 3000;

// middleware parser
app.use(bodyParser.json()); // pang update ng parse sa JSON


app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true
}));

//connect sa database
mongoose.connect('mongodb+srv://admin:test123@camshop.mhuymus.mongodb.net/camshop', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});


// para sa user schema
const User = mongoose.model('User', {
  email: String, 
  password: String,
  username: String,
  firstName: String,
  lastName: String, 
  gender: String,
  birthday: String,
});

// para makuha yung signup.html
app.get('/signup.html', (req, res) => {
    res.sendFile(__dirname + '/public/signup.html');
});


app.post('/signup', async (req, res) => {
    const { email, password, firstName, lastName, gender, birthday, username } = req.body;
    console.log('Received data:', { email, password, firstName, lastName, gender, birthday, username });
  
    // para naka hash yung password sa database
    const hashedPassword = await bcrypt.hash(password, 10);
    // Ito yung mag s save sa database kapag nag signup
    const newUser = new User({
      email,
      password: hashedPassword,
      firstName,
      lastName,
      gender,
      birthday,
      username,
    });
  
    try {
      await newUser.save();
      res.redirect('/login.html'); // pag nag success mapupunta sa login
    } catch (err) {
      console.error(err);
      res.redirect('/signup.html'); 
    }
  });
  

// para accessible lahat ng html file
app.get('/login.html', (req, res) => {
    res.sendFile(__dirname + '/public/login.html');
});
app.get('/camera.html', (req, res) => {
    res.sendFile(__dirname + '/public/camera.html');
});
app.get('/accessories.html', (req, res) => {
    res.sendFile(__dirname + '/public/accessories.html');
});
app.get('/lens.html', (req, res) => {
    res.sendFile(__dirname + '/public/lens.html');
});
// para sa view/guest mode
app.get('/view-mode', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});



app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email });

    if (!user) {
        res.status(400).json({ message: "No account found. Please sign up first!" });
    } else {
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (passwordMatch) {
            req.session.loggedIn = true;

            // Ma store yung data sa database
            req.session.userData = {
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                username: user.username,
                birthday: user.birthday,
                gender: user.gender,
            };

            res.redirect('/profile.html');
        } else {
            res.status(400).json({ message: "Wrong password. Please check your password." });
        }
    }
});




// middleware pang check kung yung user ba ay authenticated
function isAuthenticated(req, res, next) {
    if (req.session.loggedIn) {
        return next();
    }
    res.redirect('/login.html');
}

// middleware para maaccess yung file
app.get('/index.html', isAuthenticated, (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

// profile.html
app.get('/profile.html', isAuthenticated, (req, res) => {
    // para makuha yung data ng user 
    const userData = req.session.userData;

    res.sendFile(__dirname + '/public/profile.html');
});
//pang tawag para sa profile.html
app.get('/user-data', isAuthenticated, (req, res) => {
    const userData = req.session.userData;
    res.json(userData);
});
//end


// para mapunta sa index file
app.get('/index.html', (req, res) => {
  // check kung user ba naka login na
  if (req.session.loggedIn) {
      res.sendFile(__dirname + '/public/index.html');
  } else {
      res.redirect('/login.html');
  }
});

app.get('/logout', (req, res) => {
    // Pang display ng confirmation pag ilologout na
    if (confirm('Are you sure you want to log out?')) {
        req.session.destroy((err) => {
            if (err) {
                console.error(err);
            }
            res.redirect('/login.html');
        });
    } else {
        res.redirect('/index.html');
    }
});

// pra sa view or guest mode kung ano yung ivview mode
app.get('/view-mode', (req, res) => {
  
    req.session.viewMode = true;
    res.redirect('/index.html');
});

app.get('/index.html', (req, res) => {
    const viewMode = req.session.viewMode;
    if (req.session.loggedIn) {
        res.sendFile(__dirname + '/public/index.html');
    } else {
        if (viewMode) {
            //ito yung pag naka view mode nakalagay sa header login
            res.sendFile(__dirname + '/public/index.html');
        } else {
            res.redirect('/login.html');
        }
    }
});




app.use(express.static('public', { index: 'login.html' }));


app.get('/', (req, res) => {
    res.redirect('/login.html'); // para mag land sa login page kapag kakabukas pa lang ng site
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

