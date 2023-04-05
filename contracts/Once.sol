// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

contract Once {

    constructor () payable {
    }

    mapping(address => uint) _balance;

    fallback() payable external {
        _balance[msg.sender] += msg.value;
    }

    receive() payable external {
        _balance[msg.sender] += msg.value;
    }

    // ------------- STRUCT --------------
    struct seller {
        address sellerAddress;
        string fullname;
        string email; 
        uint phone;
        string password;
    }

    struct buyer {
        address buyerAddress;
        string fullname;
        string email; 
        uint phone;
        string password;
    }

    struct PropertyRegistry{   
        uint PropertyId;
        address payable OwnerAddress;
        string City; 
        string State; 
        uint PropertyPrice; 
    }

    struct PropertyImages {
        uint PropertyId;
        string[] imageArr;
    }


    // ------------- MAPPING --------------
    mapping(uint => PropertyRegistry) public PropertyMapping; 
    mapping (address => seller) sellerMap;
    mapping (address => buyer) buyerMap;
    mapping (uint => PropertyImages) public propertyImgMap;

    uint[] PropertyArray;


    // ------------- EVENTS --------------
    event BuyerRegistration(
        address _BuyerRegistered,
        string fullname,
        string email,
        uint phone,
        string password
    );

    event SellerRegistration(
        address _SellerRegistered,
        string fullname,
        string email,
        uint phone,
        string password
    );

    event PropertyRegistration(
        uint PropertyId, 
        address OwnerAd, 
        string City, 
        string State, 
        uint PropertyPrice
    );

    event PropertyImageRegistration(
        uint PropertyId,
        string[] imageArr
    );


    // ------------- CONVERSION -----------
    function parseAddr(string memory _a) internal pure returns (address _parsedAddress) {
        bytes memory tmp = bytes(_a);
        uint160 iaddr = 0;
        uint160 b1;
        uint160 b2;
        for (uint i = 2; i < 2 + 2 * 20; i += 2) {
            iaddr *= 256;
            b1 = uint160(uint8(tmp[i]));
            b2 = uint160(uint8(tmp[i + 1]));
            if ((b1 >= 97) && (b1 <= 102)) {
                b1 -= 87;
            } else if ((b1 >= 65) && (b1 <= 70)) {
                b1 -= 55;
            } else if ((b1 >= 48) && (b1 <= 57)) {
                b1 -= 48;
            }
            if ((b2 >= 97) && (b2 <= 102)) {
                b2 -= 87;
            } else if ((b2 >= 65) && (b2 <= 70)) {
                b2 -= 55;
            } else if ((b2 >= 48) && (b2 <= 57)) {
                b2 -= 48;
            }
            iaddr += (b1 * 16 + b2);
        }
        return address(iaddr);
    } 


    // ------------- BUYER --------------
    function RegisterBuyer(

        address BuyerAddress,
        string memory fullname,
        string memory email,
        uint phone,
        string memory password)  
        external
    {
 
        require(BuyerAddress==msg.sender,
            "This address is already registered as another Buyer");
            
            buyerMap[BuyerAddress]=buyer(
            msg.sender,
            fullname,
            email,
            phone,
            password);
        
        emit BuyerRegistration(
            msg.sender,
            fullname,
            email,
            phone,
            password
            );

    }

    function GetBuyerDetails(address BuyerAddress)
        
        external view returns(
        string memory, 
        string memory,
        uint,
        string memory) 
    { 
        return(
        buyerMap[BuyerAddress].fullname,
        buyerMap[BuyerAddress].email,
        buyerMap[BuyerAddress].phone,
        buyerMap[BuyerAddress].password);

    }

    // ------------- SELLER --------------
    function RegisterSeller(

        string memory SellerAddress,
        string memory fullname,
        string memory email,
        uint phone,
        string memory password )  
        external
    {
        address SellerAdd = parseAddr(SellerAddress);
 
        require(SellerAdd==msg.sender,
            "This address is already registered as another Seller");
            
            sellerMap[SellerAdd]=seller(
            msg.sender,
            fullname,
            email,
            phone,
            password
            );
        
        emit SellerRegistration(
            msg.sender,
            fullname,
            email,
            phone,
            password);

    }

    function GetSellerDetails(address SellerAddress) 
        
        public view returns(
        string memory, 
        string memory, 
        uint,
        string memory) 
    { 
        return(
        sellerMap[SellerAddress].fullname,
        sellerMap[SellerAddress].email,
        sellerMap[SellerAddress].phone,
        sellerMap[SellerAddress].password);
        
        
    }

    // ------------- PROPERTY --------------
    function RegisterProperty(
        
        string memory OwnerAddress,
        uint PropertyId,
        string memory City,
        string memory State,
        uint PropertyPrice) 
        external  
    {
        address OwnerAdd = parseAddr(OwnerAddress);
        address payable OwnerAd = payable(address(OwnerAdd));
 
        require(OwnerAd == msg.sender,
            "Seller address must be the OwnerAddress");
        
            PropertyMapping[PropertyId]= PropertyRegistry(
            PropertyId, 
            OwnerAd, 
            City, 
            State, 
            PropertyPrice);

            PropertyArray.push(PropertyId);

            emit PropertyRegistration(PropertyId, OwnerAd, City, State, PropertyPrice);

    }


    function GetCountOfProperties() public view returns(uint){
        return PropertyArray.length;
    }


    function GetPropertyDetails(uint PropertyId) 

        view public returns(
        address,
        string memory, 
        string memory,
        uint
        // uint
        // string[] memory
        )
    {
        return(

        PropertyMapping[PropertyId].OwnerAddress,
        PropertyMapping[PropertyId].City,
        PropertyMapping[PropertyId].State,
        PropertyMapping[PropertyId].PropertyPrice
        );
    
    }

    function SetPropertyImages(
        uint PropertyId,
        string[] memory imageArr
        ) external {
            propertyImgMap[PropertyId] = PropertyImages(PropertyId, imageArr);
            emit PropertyImageRegistration(PropertyId, imageArr);
    }

    function GetPropertyImages(uint PropertyId) 
        external view returns(
            string[] memory
        ) {
            return(
                propertyImgMap[PropertyId].imageArr
            );
        }


    
    // ------------- BUY && TRANSFER OWNERSHIP --------------
    function BuyProperty(
         
        uint PropertyId,
        address payable NewOwnerAddress) 
        public payable 
    {
    
    
        require(PropertyMapping[PropertyId].OwnerAddress != NewOwnerAddress,
            "NewOwner address must be unique"); 
    
            PropertyMapping[PropertyId].OwnerAddress=NewOwnerAddress;
        

    }

}