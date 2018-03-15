pragma solidity ^0.4.19;


contract GalleryFactory {
    address[] public deployedGallerys;

    function createGallery(string title, string description) public {
        address newGallery = new Gallery(title, msg.sender, description);
        deployedGallerys.push(newGallery);
    }

    function getDeployedGallerys() public view returns (address[]) {
        return deployedGallerys;
    }
}

contract Gallery {

   struct Commenter {
       address id; 
       string name;
       string comment;
   }

   // This is a type for a single picture.
   struct Picture {
        bytes32 title;   // short name (up to 32 bytes)
        uint likes; // number of accumulated votes
        address ownerId;
        string url;
        uint lengthKey;
        mapping(uint => Commenter) comments;
        mapping(address => bool) likers;
    }

    string public collectionName;
    string public description;
    uint public tips;
    address public owner;
    Picture[] public pictures;

    function Gallery(string name, address creator, string newdescription) public {
       collectionName = name;
       description = newdescription;
       owner = creator;
    }
    
    function getPicturesCount() public view returns (uint) {
        return pictures.length;
    }

    function addLike(uint index) public payable {
        require(!pictures[index].likers[msg.sender]);
        pictures[index].likers[msg.sender] = true;
        pictures[index].likes++;
        
        if(msg.value > 0){
            tips += msg.value;
        }
    }
    
    function tip() public payable {
        require(owner != msg.sender);
        require(msg.value > 0);
        tips += msg.value;
    }
    
    function addComment(string name, uint index, string comment) public {
        Commenter memory sender = Commenter({
           name: name, 
           comment: comment,
           id: msg.sender
        });
        pictures[index].comments[pictures[index].lengthKey++] = sender;
    }

   function addPicture(bytes32 title, string url) public {
        require(owner == msg.sender);
        Picture memory sender = Picture({
           title: title, 
           likes: 0,
           ownerId: msg.sender,
           url: url,
           lengthKey: 0
        });
        pictures.push(sender);
   }

}