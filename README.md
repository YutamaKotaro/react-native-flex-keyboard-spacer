# react-native-flex-keyboard-spacer
This is keyboard-spacer for flex view.
If you are anguished at hiding keyboard TextInput, this package makes you calm.
In the future this package will be applied to scrollview.

## install

```sh
npm install react-native-flex-keyboard-spacer
```

## demo
![formspacerdemo](./formSpacer.gif)

## howToUse

See also [demo codes](./demo).

```js
class TextField extends Component {
  render() {
    const { style, label, fields } = this.props;
    return (
      <View style={[styles.container, style]}>
        <Text style={styles.label}>{label}</Text>
        <TextInput {...fields(this)} style={styles.textInput} />
      </View>
    );
  }
}

const App = (props) => {
  const { fields } = props;
  return (
    <View style={styles.container}>
      <TextField fields={fields[0]} label="form1" style={{flex: 4}} />
      <TextField fields={fields[1]} label="form2" style={{flex: 3}} />
      <TextField fields={fields[2]} label="form3" style={{flex: 2}} />
      <TextField fields={fields[3]} label="form4" style={{flex: 1}} />
    </View>
  );
};

const WrappedApp = KeyBoardSpacer({
  numbers: 4,
})(App);

AppRegistry.registerComponent('formKeySpace', () => WrappedApp);
```
