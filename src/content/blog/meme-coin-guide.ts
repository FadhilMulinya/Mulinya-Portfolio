export const memeCoinGuide = {
  title: 'Beginners Guide to Building a MEME Coin on Base',
  author: 'Fadhil Mulinya',
  date: 'Jan 5, 2025',
  readingTime: '10 min read',
  slug: 'meme-coin-guide',
  coverImage: '/blog/erc20.png',
  externalUrl: 'https://mulinya-erc20.hashnode.dev/beginners-guide-to-building-a-meme-coin-on-base',
  tags: ['Solidity', 'Base', 'Smart Contracts', 'ERC20', 'Tutorial'],
  externalDocs: [
    {
      title: 'OpenZeppelin ERC20 Documentation',
      url: 'https://docs.openzeppelin.com/contracts/4.x/erc20',
      description: 'Official documentation for the OpenZeppelin ERC20 implementation.',
    },
    {
      title: 'Base Network Documentation',
      url: 'https://docs.base.org',
      description: 'Learn more about deploying and building on Base, an Ethereum L2 solution.',
    },
    {
      title: 'Solidity Documentation',
      url: 'https://docs.soliditylang.org/',
      description: 'Official Solidity documentation for smart contract development.',
    },
    {
      title: 'ERC20 Token Standard',
      url: 'https://eips.ethereum.org/EIPS/eip-20',
      description: 'The official EIP for the ERC20 Token Standard.',
    },
  ],
  sections: [
    {
      type: 'text',
      content: 'Before diving into ERC-20, we first need to understand what "ERC" means.',
    },
    {
      type: 'text',
      content: 'An Ethereum Request for Comments (ERC) is a token standard accepted by the Ethereum research community. These standards help developers write smart contracts that follow consistent rules. New token standards typically begin as an Ethereum Improvement Proposal (EIP), which anyone can submit. After thorough review, an EIP may be accepted as an official ERC.',
    },
    {
      type: 'text',
      content: 'In Ethereum, there are three primary types of token standards used in smart contracts:',
    },
    {
      type: 'list',
      items: [
        'Fungible Tokens',
        'Non-Fungible Tokens (NFTs)',
        'Semi-Fungible Tokens (SFTs)',
      ],
    },
    {
      type: 'heading',
      content: 'Fungible Tokens',
    },
    {
      type: 'text',
      content: 'Fungible tokens are interchangeable and divisible assets. Each token unit is identical to another unit of the same type and can be split into smaller units. A good example of a fungible asset is a dollar. You can break a dollar down into smaller denominations (cents), and any dollar is identical in value to another.',
    },
    {
      type: 'text',
      content: 'Fungible tokens are commonly represented using the ERC-20 standard.',
    },
    {
      type: 'heading',
      content: 'Step-by-Step Guide to Writing a simple meme coin (ERC-20) Smart Contract',
    },
    {
      type: 'subheading',
      content: '1. Setting up the Development Environment',
    },
    {
      type: 'text',
      content: 'Since we are using Remix browser IDE we won\'t be installing any dependencies or tools. We will need Metamask to deploy our contract to BASE, an Ethereum L2.',
    },
    {
      type: 'code',
      language: 'solidity',
      filename: 'MemeCoin.sol',
      content: `// SPDX-License-Identifier: MIT
pragma solidity 0.8.28;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

contract MemeCoin is ERC20, Ownable {
    // Events to track token transfers, burns and mints
    event TokensSent(address indexed from, address indexed to, uint256 amount);
    event TokensBurned(address indexed burner, uint256 amount);
    event TokensMinted(address indexed recipient, uint256 amount);

    // Maximum supply of tokens (21 million with 18 decimals)
    uint256 public constant MAX_SUPPLY = 21_000_000e18;

    constructor(string memory name,
                string memory symbol) ERC20(name,symbol) Ownable(msg.sender) {
        // Mint initial supply to contract deployer (2 million tokens)
        _mint(msg.sender, 2_000_000e18);
    }
}`,
    },
    {
      type: 'text',
      content: 'The contract has been deployed to Base mainnet at address: 0xd2cB6Bb417CeB5cEC1A8A4d69EF5f0c4f3Fbae9f',
    },
    {
      type: 'text',
      content: 'Read the full detailed guide on Hashnode to learn step-by-step how to create and deploy your meme coin.',
    },
    {
      type: 'links',
      title: 'Read More',
      items: [
        {
          text: 'Full Tutorial on Hashnode',
          url: 'https://mulinya-erc20.hashnode.dev/beginners-guide-to-building-a-meme-coin-on-base',
        },
      ],
    },
  ],
}; 