import React, { Component } from "react";
import styles from './styles.module.css';

const synth = window.speechSynthesis;

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      voicelist: synth.getVoices(),
      value: ""
    };

    //To get voices in beg. by manually firing event
    synth.onvoiceschanged = () => {
      const voices = synth.getVoices();
      this.setState({ voicelist: voices });
    };

    this.speakfnc = this.speakfnc.bind(this);
    this.textchange = this.textchange.bind(this);
    this.langchng = this.langchng.bind(this);
  }

  getVoices = () => {
    this.setState({ voicelist: synth.getVoices() });
  };

  speakfnc() {
    console.log("speakfnc called");
    const speakText = new SpeechSynthesisUtterance(this.state.value);
    speakText.voice = this.state.currLang;
    synth.speak(speakText);
  }

  speakfnckey = (event) => {
    if (event.key === "Enter") {
      const speakText = new SpeechSynthesisUtterance(this.state.value);
      speakText.voice = this.state.currLang;
      synth.speak(speakText);
    }
  };

  stopfnc() {
    console.log("stopfnc called");
    synth.cancel();
  }

  textchange(event) {
    this.setState({ value: event.target.value });
  }

  langchng(event) {
    var langName = event.target.value;
    // let currLang = find(this.state.voicelist, { name: langName });

    // console.log(currLang);

    this.setState({ currLang: 'hu-HU' });
  }

  render() {
    // console.log(this.state.voicelist);
    return (
      <div className="parent">
        <h1 className="heading">Szövegből beszéd</h1>

        <textarea
          onKeyUp={this.speakfnckey}
          className={styles.textarea}
          placeholder="Írd ide a szöveget"
          onChange={this.textchange}
        ></textarea>

        <div className="btnparent">
          <button className="btn" onClick={this.speakfnc}>
            Beszélj
          </button>

          <button className="btn" onClick={this.stopfnc}>
            Állj
          </button>
        </div>
      </div>
    );
  }
}

export default App;
