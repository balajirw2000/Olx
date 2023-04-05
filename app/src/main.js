const Web3 = require("web3");
// const web3 = new Web3("http://localhost:8080");
const web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:7545"));
// Import the ABI definition of the DemoContract
const artifact = require("../../build/contracts/Once.json");

const ReadText = require("text-from-image");

// const netid = await web3.eth.net.getId()
const deployedContract = artifact.networks[5777];
const contractAddress = deployedContract.address;

const MIN_GAS = 1000000;
console.log(window.localStorage.getItem("userWalletAddress"));

function validateBill(event) {
  console.log("billi");

  var selectedImg = event.target.files
    ? event.target.files[0]
    : $("#bill_file")[0].files[0];

  ReadText("./bill.jpeg")
    .then((text) => {
      console.log(text);
      var splitLines = text.split("\n");
      console.log(splitLines[7]);
      console.log(splitLines[11]);
      console.log(splitLines[12]);
    })
    .catch((err) => {
      console.log(err);
    });
}

function showProperties(propdetails) {
  console.log("propdetails::: ", propdetails);
  console.log("propdetails[0] ", propdetails[0]);
  var allImgs = "";
  var imgs = "";

  // for (let i = 0; i < propdetails[0].PropertyImages.length; i++) {
  // console.log(propdetails[0].PropertyImages);
  // const IPFS_HASH = propdetails[0].PropertyImages;
  // console.log("IPFS_HASH: ", IPFS_HASH);
  // imgs =
  //   `
  //     <div class="Containers">
  //       <div class="MessageInfo"> ` +
  //   propdetails[0].PropertyImages.length +
  //   `</div>
  //         <img src="https://gateway.pinata.cloud/ipfs/${IPFS_HASH}" class="w-100">
  //     </div>`;

  // allImgs += imgs;
  // }

  if (propdetails[0].PropertyPrice != 0) {
    var charr =
      `<li>
  <div class="property-card">
    <figure class="card-banner">
      <div class="slideshow-container fade">` +
      allImgs +
      `

          </div>

        <div class="banner-actions">
          <button class="banner-actions-btn">
            <ion-icon name="location"></ion-icon>

            <address>` +
      propdetails[0].City +
      `, ` +
      propdetails[0].State +
      ` </address>
          </button>

          
        </div>
      </div>
     
    </figure>
    <br>
    

    <div class="card-content">
      <strong>ETH` +
      propdetails[0].PropertyPrice +
      `</strong></div>      
    </div>

    <div class="card-footer">

      <div class="card-footer-actions">
        
        <button class="btn temp" onclick="App.sendEther('` +
      String(propdetails[0].OwnerAddress) +
      `'` +
      "," +
      propdetails[0].PropertyID +
      "," +
      propdetails[0].PropertyPrice +
      `)">
          Buy
        </button>
      </div>
    </div>
  </div>
</li>`;

    `-------------------------------------------`;
    var char =
      `<li>
  <div class="property-card">
    <figure class="card-banner">
      <div class="slideshow-container fade">` +
      allImgs +
      `

        <div class="banner-actions">
          <button class="banner-actions-btn">
            <ion-icon name="location"></ion-icon>

            <address>` +
      propdetails[0].City +
      `, ` +
      propdetails[0].State +
      ` </address>
          </button>

          <button class="banner-actions-btn">
            <ion-icon name="camera"></ion-icon>

            <span>4</span>
          </button>

          <button class="banner-actions-btn">
            <ion-icon name="film"></ion-icon>

            <span>2</span>
          </button>
        </div>
      </div>
     
    </figure>
    <br>

    

    <div class="card-footer">
    <a class="btn" href="http://localhost:8080/changeprice.html">Change Price</a>

      <div class="card-footer-actions">
        
      <button class="btn temp" onclick="App.sendEther('` +
      String(propdetails[0].OwnerAddress) +
      `'` +
      "," +
      propdetails[0].PropertyID +
      "," +
      propdetails[0].PropertyPrice +
      `)">
          Buy
        </button>
      </div>
    </div>
  </div>
</li>`;

    // document.getElementById("propList").innerHTML += char;
    console.log(window.localStorage.getItem("userWalletAddress"));
    let owneraddress = String(propdetails[0].OwnerAddress).toLowerCase();
    console.log(owneraddress);
    if (window.localStorage.getItem("userWalletAddress") == owneraddress) {
      document.getElementById("propList").innerHTML += char;
    } else {
      document.getElementById("propList").innerHTML += charr;
    }
  }
}

