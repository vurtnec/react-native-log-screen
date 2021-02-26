/**
 * Logger main View class
 */
import React from "react";
import { View, StyleSheet } from "react-native"
import LogListView from "./LogListView"
import Logger from "../Logger"
import debounce from "debounce"

class LogView extends React.Component{
    constructor() {
        super();
        this.state = {
            rows: [],
        };
        this.unmounted = false;
        this.updateDebounced = debounce(this.update, 150);
    }

    componentWillUnmount() {
        this.unmounted = true;
        if (this.listner) {
            this.listner();
        }
    }

    update = (data) => {
        if (data) {
            if (!this.unmounted) {
                this.setState({ rows: data });
            }
        }
    }

    componentWillMount() {
        this.listner = Logger.onDebugRowsChanged(this.updateDebounced)
    }

    render() {
        return (
            <View style={styles.container}>
                <LogListView rows={this.state.rows} {...this.props} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default LogView;





