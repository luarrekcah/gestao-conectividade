const passport = require("passport"),
  GoogleStrategy = require("passport-google-oauth").OAuth2Strategy,
  { getDatabase, ref, set, onValue } = require("@firebase/database"),
  moment = require('moment');

  const now = moment().format(); 

passport.use(
  new GoogleStrategy(
    {
      clientID: "457109339212-511616cm6md2gqi8h8c87ah92ptk5m60.apps.googleusercontent.com",
      clientSecret: "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",
      callbackURL: "http://localhost:3000" + "/auth/google/callback",
    },
    (accessToken, refreshToken, profile, done) => {
      const db = getDatabase();
      const users = ref(db, "gestaoconectividade/users");
      onValue(users, (snapshot) => {
        let allUsers = snapshot.val();
        if (allUsers == null) {
          allUsers = [];
        }
        const findUserById = (id) => {
          return allUsers.find((item) => item.userid === id);
        };
        passport.serializeUser((user, done) => {
          done(null, user.userid);
        });
        passport.deserializeUser((id, done) => {
          try {
            const user = findUserById(id);
            done(null, user);
          } catch (err) {
            console.log(err);
            return done(err, null);
          }
        });
        const user = {
          userid: profile.id,
          name: profile.name.givenName,
          fullName: profile.displayName,
          photo: profile.photos[0].value,
          registeredAt: now,
          badges: {
            verified: false,
            medal: "new"
          },
          documents: {
            cpf: "",
            rg:"",
            dataNasc:""
          },
          paymentData: {
            pixKey: ""
          },
          freelancerData: {
            joinedJobs: [],
            proposals: [],
            portfolio: []
          },
          clientData: {
            projects: []
          }
        };
        if (findUserById(user.userid)) {
          try {
            return done(null, user);
          } catch (err) {
            console.log(err);
            return done(err, false);
          }
        } else {
          allUsers.push(user);
          set(ref(db, "gestaoconectividade/users"), allUsers).then(() => {
            console.log("Registro atualizado");
            try {
              return done(null, user);
            } catch (err) {
              console.log(err);
              return done(err, false);
            }
          });
        }
      });
    }
  )
);

module.exports = passport;