function showPropertyImages(propImagesArr) {
  for (let i = 0; i <= propImagesArr.length; i++) {
    console.log(i, propImagesArr[0].PropArr[i]);
    const IPFS_HASH = propImagesArr[0].PropArr[i];

    var img = document.createElement("img");
    img.src = `https://gateway.pinata.cloud/ipfs/${IPFS_HASH}`;

    document.getElementById("propList").appendChild(img);
  }
}

const App = {
  web3: null,
  contractInstance: null,
  accounts: null,

  start: async function () {
    const { web3 } = this;
    // Get the accounts
    this.accounts = await web3.eth.getAccounts();

    console.log(this.accounts);

    this.contractInstance = new web3.eth.Contract(
      artifact.abi,
      contractAddress
    );
  },

  register: async function (user) {
    console.log(user);

    const fullname = document.getElementById("FullName").value;
    const email = document.getElementById("Email").value;
    const phone = document.getElementById("Phone").value;
    // const currentAdd = document.getElementById("CurrentAdd").value;
    const password = document.getElementById("Password").value;
    const confirmPassword = document.getElementById("ConfirmPassword").value;
    const metaAdd = document.getElementById("MetaAdd").value;

    let checkedValues = true;
    // checkedValues = checkInputValuesRegister(
    //   fullname,
    //   email,
    //   phone,
    //   currentAdd,
    //   password,
    //   confirmPassword,
    //   metaAdd,
    //
    // );
    console.log("Values Checked");
    var warning = document.querySelector(".alert.warning");
    if (checkedValues) {
      //   let validate;
      //   validate = await this.contractInstance.methods
      //     .validateUser(metaAdd)
      //     .call();
      //   console.log(validate);

      if (checkedValues) {
        console.log(
          fullname,
          email,
          phone,
          // currentAdd,
          password,
          confirmPassword,
          metaAdd
        );
        this.setUser(
          fullname,
          email,
          phone,
          // currentAdd,
          password,
          metaAdd
        );
        // showWarning("Registration Successful!", "#04AA6D");
        console.log("success");

        setTimeout(function () {
          warning.style.opacity = "0";
          setTimeout(function () {
            warning.style.display = "none";
          }, 1200);
          window.location.href = "property.html";
        }, 5000);
        // r = "property.html";
        // r.click();
      } else {
        console.log("failed");
        // showWarning("User ID already exists!", "#f44336");
      }
    }
  },

  setUser: async function (
    fullname,
    email,
    phone,
    // currentAdd,
    password,
    metaAdd
  ) {
    const gas = await this.contractInstance.methods
      .RegisterBuyer(
        metaAdd,
        fullname,
        email,
        phone,
        // currentAdd,
        password
      )
      .estimateGas({
        from: window.localStorage.getItem("userWalletAddress"),
      });
    await this.contractInstance.methods
      .RegisterBuyer(
        metaAdd,
        fullname,
        email,
        phone,
        // currentAdd,
        password
      )
      .send({
        from: window.localStorage.getItem("userWalletAddress"),
        gas: Math.max(gas, MIN_GAS),
      });
    console.log("Send");
  },

  enlist: async function (user) {
    console.log(user);
    const metaAdd = document.getElementById("MetaAdd").value;
    const state = document.getElementById("State").value;
    const city = document.getElementById("City").value;
    const listingPrice = document.getElementById("ListingPrice").value;
    var cntProp;
    await this.countProperty().then(function (result) {
      cntProp = result[0]["total"];
    });
    console.log("cntProp ", cntProp);
    const propertyId = parseInt(cntProp) + 1;
    let checkedValues = true;

    console.log("Values Checked");
    var warning = document.querySelector(".alert.warning");
    if (checkedValues) {
      this.setProperty(metaAdd, propertyId, city, state, listingPrice);

      console.log("Success");
    } else {
      console.log("error");
    }
  },

  setProperty: async function (metaAdd, propertyId, city, state, listingPrice) {
    const gas = await this.contractInstance.methods
      .RegisterProperty(metaAdd, propertyId, city, state, listingPrice)
      .estimateGas({
        from: window.localStorage.getItem("userWalletAddress"),
      });
    await this.contractInstance.methods
      .RegisterProperty(metaAdd, propertyId, city, state, listingPrice)
      .send({
        from: window.localStorage.getItem("userWalletAddress"),
        gas: Math.max(gas, MIN_GAS),
      });
  },

  newprice: async function (PropertyIdd, PropertyPricee, result, user) {
    console.log(user);
    console.log("raj");
    // const result=resultt;
    console.log(result);
    const PropertyId = parseInt(PropertyIdd);
    const PropertyPrice = PropertyPricee;
    const metaAdd = result[0].OwnerAddress;
    console.log(metaAdd);
    const state = result[0].State;
    const city = result[0].City;
    console.log("ok" + result);
    console.log(PropertyId);
    console.log(PropertyPrice);
    // console.log(propertyType);
    console.log(desc);
    console.log(metaAdd);
    let checkedValues = true;

    console.log("Values Checked");
    var warning = document.querySelector(".alert.warning");

    if (checkedValues) {
      this.setProperty(metaAdd, PropertyId, city, state, PropertyPrice);

      console.log("Success");
      // setTimeout(function () {
      //   warning.style.opacity = "0";
      //   setTimeout(function () {
      //     warning.style.display = "none";
      //   }, 1200);
      // }, 5000);
    } else {
      console.log("error");
    }
  },

  changeprice: async function (user) {
    console.log(user);

    const PropertyId = parseInt(document.getElementById("PropertyId").value);
    const PropertyPrice = document.getElementById("PropertyPrice").value;
    console.log(PropertyId);
    console.log(PropertyPrice);

    await this.propertyDetails(PropertyId).then(function (result) {
      console.log(result);

      App.newprice(PropertyId, PropertyPrice, result);
    });
  },

  getDetails: async function () {
    let userdetails;
    console.log("userdetails", userdetails);
    const gas = await this.contractInstance.methods
      .GetBuyerDetails(window.localStorage.getItem("userWalletAddress"))
      .estimateGas({
        from: window.localStorage.getItem("userWalletAddress"),
      });

    var result = await this.contractInstance.methods
      .GetBuyerDetails(window.localStorage.getItem("userWalletAddress"))
      .call({
        from: window.localStorage.getItem("userWalletAddress"),
        gas: Math.max(gas, MIN_GAS),
      })
      .then((result) => {
        console.log(result);
        userdetails = [
          {
            // Index: i + 1,
            OwnerAddress: result[0],
            Name: result[1],
            Email: result[2],
            Phone: result[3],
          },
        ];
        showProperties(userdetails);
      })
      .catch((error) => console.log(error));
    console.log(userdetails);
    // console.log(window.localStorage.getItem("userWalletAddress"));
  },

  countProperty: async function () {
    let countProperty;
    console.log(countProperty);
    const gas = await this.contractInstance.methods
      .GetCountOfProperties()
      .estimateGas({
        from: window.localStorage.getItem("userWalletAddress"),
      });
    var result = await this.contractInstance.methods
      .GetCountOfProperties()
      .call({
        from: window.localStorage.getItem("userWalletAddress"),
        gas: Math.max(gas, MIN_GAS),
      })
      .then((result) => {
        console.log("result: ", result);
        countProperty = [
          {
            total: result,
          },
        ];
      })
      .catch((error) => console.log(error));
    console.log("countProperty: ", countProperty);
    return countProperty;
  },

  propertyDetails: async function (propertyIdd) {
    let property;
    let proImages;
    propertyIdd = parseInt(propertyIdd);

    await this.getPropertyImages(propertyIdd).then((res) => {
      console.log("resssss", res);
      proImages = [res];
    });
    console.log("proImages:::", proImages[0]);

    console.log("sdasd" + parseInt(propertyIdd));
    const gas = await this.contractInstance.methods
      .GetPropertyDetails(propertyIdd)
      .estimateGas({
        from: window.localStorage.getItem("userWalletAddress"),
      });
    var result = await this.contractInstance.methods
      .GetPropertyDetails(propertyIdd)
      .call({
        from: window.localStorage.getItem("userWalletAddress"),
        gas: Math.max(gas, MIN_GAS),
      })
      .then((result) => {
        console.log(result);
        property = [
          {
            OwnerAddress: result[0],
            City: result[1],
            State: result[2],
            PropertyPrice: result[3],
            PropertyImages: proImages[4],
            PropertyID: propertyIdd,
          },
        ];
        console.log("hellyeah", property);
        showProperties(property);
      })
      .catch((error) => console.log(error));

    console.log("propertyyyyy: ", property);

    console.log("dsfsdfff" + window.localStorage.getItem("userWalletAddress"));
    return property;
  },

  getAllPropertyDetails: async function () {
    //  var balance = await App.web3.eth.getBalance(window.localStorage.getItem("userWalletAddress")).then(console.log);
    //  console.log("This is balance "+ balance);
    console.log("Enterd");
    var totalCount = 0;
    await this.countProperty().then(function (result) {
      totalCount = result[0]["total"];
    });
    for (let i = 1; i <= totalCount; i++) {
      console.log("iiiiiiiiiiiiiiii", i);
      await this.propertyDetails(i).then(function (result) {
        console.log(result);
        showProperties(result);
      });
    }

    // var result = myContract.setFinished.call(true,{from: web3.eth.accounts[0], gas:3000000}, function(err, res){ console.log(res) });
  },

  setPropertyImages: async function (propertyId, imageArr) {
    console.log(propertyId, imageArr);
    const gas = await this.contractInstance.methods
      .SetPropertyImages(propertyId, imageArr)
      .estimateGas({
        from: window.localStorage.getItem("userWalletAddress"),
      });
    await this.contractInstance.methods
      .SetPropertyImages(propertyId, imageArr)
      .send({
        from: window.localStorage.getItem("userWalletAddress"),
        gas: Math.max(gas, MIN_GAS),
      });

    await this.getPropertyImages(2);
  },

  getPropertyImages: async function (propertyId) {
    let propertyImage;
    console.log("propId: ", propertyId);
    const gas = await this.contractInstance.methods
      .GetPropertyImages(propertyId)
      .estimateGas({
        from: window.localStorage.getItem("userWalletAddress"),
      });
    await this.contractInstance.methods
      .GetPropertyImages(propertyId)
      .call({
        from: window.localStorage.getItem("userWalletAddress"),
        gas: Math.max(gas, MIN_GAS),
      })
      .then((result) => {
        console.log("###result: ", result),
          (propertyImage = [
            {
              PropArr: result,
              PropertyID: propertyId,
            },
          ]);
        // showPropertyImages(propertyImage));
      })
      .catch((error) => console.log(error));

    console.log("PropArr: ", propertyImage[0].PropArr);
    return propertyImage[0].PropArr;
  },

  buyProperty: async function (propertyIdd, MetaAddress) {
    const gas = await this.contractInstance.methods
      .BuyProperty(propertyIdd, MetaAddress)
      .estimateGas({
        from: window.localStorage.getItem("userWalletAddress"),
      });
    await this.contractInstance.methods
      .BuyProperty(propertyIdd, MetaAddress)
      .send({
        from: window.localStorage.getItem("userWalletAddress"),
        gas: Math.max(gas, MIN_GAS),
      })
      .once("transactionHash", function (hash) {
        window.localStorage.setItem("TranscationHash", hash);
        console.log("Done");
      })
      .once("receipt", function (receipt) {
        console.log("Receipt : " + receipt);
      })
      .on("confirmation", function (confNumber, receipt, latestBlockHash) {
        console.log("Conf Number" + confNumber);
        console.log("This is receipt:- " + receipt);
        console.log("Block number " + latestBlockHash);
      })
      .then((rr) => {
        localStorage.setItem("PropertyId", propertyIdd);
        App.web3.eth
          .getTransaction(window.localStorage.getItem("TranscationHash"))
          .then(console.log);
        // App.web3.eth.getTransactionReceipt(window.localStorage.getItem("TranscationHash"))
        // .then(console.log);

        // console.log(result);
      })
      .catch((error) => console.log(error));
    window.location.href = "Receipt.html";
  },

  sendEther: async function (metaID, propId, cost) {
    //const sendEthButton = document.querySelector(".sendEthButton");
    // sendEthButton.addEventListener("click", () => {
    //  console.log(document.getElementById("textbox_id").value);
    console.log(metaID, propId, cost);
    ethereum
      .request({
        method: "eth_sendTransaction",

        params: [
          {
            from: window.localStorage.getItem("userWalletAddress"),
            to: "" + metaID,
            //  value:"0x29a2241af62c0000",
            value:
              "0x" + Number(Web3.utils.toWei("" + cost, "ether")).toString(16),
            //   gasPrice: '0x09184e72a000',
            //   gas: '0x2710',
          },
        ],
      })
      .then((txHash) => {
        App.buyProperty(
          propId,
          window.localStorage.getItem("userWalletAddress")
        );
      })
      .catch((error) => console.error);
    // });
  },

  getTransactiondetails: async function () {
    web3.eth
      .getTransaction(window.localStorage.getItem("TranscationHash"))
      .then((result) => {
        console.log(result);

        document.getElementById("fromaddress").innerHTML = result.from;
        document.getElementById("toaddress").innerHTML = result.to;
      })
      .catch((error) => console.log(error));
    //     console.log("DEFDewdfewd");
    //     if(add1 === "" || add2){
    //       console.log("Empty");
    //       }
    //       else{
    // // var details1 = await this.getDetails(add1);
    // // var details2 = await this.getDetails(add2);
    // // console.log(details1);
    // // console.log(details2);
    //       }
  },

  getUserDetails: async function (add1, add2) {
    var details1 = await this.getDetails(add1);
    var details2 = await this.getDetails(add2);
    console.log(details1);
    console.log(details2);
  },
};

