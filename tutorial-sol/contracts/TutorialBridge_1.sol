//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "hardhat/console.sol";
import {IGatewayRegistry} from "@renproject/gateway-sol/src/GatewayRegistry/interfaces/IGatewayRegistry.sol";

contract TutorialBridge {
    IGatewayRegistry public gatewayRegistry;

    constructor(IGatewayRegistry gatewayRegistry_) {
        console.log("Deploying a TutorialBridge.");
        gatewayRegistry = gatewayRegistry_;
    }
}
