import React, { useState } from 'react';
import { View, Alert } from 'react-native';
import { StripeProvider, CardField, useStripe, confirmPayment } from '@stripe/stripe-react-native';
import { TextInput, Button, ActivityIndicator } from 'react-native-paper';
// import { publishKey } from '../../../../../utils/stripe';

const StripePayment = () => {
  const { confirmPayment } = useStripe();
  const [cardDetails, setCardDetails] = useState(null);
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    if (!cardDetails?.complete) {
      Alert.alert('Error', 'Please enter complete card details');
      return;
    }
    
    setLoading(true);
    try {
      // Mock server API call to create a PaymentIntent
      const paymentIntentResponse = await fetch('YOUR_SERVER_ENDPOINT/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: amount * 100, currency: 'usd' })
      });
      const { clientSecret } = await paymentIntentResponse.json();

      const { paymentIntent, error } = await confirmPayment(clientSecret, {
        type: 'Card',
        billingDetails: {
          email: 'test@example.com',
          name: 'Test User'
        }
      });

      if (error) {
        Alert.alert('Payment failed', error.message);
      } else if (paymentIntent) {
        Alert.alert('Payment success', 'Your payment was successful!');
      }
    } catch (error) {
      Alert.alert('Error', 'Payment processing failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <StripeProvider publishableKey={"pk_test_51QKgHnKdEWJmNYMuq6vCSKkvtRlPR5QswJz9uPHLKPlQ13800LYcSUg5atJ3gWdyBAiNXP8sKkVMD76ym3rpIjNv00TEfgD6PN"}>
      <View style={{ flex: 1, padding: 20, justifyContent: 'center' }}>
        <TextInput
          label="Amount"
          value={amount}
          onChangeText={setAmount}
          keyboardType="numeric"
          style={{ marginBottom: 20 }}
        />
        
        <CardField
          postalCodeEnabled={false}
          placeholders={{ number: '4242 4242 4242 4242' }}
          cardStyle={{
            backgroundColor: '#FFFFFF',
            textColor: '#000000'
          }}
          style={{
            width: '100%',
            height: 50,
            marginVertical: 20
          }}
          onCardChange={(details) => setCardDetails(details)}
        />

        <Button
          mode="contained"
          onPress={handlePayment}
          disabled={loading}
          loading={loading}
          style={{ marginTop: 20 }}
        >
          {loading ? <ActivityIndicator color="#fff" /> : 'Pay Now'}
        </Button>
      </View>
    </StripeProvider>
  );
};

export default StripePayment;