window.App = App;
window.addEventListener("load", function () {
  App.web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:7545"));

  App.start();
});

/* ----------------------------------------------------------------------------- */
("use strict");

/**
 * element toggle function
 */

const elemToggleFunc = function (elem) {
  elem.classList.toggle("active");
};

/**
 * navbar toggle
 */

const navbar = document.querySelector("[data-navbar]");
const overlay = document.querySelector("[data-overlay]");
const navCloseBtn = document.querySelector("[data-nav-close-btn]");
const navOpenBtn = document.querySelector("[data-nav-open-btn]");
const navbarLinks = document.querySelectorAll("[data-nav-link]");

const navElemArr = [overlay, navCloseBtn, navOpenBtn];

/**
 * close navbar when click on any navbar link
 */

for (let i = 0; i < navbarLinks.length; i++) {
  navElemArr.push(navbarLinks[i]);
}

/**
 * addd event on all elements for toggling navbar
 */

for (let i = 0; i < navElemArr.length; i++) {
  navElemArr[i].addEventListener("click", function () {
    elemToggleFunc(navbar);
    elemToggleFunc(overlay);
  });
}

/**
 * header active state
 */

const header = document.querySelector("[data-header]");

window.addEventListener("scroll", function () {
  window.scrollY >= 400
    ? header.classList.add("active")
    : header.classList.remove("active");
});

// ---------------------- PROPERTY DETAILS JS ---------------------
const imgs = document.querySelectorAll(".img-select a");
const imgBtns = [...imgs];
let imgId = 1;

imgBtns.forEach((imgItem) => {
  imgItem.addEventListener("click", (event) => {
    event.preventDefault();
    imgId = imgItem.dataset.id;
    slideImage();
  });
});

function slideImage() {
  const displayWidth = document.querySelector(
    ".img-showcase img:first-child"
  ).clientWidth;

  document.querySelector(".img-showcase").style.transform = `translateX(${
    -(imgId - 1) * displayWidth
  }px)`;
}

window.addEventListener("resize", slideImage);
