import React, {useEffect, useState} from 'react';
import { sendToken } from '../../utils/TransactionUtils';
import { goerli } from '../../models/Chain';
import { Account } from '../../models/Account';
import AccountTransactions from './AccountTransactions';
import { ethers } from 'ethers';
import { toFixedIfNecessary } from '../../utils/AccountUtils';
import './Account.css';
import Modal from '../Modal';
import Input from '../Input';

interface AccountDetailProps {
  account: Account
}

const AccountDetail: React.FC<AccountDetailProps> = ({account}) => {
  const [destinationAddress, setDestinationAddress] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [amount, setAmount] = useState(0);
  const [otp, setOtp] = useState(0);
  const [balance, setBalance] = useState(account.balance)

  const [networkResponse, setNetworkResponse] = useState<{ status: null | 'pending' | 'complete' | 'error', message: string | React.ReactElement }>({
    status: null,
    message: '',
  });

  useEffect(() => {
    const fetchData = async () => {
        const provider = new ethers.providers.JsonRpcProvider(goerli.rpcUrl);
        let accountBalance = await provider.getBalance(account.address);
        setBalance((String(toFixedIfNecessary(ethers.utils.formatEther(accountBalance)))));
    }
    fetchData();
}, [account.address])

  function handleDestinationAddressChange(event: React.ChangeEvent<HTMLInputElement>) {
    setDestinationAddress(event.target.value);
  }

  function handleAmountChange(event: React.ChangeEvent<HTMLInputElement>) {
    setAmount(Number.parseFloat(event.target.value));
  }

  function handleOtpChange(event: React.ChangeEvent<HTMLInputElement>){
    setOtp(Number.parseFloat(event.target.value));
  }

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  async function transfer() {
    // Set the network response status to "pending"
    setNetworkResponse({
      status: 'pending',
      message: '',
    });

    try {
      const { receipt } = await sendToken(false, false, amount, account.address, destinationAddress, account.privateKey, []);

      if (receipt.status === 1) {
        // Set the network response status to "complete" and the message to the transaction hash
        setNetworkResponse({
          status: 'complete',
          message: <p>Transfer complete! <a href={`${goerli.blockExplorerUrl}/tx/${receipt.transactionHash}`} target="_blank" rel="noreferrer">
            View transaction
            </a></p>,
        });
        return receipt;
      } else {
        // Transaction failed
        console.log(`Failed to send ${receipt}`);
        // Set the network response status to "error" and the message to the receipt
        setNetworkResponse({
          status: 'error',
          message: JSON.stringify(receipt),
        });
        return { receipt };
      }
    } catch (error: any) {
      // An error occurred while sending the transaction
      console.error({ error });
      // Set the network response status to "error" and the message to the error
      setNetworkResponse({
        status: 'error',
        message: error.reason || JSON.stringify(error),
      });
    }
  }

  return (
    <div className='AccountDetail container bg-dark text-light'>
        <h3>
            Address: <a href={`https://goerli.etherscan.io/address/${account.address}`} target="_blank" rel="noreferrer">
            {account.address}
            </a><br/>
            Balance: {balance} ETH
        </h3>

        <div className="form-group">
            <label>Destination Address:</label>
            <input
            className="form-control"
            type="text"
            value={destinationAddress}
            onChange={handleDestinationAddressChange}
            />
        </div>

        <div className="form-group">
            <label>Amount:</label>
            <input
            className="form-control"
            type="number"
            value={amount}
            onChange={handleAmountChange}
            />
        </div>

        <div className="form-group">
            <label>OTP</label>
            <input
            className="form-control"
            type="number"
            value={otp}
            onChange={handleOtpChange}
            />
        </div>

        <button
            className="btn btn-success"
            type="button"
            // onClick={transfer}
            // disabled={!amount || networkResponse.status === 'pending'}
        > Get OTP</button>

        <div >
        <button
            className="btn btn-success"
            type="button"
            onClick={transfer}
            disabled={!amount || networkResponse.status === 'pending'}
        >
            Send {amount} ETH 
        </button>

        <button
            className="btn btn-success"
            type="button"
            onClick={transfer}
            disabled={!amount || networkResponse.status === 'pending'}
        >
            Send {amount} ETH via XX network
        </button>

        {/* <button onClick={handleOpenModal}>Open Modal</button>
        <Modal isOpen={showModal} onClose={handleCloseModal}>
          {/* Modal content */}
          {/* {<Input label="Enter your name" onChange={(value : any) => console.log(value)} />} Example usage */}
        {/* </Modal>  */}
        </div>

        {networkResponse.status &&
            <>
            {networkResponse.status === 'pending' && <p>Transfer is pending...</p>}
            {networkResponse.status === 'complete' && <p>{networkResponse.message}</p>}
            {networkResponse.status === 'error' && <p>Error occurred while transferring tokens: {networkResponse.message}</p>}
            </>
        }

        <AccountTransactions account={account} />
    </div>

  )
}

export default AccountDetail;