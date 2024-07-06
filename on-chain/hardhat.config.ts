import { HardhatUserConfig } from 'hardhat/config';
import '@nomicfoundation/hardhat-toolbox';
import 'solidity-docgen';

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
};
