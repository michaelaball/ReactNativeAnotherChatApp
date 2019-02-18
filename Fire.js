import firebase from 'firebase';

class Fire {
  constructor() {
    this.init();

    this.observeAuth();
  }

  get ref() {
    return firebase.database().ref('messages');
  }

  get uid() {
    return (firebase.auth().currentUser || {}).uid;
  }

  get timestamp() {
    return firebase.database.ServerValue.TIMESTAMP;
  }

  init = () =>
    firebase.initializeApp({
      // My Firebase app:
      apiKey: "AIzaSyD-wbx7Op4jrcV2wB-z1IQQoiqDPk3oFdw",
      authDomain: "another-chat-app-4fa4d.firebaseapp.com",
      databaseURL: "https://another-chat-app-4fa4d.firebaseio.com",
      projectId: "another-chat-app-4fa4d",
      storageBucket: "another-chat-app-4fa4d.appspot.com",
      messagingSenderId: "377675405417",
      // Tutorial author's firebase app:
      // apiKey: 'AIzaSyDLgW8QG1qO8O5WZLC1U8WaqCr5-CvEVmo',
      // authDomain: 'chatter-b85d7.firebaseapp.com',
      // databaseURL: 'https://chatter-b85d7.firebaseio.com',
      // projectId: 'chatter-b85d7',
      // storageBucket: '',
      // messagingSenderId: '861166145757',
    });

  on = callback =>
    this.ref
      .limitToLast(50)
      .on('child_added', snapshot =>
        callback(this.parse(snapshot)));

  off() {
    this.ref.off();
  }

  send = messages => {
    for (let i=0; i < messages.length; i++) {
      const { text, user } = messages[i];

      const message = {
        text,
        user,
        timestamp: this.timestamp,
      };
      this.append(message);
    }
  };

  parse = snapshot => {
    const { timestamp: numberStamp, text, user } = snapshot.val();
    const { key: _id } = snapshot;

    const timestamp = new Date(numberStamp);

    const message = {
      _id,
      timestamp,
      text,
      user,
    };
    console.log(JSON.stringify(message));
    return message;
  }

  append = message => {
    console.log(JSON.stringify(message))
    this.ref.push(message);
  }

  observeAuth = () =>
    firebase.auth().onAuthStateChanged(this.onAuthStateChanged);

  onAuthStateChanged = user => {
    if (!user) {
      try {
        firebase.auth().signInAnonymously();
      } catch ({ message }) {
        alert(message);
      }
    }
  }

}

Fire.shared = new Fire();
export default Fire;
