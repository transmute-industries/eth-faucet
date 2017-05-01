# Transmute Faucet

## Motivation

When developing Ethereum-based applications, you will eventually need to deploy your smart contracts to the testnet (unless you like flagrantly wasting money and deploying directly to the mainnet).

In order to deploy these, you're going to need testnet ether for your testnet of choice. Right now, there are three main testnet faucets I am aware of - [The Ropsten Faucet](http://faucet.ropsten.be:3001/), [B9lab Faucet](http://ipfs.b9lab.com:8080/ipfs/QmTHdYEYiJPmbkcth3mQvEQQgEamFypLhc9zapsBatQW7Y/throttled_faucet.html), and the ever so elusive [Metamask Faucet](https://faucet.metamask.io/).

These are amazing resources and we have definitely taken advantage of each of them. The issue we found was that when you're trying to get ether from one of them, you're competing against everyone else who wants testnet ether. To address this, we've delivered a solution that allows people to create faucets on the fly and authorize whoever they wish to allow to use them (POA Faucet).

If you would like to create your own faucet, please visit the [Transmute Faucet](faucet.transmute.industries) to do so.

## Funding Your Faucet Via AWS Mining

### Step 1 - Get an Amazon AWS Account

Sign up for an AWS account, sign in, and click on EC2.

### Step 2 - Setup the pre-built AMI (Amazon Machine Image) on AWS EC2

An Amazon Machine Image (AMI) provides the information required to launch an instance, which is a virtual server in the cloud. For this tutorial, we need to use the following AMI: IMAGE: ami-2cbf3e44 for US-East (Ubuntu Server 14.04 LTS (HVM) – CUDA 6.5)

To find the AMI go to the navigation bar, select US East (N.Virginia). Then In the navigation pane, click Images -> AMIs. Next switch to the Public Images next to the search filter (the default is "Owned by Me" which will be at first empty, if you do not yet own any AMI) Select Community AMIs Tab and Click on the search filter to (search by) AMI ID -> ami-2cbf3e44 Note: Make always sure you are in the correct region (US East, N.Virginia as we said) otherwise you will not see the AMI we are insterested in on the list. Select the ami-2cbf3e44 and click on the blue button, “Select”. Now you can choose an Instance Type.

Select GPU instances g2.2xlarge or g2.8xlarge and click Next: Configure Instance details. WarningI recommend going with the smaller one first, or even stick to the t2.micro free instance for testing (not mining) to save money during the learning curve.

### Step 3 - Configure Instance Details

Leave the default settings, click Next: Add Storage.

### Step 4 - Add Storage

I added 60 Gigs on each volume. The blockchain is growing so it is better to get more, this should give me suitable time to figure out how to migrate my data volumes with snapshots. After adding the storage click Next: Tag Instance

### Step 5 - Tag Isntance

Leave the default settings alone and click Next: Configure Security Group.

### Step 6 - Configure Security Group

Click on Create new security group, make sure you add your ip and allow TCP & UDP for everyone on Port 30303.

### Step 7 - Review, Launch, and Select a Key Pair

Check over all your settings, and if they are correct select Launch!

After completing this final section, check the box and launch the instance. If you got everything completed you should get a launch status screen. Click view instances to proceed.

### Step 8 - Connect To Your Instance

Once you have launched your image you can monitor it and get your connection string on the instances screen.

Click Connect, and your connection info will appear. What you will do is paste this connection string in your terminal to access the cloud server for installing Ethereum.

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
