
var mongo = require('../../core/mongowrap');

mongo.connect(function(err, client) {

    const host = require('../config').mongo.host;
    let db = mongo.db;
    
    let blocks_service = db.collection('blocks_service');
    let blocksServMap = [
        {
            network: 'testnet',
            blocks: {
                first: 1315700,
                last: 1315700,
            },
            dt_upd: new Date()
        },
        {
            network: 'mainnet',
            blocks: {
                first: 0,
                last: 0,
            },
            dt_upd: new Date()
        }
    ];


    let supernodes = db.collection('supernodes');
    let supernodesMap = [
        {
            "dt_cad" : new Date(),
            "dt_upd" : new Date(),
            "nodeId" : "sn1",
            "name" : "SuperNode1",
            "address" : "TATXXO52M6335SB6O5N57ZLSHW6QK7LSGNPNCL5H", // the supernode multisign account
            "publicKey" : "31d068107b0ebe56aa3345968675391f978bb16d875a805c503b5f1ec0807574",
            "privateKey" : "",
            "status":{
                "value": "ACTIVE", // ACTIVE | INACTIVE | UNLOCKED | LOCKED
                "dt_lastChange": new Date(),
                "message": "OK"
            },
            "xem": {
                "minHarvestBalance": 1000,
                "minHarvestUnlockPoolRate": 0.2,
                "minSupernodeBalance": 30030,
                "minSupernodeUnlockPoolRate": 0.1
            },
            "signers" : {
                "minimumSignatures" : 1,
                "app" : "", // app wallet address
                "nem" : "", // NEM wallet address
                "admin" : "" // admin wallet address
            },
            "incoming" : {
                "lastBlock" : 1294164,
                // authorized account to send deposits to the supernode, without receiveing anything back
                "authorizedAccounts" : [ 
                    "" //  wallet addresses
                ]
            },
            "outgoing" : {
                "lastBlock" : 1292666
            },
            "payments" : {
                "lastBlock" : 1294164, // the last block when a payment happened
                "lastDate" : new Date("2018-01-16T02:47:26.641Z")
            },
            "mosaic" : {
                "creationBlock": 1286164, // the creation block of the mosaic
                "firstDepositBlock" : 1286215, // block height of the first full deposit of supernode XSN from the creator account to the super node account
                "mosaicBaseFee": 0.75,
                "definition": {
                    "creator" : {
                        "address" : {
                            "value" : "",
                            "networkType" : 152
                        },
                        "publicKey" : ""
                    },
                    "id" : {
                        "namespaceId" : "nembr.sncf",
                        "name" : "xsn2"
                    },
                    "description" : "The XSN (XEM Super Node) token is always paired to XEM value, that means 1 XSN = 1 XEM, as these tokens represents XEMs that are being hold by SuperNode accounts.",
                    "properties" : {
                        "initialSupply" : 3300000,
                        "supplyMutable" : true,
                        "transferable" : true,
                        "divisibility" : 6
                    },
                    "levy" : {
                        "type" : 2,
                        "recipient" : {
                            "value" : "",
                            "networkType" : 152
                        },
                        "mosaicId" : {
                            "namespaceId" : "nem",
                            "name" : "xem"
                        },
                        "fee" : 10
                    },
                    "metaId" : 1319
                }
            },
            "account":{
                "dt_lastChange": null,
                "snapshot": {} // the snapshot of the account 
            },
            "mosaicsOwned":{
                "dt_lastChange": null,
                "snapshot": {} // the snapshot of the mosaics owned by account
            },
            "accounts" : [
                {
                    "dt_cad" : new Date(),
                    "account" : {
                        "address" : {
                            "value" : "",
                            "networkType" : 152
                        },
                        "publicKey" : ""
                    },
                    "email" : {
                        "value" : "email@email.com",
                        "dt_upd" : new Date(),
                        "history" : [ 
                            {
                                "email" : "another@gmail.com",
                                "dt_cad" : new Date()
                            }
                        ]
                    }
                }
            ],

            "representative": {
                dt_last_change: new Date(),
                dt_next_change: null,
                account: {
                    "address" : {
                        "value" : "TCD2UMS2EGJHB2VQ7UEGUOPVKGNGMZZUGUOFV2KO",
                        "networkType" : 152
                    },
                    "publicKey" : "a31629b6b1c878bb387045995b75ce736c68d4ef9c96460982c31cdc67bf26ee"
                },
                candidates: [
                    {
                        "dt_cat" : new Date(),
                        "account" : {
                            "address" : {
                                "value" : "TCD2UMS2EGJHB2VQ7UEGUOPVKGNGMZZUGUOFV2KO",
                                "networkType" : 152
                            },
                            "publicKey" : "a31629b6b1c878bb387045995b75ce736c68d4ef9c96460982c31cdc67bf26ee"
                        }
                    }
                ]
            }
            
        },
    ];



    if (host == 'localhost') {
        mongo.c.blocks_service.insertMany(blocksServMap, function(err, r) {
            console.log("Blocks service inserted!", err, r);
            
            mongo.c.supernodes.insertMany(supernodesMap, function(err, r) {
                console.log("Supernodes inserted!", err, r);
                mongo.close();
            });
        });
    } else {
        mongo.c.supernodes.insertMany(supernodesMap, function(err, r) {
            console.log("Supernodes inserted!", err, r);
            mongo.close();
        });
    }
    
});