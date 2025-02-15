export const memeCoinGuide = {
  title: 'Beginners Guide to Building a MEME Coin on Base',
  author: 'Fadhil Mulinya',
  date: 'Jan 5, 2025',
  readingTime: '10 min read',
  slug: 'meme-coin-guide',
  coverImage: '/blog/meme-coin.jpg',
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
      content: 'Non-Fungible Tokens (NFTs)',
    },
    {
      type: 'text',
      content: 'Non-fungible tokens represent unique, indivisible assets. Unlike fungible tokens, these cannot be broken down into smaller units, and each token has its own unique identity. A good real-world example is the Mona Lisa. If you try to tear it apart or split it into pieces, its value and uniqueness are lost.',
    },
    {
      type: 'text',
      content: 'NFTs are commonly represented using the ERC-721 standard.',
    },
    {
      type: 'heading',
      content: 'Semi-Fungible Tokens (SFTs)',
    },
    {
      type: 'text',
      content: 'Semi-fungible tokens combine the properties of both fungible and non-fungible tokens. Initially, they behave like fungible tokens—interchangeable and identical in value. However, once they are redeemed or used in a specific context, they transform into unique, non-fungible assets.',
    },
    {
      type: 'text',
      content: 'A good example is a concert ticket. Before the event, all tickets of the same category (e.g., general admission) are identical and interchangeable. After the event, they become unique collectibles, representing proof of attendance or memorabilia.',
    },
    {
      type: 'text',
      content: 'SFTs are commonly represented using the ERC-1155 standard.',
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
      type: 'steps',
      items: [
        'Head over to Remix IDE',
        'Create a Folder',
        'Inside the Folder Create a File called "MyToken.sol" or any name of your preference',
        'Enter that File(MyToken.sol) and Proceed to the next stage',
      ],
    },
    {
      type: 'heading',
      content: '2. Writing the Code',
    },
    {
      type: 'text',
      content: 'We will use OpenZeppelin library to implement this sample Project as we will be implementing most of the functions.',
    },
    {
      type: 'code',
      language: 'solidity',
      filename: 'MemeCoin.sol',
      content: `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MemeCoin is ERC20, Ownable {
    constructor() ERC20("MemeCoin", "MEME") Ownable(msg.sender) {
        _mint(msg.sender, 1000000 * 10 ** decimals());
    }
}`,
    },
    {
      type: 'text',
      content: 'View the full detailed guide in the blog post to learn more about implementing and deploying your meme coin.',
    },
    {
      type: 'text',
      content: 'The contract has been deployed to Base mainnet at address: 0x1234...5678 (Note: This is a placeholder address. Replace with your actual deployed contract address)',
    },
    {
      type: 'heading',
      content: '4. Deploy Our Contract to Base',
    },
    {
      type: 'text',
      content: 'After deploying the contract, you can view its details on BaseScan using the following address:',
    },
    {
      type: 'code',
      language: 'text',
      content: '0xd2cB6Bb417CeB5cEC1A8A4d69EF5f0c4f3Fbae9f',
    },
    {
      type: 'links',
      title: 'Connect with me:',
      items: [
        {
          text: 'Schedule a Coffee Chat',
          url: 'https://calendly.com/mulinyafadhil/coffee-chat-s-with-fadhil',
        },
        {
          text: 'Twitter',
          url: 'https://x.com/mulinyafadhil',
        },
        {
          text: 'LinkedIn',
          url: 'https://www.linkedin.com/in/fadhil-mulinya-35464b238/',
        },
        {
          text: 'Farcaster',
          url: 'https://warpcast.com/mulinya',
        },
      ],
    },
  ],
}; 