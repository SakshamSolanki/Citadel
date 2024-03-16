import pyotp
import time
from flask import Flask, request, jsonify

totp = pyotp.TOTP('base32secret3232')


app = Flask(__name__)

generated_otp = ''

# def generate_otp():
#     otp = totp.now()
#     return otp

@app.route('/generate_otp' , methods = ['GET'])
def gen_otp():
   global generated_otp
   generated_otp = totp.now()
   return jsonify({'otp' : f'{generated_otp}'})

@app.route('/verify_otp', methods=['POST'])
def verify_otp():
  data = request.get_json()
  otp_received = data.get('otp')
  print(generated_otp)
  print(otp_received)
  

  if otp_received == generated_otp:
    return jsonify({'message': 'OTP is correct'})
  else:
    return jsonify({'message': 'Incorrect OTP'}), 401

if __name__ == '__main__':
    # print(generate_otp())
    app.run(debug=True)
    


# totp = pyotp.TOTP('base32secret3232')
# print(totp.now())

# print(totp.verify('464696'))
