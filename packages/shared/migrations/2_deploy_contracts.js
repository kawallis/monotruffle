var GalleryFactory = artifacts.require("./GalleryFactory.sol");
// var Gallery = artifacts.require("./Gallery.sol");

module.exports = function(deployer) {
  deployer.deploy(GalleryFactory);
  // deployer.deploy(Gallery);
  
};
