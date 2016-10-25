import React, { Component } from 'react'
import {
    StyleSheet,
    Platform,
    Keyboard,
    TouchableHighlight,
    findNodeHandle,
    Dimensions,
    LayoutAnimation,
    View,
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
                property: LayoutAnimation.Properties.scaleXY,
                springDamping: 0.7,
            },
            update: {
                type: LayoutAnimation.Types.spring,
                springDamping: 0.7,
            },
        };
        this._listeners = null;
        this.updateKeyboardSpace = this.updateKeyboardSpace.bind(this);
        this.resetKeyboardSpace = this.resetKeyboardSpace.bind(this);
    }

    componentWillMount() {
        const { height } = Dimensions.get('window');
        this.setState({ viewHeight: height });
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
        LayoutAnimation.configureNext(this._layoutAnimation)
        this.setState({ top: 0 })
    }

    renderAnimation(elementHeight, keyboardHeight) {
        const diff = (this.state.viewHeight - keyboardHeight) - elementHeight - 40;
        if(diff < 0 ){
            LayoutAnimation.configureNext(this._layoutAnimation)
            this.setState({ top: diff });
        }
    }

    render() {
      for(let i =0, l=formNames.numbers; i<l; i ++){
          const ref = `keybord_forms_${i}`
          this.ids.push(
              (arg, option) => ({
                  ref,
                  onFocus: e => {
                      const _option = option || {};
                      const __ref = _option.ref || ref;
                      const extraHeight = _option.height || 0;
                      arg.refs[__ref].measure(
                        (fx,fy,width, height,px,py) => {
                            this.renderAnimation(
                                py + height + extraHeight,
                                this.state.keyboardHeight
                            );
                        }
                      );
                  }
              })
            );
      }

      return (
        <View style={{flex:1, top: this.state.top}} >
            <PassChild spacerProps={this.ids} {...this.props} />
        </View>
      );
    }
}

export default KeyBoardSpacer;
