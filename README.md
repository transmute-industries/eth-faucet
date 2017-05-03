# Transmute Faucet

## Motivation

When developing Ethereum-based applications, you will eventually need to deploy your smart contracts to the testnet (unless you like flagrantly wasting money and deploying directly to the mainnet).

In order to deploy these, you're going to need testnet ether for your testnet of choice. Right now, there are three main testnet faucets I am aware of - [The Ropsten Faucet](http://faucet.ropsten.be:3001/), [B9lab Faucet](http://ipfs.b9lab.com:8080/ipfs/QmTHdYEYiJPmbkcth3mQvEQQgEamFypLhc9zapsBatQW7Y/throttled_faucet.html), and the ever so elusive [Metamask Faucet](https://faucet.metamask.io/).

These are amazing resources and we have definitely taken advantage of each of them. The issue we found was that when you're trying to get ether from one of them, you're competing against everyone else who wants testnet ether. To address this, we've delivered a solution that allows people to create faucets on the fly and authorize whoever they wish to allow to use them (POA Faucet).

If you would like to create your own faucet, please visit the [Transmute Faucet](faucet.transmute.industries) to do so.

## Funding Your Testnet Faucet Via AWS Mining
_Guide adapted from [coininstant's article on Steemit](https://steemit.com/ethereum/@coininstant/amazon-aws-ethereum-cloud-mining-tutorial-12-step-guide-to-generating-etc)_

### Step 1 - Get an Amazon AWS Account

- Sign up for an AWS account
- Sign in
- Click on EC2

### Step 2 - Setup the pre-built AMI (Amazon Machine Image) on AWS EC2

 - In the upper right-hand dropdown, select "US East (N.Virginia)" as your region. **Make sure this is correct before proceeding.**
 - In the side-menu, click "AMIs"
 - In the search menu, select "Public Images"
 - Search for ami-2cbf3e44
 - Select the first result and click "Launch"
 - Select g2.2xlarge
 - Click "Next: Configure Instance details"

### Step 3 - Configure Instance Details

 - Click "Next: Add Storage"

### Step 4 - Add Storage

 - Update default storage size of 8GiB to 60GiB
 - Click "Next: Tag Instance"

### Step 5 - Tag Instance

 - Click "Next: Configure Security Group."

### Step 6 - Configure Security Group

- Click "Create a new security group"
- Add SSH for your IP
- Add Custom TCP Rule to allow everyone on port 30303
- Add Custom UDP Rule to allow everyone on port 30303
- Click "Review and Launch"

### Step 7 - Review, Launch, and Select a Key Pair

- Review your settings for errors
- Click "Launch"
- Create a new key pair or use an existing one for your instance
- Click "Launch Instances"
- Click "View Instances"

### Step 8 - Connect To Your Instance

- Right click on your instance and select "Connect"
- Navigate to where you saved that .pem file and run the ssh command given
- Once you say "Yes" to if you wish to continue connecting, you will establish an ssh connection with the instance

### Step 9 - Install Geth

Run the following commands to install the latest developer version of go-ethereum:

```
sudo apt-get install software-properties-common
sudo add-apt-repository -y ppa:ethereum/ethereum-qt
sudo add-apt-repository -y ppa:ethereum/ethereum
sudo add-apt-repository -y ppa:ethereum/ethereum-dev
sudo apt-get update
sudo apt-get install ethereum
```

### Step 10 - Download the chain

Before continuing, learn about the [screen command](https://www.howtoforge.com/linux_screen)

Run the following commands:

```
screen
```
[Press enter]
```
geth --testnet removedb
geth --testnet --fast --nodiscover console
admin.addPeer('enode://6ce05930c72abc632c58e2e4324f7c7ea478cec0ed4fa2528982cf34483094e9cbc9216e7aa349691242576d552a2a56aaeae426c5303ded677ce455ba1acd9d@13.84.180.240:30303')
admin.addPeer('enode://20c9ad97c081d63397d7b685a412227a40e23c8bdc6688c6f37e97cfbc22d2b4d1db1510d8f61e6a8866ad7f0e17c02b14182d37ea7c3c8b9c2683aeb6b733a1@52.169.14.227:30303')
```

Wait for the chain to download, you'll know it is finished when it starts importing one block at a time.

### Step 11 - Install Genoil's cpp-ethereum fork

Press ctrl+a then d (this will detach the screen that is downloading the chain)
```
wget http://developer.download.nvidia.com/compute/cuda/repos/ubuntu1404/x86_64/cuda-repo-ubuntu1404_7.5-18_amd64.deb
sudo dpkg -i cuda-repo-ubuntu1404_7.5-18_amd64.deb
sudo apt-get -y install software-properties-common
sudo add-apt-repository -y ppa:ethereum/ethereum
sudo apt-get update
sudo apt-get install git cmake libcryptopp-dev libleveldb-dev libjsoncpp-dev libjson-rpc-cpp-dev libboost-all-dev libgmp-dev libreadline-dev libcurl4-gnutls-dev ocl-icd-libopencl1 opencl-headers mesa-common-dev libmicrohttpd-dev build-essential cuda -y
git clone https://github.com/Genoil/cpp-ethereum/
cd cpp-ethereum/
mkdir build
cd build
cmake -DBUNDLE=cudaminer ..
make -j8
```

### Step 12 - Begin Mining

- Go back to the screen downloading the chain
- Press ctrl+c to stop the process
- Run the following (Replace the address with your own)
```
geth --testnet --rpc --etherbase "0xf28dafbfeb4abf32869c9d498da0d651d0206ed4" console
```
- detach from the screen
- open a new screen and run
```
ethminer -G --opencl-device 0
```

That's it, thanks again to coininstant for helping me with [their article](https://steemit.com/ethereum/@coininstant/amazon-aws-ethereum-cloud-mining-tutorial-12-step-guide-to-generating-etc) to get me off the ground.
