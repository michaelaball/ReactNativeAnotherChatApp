import firebase from 'firebase';

class Fire {
  constructor() {
    this.init();

    this.observeAuth();
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

  get ref() {
    return firebase.database().ref('messages');
  }

  get uid() {
    return (firebase.auth().currentUser || {}).uid;
  }

  get timestamp() {
    return firebase.database.ServerValue.TIMESTAMP;
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

  append = message => {
    console.log(JSON.stringify(message))
    this.ref.push(message);
  }

  on = callback =>
    this.ref
      .limitToLast(20)
      .on('child_added', snapshot =>
        callback(this.parse(snapshot)));
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
    return message;
  }

  off() {
    this.ref.off();
  }

  init = () =>
    firebase.initializeApp({
      apiKey: 'AIzaSyDLgW8QG1qO8O5WZLC1U8WaqCr5-CvEVmo',
      authDomain: 'chatter-b85d7.firebaseapp.com',
      databaseURL: 'https://chatter-b85d7.firebaseio.com',
      projectId: 'chatter-b85d7',
      storageBucket: '',
      messagingSenderId: '861166145757',
    });
}

Fire.shared = new Fire();
export default Fire;
