import React, { PropTypes } from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import TextField from './TextField';
import keyBoardSpacer from './KeyboardSpacer';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 30,
    },
});

const App = (props) => {
    const { spacerProps } = props;
    return (
        <View style={styles.container}>
            <TextField spacerProps={spacerProps[0]} label="form1" style={{ flex: 4 }} />
            <TextField spacerProps={spacerProps[1]} label="form2" style={{ flex: 3 }} />
            <TextField spacerProps={spacerProps[2]} label="form3" style={{ flex: 2 }} />
            <TextField spacerProps={spacerProps[3]} label="form4" style={{ flex: 1 }} />
        </View>
    );
};
App.propTypes = {
    spacerProps: PropTypes.array,
};

export default keyBoardSpacer({
    numbers: 4,
    unTrack: true,
})(App);
