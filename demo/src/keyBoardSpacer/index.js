import React, { Component } from 'react';
import {
    Platform,
    Keyboard,
    Dimensions,
    LayoutAnimation,
    View,
} from 'react-native';

const KeyBoardSpacer = passProps => PassChild => class KeyBoardSpacerInner extends Component {
    constructor(prop) {
        super(prop);
        this.state = {
            keyboardHeight: 0,
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
        this.unTrack = passProps.unTrack;
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
        const keyboardHeight = frames.endCoordinates.height;
        this.setState({ keyboardHeight });
    }

    resetKeyboardSpace() {
        LayoutAnimation.configureNext(this._layoutAnimation);
        this.setState({ top: 0 });
    }

    renderAnimation(elementHeight, keyboardHeight) {
        const diff = (this.state.viewHeight - keyboardHeight) - elementHeight - 40;
        const diffRelative = this.state.top + diff;
        if (diff < 0 && this.state.top === 0) {
            LayoutAnimation.configureNext(this._layoutAnimation);
            this.setState({ top: diff });
        } else if (this.state.top < 0 && diffRelative < 0 && !this.unTrack) {
            LayoutAnimation.configureNext(this._layoutAnimation);
            this.setState({ top: diffRelative });
        }
    }

    render() {
        for (let i = 0, l = passProps.numbers; i < l; i++) {
            const ref = `keybord_forms_${i}`;
            this.ids.push(
                (arg, option) => ({
                    ref,
                    onFocus: () => {
                        const _option = option || {};
                        const __ref = _option.ref || ref;
                        const extraHeight = _option.height || 0;
                        arg.refs[__ref].measure(
                          (fx, fy, width, height, px, py) => {
                              this.renderAnimation(
                                  py + height + extraHeight,
                                  this.state.keyboardHeight
                              );
                          }
                        );
                    },
                })
              );
        }

        return (
            <View style={{ flex: 1, top: this.state.top }} >
                <PassChild spacerProps={this.ids} {...this.props} />
            </View>
        );
    }
};

export default KeyBoardSpacer;
