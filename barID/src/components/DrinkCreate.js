import React, { Component } from 'react';
import firebase from 'firebase';
import { connect } from 'react-redux';
import { drinkUpdate, drinkCreate } from '../actions';
import { Card, CardSection, Button } from './common';
import DrinkForm from './DrinkForm';

class DrinkCreate extends Component {
  onButtonPress() {
    const { currentUser } = firebase.auth();
    const userID = currentUser.uid;
    const { name, price, status, amount } = this.props;

    this.props.drinkCreate({ name: name || 'Gin | Tonic', price: '$10.00', status: 'IN-PREPARATION', amount: amount || '0', userID });
  }

  render() {
    return (
      <Card>
        <DrinkForm {...this.props} />
        <CardSection>
          <Button onPress={this.onButtonPress.bind(this)}>
            Purchase
          </Button>
        </CardSection>
      </Card>
    );
  }
}

const mapStateToProps = (state) => {
  const { name, price, status, amount, userID } = state.drinkForm;

  return { name, price, status, amount, userID };
};

export default connect(mapStateToProps, {
  drinkUpdate, drinkCreate
})(DrinkCreate);
