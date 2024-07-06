import { HardhatUserConfig } from 'hardhat/config';
import '@nomicfoundation/hardhat-toolbox';
import 'solidity-docgen';
import dotenv from 'dotenv';

// Load environment variables from the .env file
dotenv.config();

const galadrielDevnet = []
if (process.env.PRIVATE_KEY_GALADRIEL) {
  galadrielDevnet.push(process.env.PRIVATE_KEY_GALADRIEL)
}

export default <HardhatUserConfig>{
  paths: {
    sources: 'contracts',
  },
  solidity: {
    compilers: [{ version: '0.8.24' }],
  },
  docgen: {
    output: 'docs',
    pages: () => 'contract.md',
  },
  networks: {
    galadriel: {
        chainId: 696969,
        url: "https://devnet.galadriel.com/",
        accounts: galadrielDevnet,
      },
  },
};