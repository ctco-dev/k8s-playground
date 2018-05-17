import React, {Component} from 'react';
import rp from 'request-promise';

class Joke extends Component {

  constructor(props) {
    super(props);

    this.state = {
      text: 'Click the button to get a joke',
      hostInfo: ''
    };

  }

  render() {
    return (
      <div>
        <div style={{margin: '20px'}}>{this.state.text}</div>
        <div>
          <button onClick={this.onClick}>Click me</button>
        </div>
        <div>
          <pre>{this.state.hostInfo}</pre>
        </div>
      </div>
    );
  }

  onClick = async () => {

    const bffUrl = `${process.env.REACT_APP_BFF_URL}`;
    console.log(`BFF url: ${bffUrl}`);

    try {
      const res = await rp({
        uri: bffUrl,
        json: true
      });

      console.log(JSON.stringify(res));

      this.setState({
        text: res.joke,
        hostInfo: `bff: ${res.bffHost}; joke-generator: ${res.jokeHost};`
      });

    } catch (e) {
      console.log(e.message);
    }

    console.log('boom');
  }


}

export default Joke;
