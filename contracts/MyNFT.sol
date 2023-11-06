// contracts/MyNFT.sol
// SPDX-License-Identifier: MIT
pragma solidity >=0.5.0 <0.9.0;

//all these ar imported from the node_modules/@openzeppelin/contracts.... this location
//these built in libraries and contracts are provided by openzeppelin to make our work easy
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
//The ERC721URIStorage contract is an implementation of ERC721 that includes the metadata standard extensions (IERC721Metadata) as well as a mechanism for per-token metadata. 
//That’s where the _setTokenURI method comes from: we use it to store an item’s metadata.
import "@openzeppelin/contracts/utils/Counters.sol";
//Provides counters that can only be incremented, decremented or reset. 
//This can be used e.g. to track the number of elements in a mapping, issuing ERC721 ids, or counting request ids.

contract MyNFT is ERC721URIStorage, Ownable{

    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
//using counters library to create token IDs

//NFT name = shihab uddin
//Token name = SSU
    constructor() ERC721("Shihab Uddin", "SSU"){

    }

//NFT mintin/creating
//tokenURI= we will get a link of the item that we will upload on IPFS or server
    function mintNFT(address recipient, string memory tokenURI) public onlyOwner returns(uint){
        _tokenIds.increment();
        //incrementing token id using counter functio that we imported

        uint256 newItemId = _tokenIds.current();// imported from Counters.Counter contract
        //minting the NFT
        _mint(recipient, newItemId);// _mint function in ERC721 contract

        //registering the item ID through thihs
        //linking the imageId with the image URI
        _setTokenURI(newItemId, tokenURI);
    return newItemId;
    }
}