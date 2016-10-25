import React, { Component } from 'react'
import {
    View,
    StyleSheet,
    Platform,
    Keyboard,
    TouchableHighlight,
    findNodeHandle,
    Dimensions,
    LayoutAnimation,
} from 'react-native'

const KeyBoardSpacer = formNames => PassChild => class KeyBoardSpacer extends Component {
  constructor(prop) {
    super(prop);
    this.state = {
      keyboardSpace: 0,
      isKeyboardOpened: false,
      viewHeight: 0,
      top: 0,
    };
    this.ids = [];
    this._layoutAnimation = {
        duration: 300,
        create: {
          type: LayoutAnimation.Types.spring,
          property: LayoutAnimation.Properties.opacity,
          springDamping: 200,
        }
    }
    this._listeners = null;
    this.updateKeyboardSpace = this.updateKeyboardSpace.bind(this);
    this.resetKeyboardSpace = this.resetKeyboardSpace.bind(this);
  }

  componentWillMount() {
    const { height } = Dimensions.get('window');
    this.setState({ viewHeight: height })
  }

  componentDidMount() {
    const updateListener = Platform.OS === 'android' ? 'keyboardDidShow' : 'keyboardWillShow';
    const resetListener = Platform.OS === 'android' ? 'keyboardDidHide' : 'keyboardWillHide';
    this._listeners = [
      Keyboard.addListener(updateListener, this.updateKeyboardSpace),
      Keyboard.addListener(resetListener, this.resetKeyboardSpace),
    ];
  }

  componentWillUnmount() {
    this._listeners.forEach(listener => listener.remove());
  }

  updateKeyboardSpace(frames) {
    if (!frames.endCoordinates) {
      return;
    }
    const keyboardHeight =  frames.endCoordinates.height;
    this.setState({ keyboardHeight })
  }

  resetKeyboardSpace() {
    this.setState({ top: 0 })
  }

  renderAnimation(elementHeight, keyboardHeight) {
      const diff = (this.state.viewHeight - keyboardHeight) - elementHeight;
      console.log(diff)
      if(diff < 0 )this.setState({ top: diff });
  }

  render() {
    for(let i =0, l=formNames.numbers; i<l; i ++){
        const ref = `keybord_forms_${i}`
        this.ids.push(
          (arg, _ref) => ({
            ref,
            onFocus: e => {
              const __ref = _ref || ref;
              arg.refs[__ref].measure(
                (fx,fy,width, height,px,py) => {
                  this.renderAnimation(py + height, this.state.keyboardHeight)
                }
              );
            }
          })
        );
    }
    const speacer = {
       flex:1,
       top: this.state.top,
    }
    LayoutAnimation.configureNext(this._layoutAnimation);
    return (
      <View style={speacer} ref="test" >
          <PassChild spacerProps={this.ids} {...this.props} />
      </View>
    );
  }
}

export default KeyBoardSpacer;
